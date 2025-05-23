import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { analyzeFontUsage } from '@/lib/font-analysis';
import { analyzeImageOptimization } from '@/lib/image-optimization';
import { analyzeCTA } from '@/lib/cta-analysis';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  console.log('🔥 API /analyze endpoint called')
  
  try {
    console.log('📥 Parsing request body...')
    const body = await request.json();
    const { url, component } = body; // Add component parameter for selective testing
    console.log(`📋 Received URL: ${url}`)
    console.log(`🎯 Component filter: ${component || 'all'}`)

    // Validate input
    if (!url) {
      console.log('❌ URL validation failed: missing URL')
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url);
      if (!['http:', 'https:'].includes(validatedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
      console.log(`✅ URL validation passed: ${validatedUrl.toString()}`)
    } catch {
      console.log('❌ URL validation failed: invalid format')
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Initialize results object
    let analysisResult: any = {
      url: validatedUrl.toString(),
      pageLoadSpeed: { score: 0, metrics: {} },
      fontUsage: { score: 0, fontFamilies: [], fontCount: 0, issues: [], recommendations: [] },
      imageOptimization: { score: 0, totalImages: 0, modernFormats: 0, withAltText: 0, appropriatelySized: 0, issues: [], recommendations: [], details: {} },
      ctaAnalysis: { score: 0, ctas: [], issues: [], recommendations: [] },
      whitespaceAssessment: { score: 0, issues: [] },
      socialProof: { score: 0, elements: [], issues: [] },
      overallScore: 0,
      status: 'completed'
    };

    const scores: number[] = [];

    // Component-based analysis
    const shouldRun = (componentName: string) => !component || component === 'all' || component === componentName;

    if (shouldRun('font')) {
      console.log('🔄 Starting font usage analysis...')
      const fontUsageResult = await analyzeFontUsage(validatedUrl.toString());
      analysisResult.fontUsage = {
        score: fontUsageResult.score,
        fontFamilies: fontUsageResult.fontFamilies,
        fontCount: fontUsageResult.fontCount,
        issues: fontUsageResult.issues,
        recommendations: fontUsageResult.recommendations
      };
      scores.push(fontUsageResult.score);
    }

    if (shouldRun('image')) {
      console.log('🔄 Starting image optimization analysis...')
      const imageOptimizationResult = await analyzeImageOptimization(validatedUrl.toString());
      analysisResult.imageOptimization = {
        score: imageOptimizationResult.score,
        totalImages: imageOptimizationResult.totalImages,
        modernFormats: imageOptimizationResult.modernFormats,
        withAltText: imageOptimizationResult.withAltText,
        appropriatelySized: imageOptimizationResult.appropriatelySized,
        issues: imageOptimizationResult.issues,
        recommendations: imageOptimizationResult.recommendations,
        details: imageOptimizationResult.details
      };
      scores.push(imageOptimizationResult.score);
    }

    if (shouldRun('cta')) {
      console.log('🔄 Starting CTA analysis...')
      
      // Launch puppeteer to get HTML content for CTA analysis
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        console.log(`🌐 Navigating to: ${validatedUrl.toString()}`);
        await page.goto(validatedUrl.toString(), { waitUntil: 'networkidle2', timeout: 30000 });
        
        const htmlContent = await page.content();
        console.log(`📄 HTML content length: ${htmlContent.length}`);
        
        console.log('🎯 Running CTA analysis...');
        const ctaResult = await analyzeCTA(htmlContent);
        console.log(`✅ CTA analysis complete: ${ctaResult.ctas.length} CTAs found, score: ${ctaResult.score}`);
        
        analysisResult.ctaAnalysis = {
          score: ctaResult.score,
          ctas: ctaResult.ctas.map(cta => ({
            text: cta.text,
            type: cta.type,
            isAboveFold: cta.isAboveFold,
            actionStrength: cta.actionStrength,
            urgency: cta.urgency,
            visibility: cta.visibility,
            context: cta.context
          })),
          primaryCTA: ctaResult.primaryCTA ? {
            text: ctaResult.primaryCTA.text,
            type: ctaResult.primaryCTA.type,
            actionStrength: ctaResult.primaryCTA.actionStrength,
            visibility: ctaResult.primaryCTA.visibility,
            context: ctaResult.primaryCTA.context
          } : undefined,
          issues: ctaResult.issues,
          recommendations: ctaResult.recommendations
        };
        scores.push(ctaResult.score);

        await page.close();
      } catch (error) {
        console.error('❌ CTA analysis failed:', error);
        analysisResult.ctaAnalysis = {
          score: 0,
          ctas: [],
          issues: ['CTA analysis failed due to error'],
          recommendations: []
        };
      } finally {
        await browser.close();
      }
    }

    console.log('📊 Building analysis result object...')
    analysisResult.overallScore = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;

    console.log(`🎉 Analysis complete! Overall score: ${analysisResult.overallScore}/100`)
    console.log('📤 Sending response to client...')
    
    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      message: 'Analysis completed successfully.'
    });

  } catch (error) {
    console.error('💥 Analysis API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}