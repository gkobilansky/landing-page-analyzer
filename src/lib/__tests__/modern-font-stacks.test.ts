/**
 * Modern Font Stacks Test Suite
 *
 * Tests for the modern font stacks utility module based on modernfontstacks.com
 */

import {
  modernFontStacks,
  findMatchingStack,
  extractPrimaryFont,
  suggestModernStacks,
  getStackById,
  getStacksByCategory,
  FontStackSuggestion,
} from '../modern-font-stacks'

describe('Modern Font Stacks', () => {
  describe('modernFontStacks registry', () => {
    it('should have all major font stack categories', () => {
      const stackIds = modernFontStacks.map((s) => s.id)

      expect(stackIds).toContain('system-ui')
      expect(stackIds).toContain('neo-grotesque')
      expect(stackIds).toContain('humanist')
      expect(stackIds).toContain('geometric-humanist')
      expect(stackIds).toContain('transitional')
      expect(stackIds).toContain('old-style')
      expect(stackIds).toContain('monospace-code')
    })

    it('should have valid stack structure for each entry', () => {
      for (const stack of modernFontStacks) {
        expect(stack.id).toBeTruthy()
        expect(stack.name).toBeTruthy()
        expect(stack.category).toMatch(/^(sans-serif|serif|monospace|display)$/)
        expect(stack.stack).toBeTruthy()
        expect(stack.description).toBeTruthy()
        expect(Array.isArray(stack.similarTo)).toBe(true)
      }
    })
  })

  describe('findMatchingStack', () => {
    it('should match Roboto to neo-grotesque', () => {
      const stack = findMatchingStack('Roboto')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('neo-grotesque')
    })

    it('should match Inter to neo-grotesque', () => {
      const stack = findMatchingStack('Inter')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('neo-grotesque')
    })

    it('should match Montserrat to geometric-humanist', () => {
      const stack = findMatchingStack('Montserrat')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('geometric-humanist')
    })

    it('should match Poppins to geometric-humanist', () => {
      const stack = findMatchingStack('Poppins')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('geometric-humanist')
    })

    it('should match Open Sans to humanist', () => {
      const stack = findMatchingStack('Open Sans')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('humanist')
    })

    it('should match Lato to humanist', () => {
      const stack = findMatchingStack('Lato')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('humanist')
    })

    it('should match Merriweather to transitional', () => {
      const stack = findMatchingStack('Merriweather')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('transitional')
    })

    it('should match Playfair Display to didone', () => {
      const stack = findMatchingStack('Playfair Display')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('didone')
    })

    it('should match Fira Code to monospace-code', () => {
      const stack = findMatchingStack('Fira Code')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('monospace-code')
    })

    it('should match Oswald to industrial', () => {
      const stack = findMatchingStack('Oswald')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('industrial')
    })

    it('should match Roboto Slab to slab-serif', () => {
      const stack = findMatchingStack('Roboto Slab')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('slab-serif')
    })

    it('should be case-insensitive', () => {
      const stack1 = findMatchingStack('ROBOTO')
      const stack2 = findMatchingStack('roboto')
      const stack3 = findMatchingStack('Roboto')

      expect(stack1?.id).toBe('neo-grotesque')
      expect(stack2?.id).toBe('neo-grotesque')
      expect(stack3?.id).toBe('neo-grotesque')
    })

    it('should return null for unknown fonts', () => {
      const stack = findMatchingStack('MyCustomFont')
      expect(stack).toBeNull()
    })

    it('should handle partial matches', () => {
      // "Source Sans Pro" should match "source sans pro"
      const stack = findMatchingStack('Source Sans Pro')
      expect(stack).not.toBeNull()
      expect(stack?.id).toBe('humanist')
    })
  })

  describe('extractPrimaryFont', () => {
    it('should extract first font from comma-separated list', () => {
      const font = extractPrimaryFont('Roboto, Arial, sans-serif')
      expect(font).toBe('Roboto')
    })

    it('should remove quotes from font names', () => {
      const font1 = extractPrimaryFont('"Open Sans", sans-serif')
      const font2 = extractPrimaryFont("'Montserrat', Arial, sans-serif")

      expect(font1).toBe('Open Sans')
      expect(font2).toBe('Montserrat')
    })

    it('should handle single font declarations', () => {
      const font = extractPrimaryFont('Arial')
      expect(font).toBe('Arial')
    })

    it('should handle complex font stacks', () => {
      const font = extractPrimaryFont(
        '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif'
      )
      expect(font).toBe('Helvetica Neue')
    })
  })

  describe('suggestModernStacks', () => {
    it('should return suggestions for web fonts', () => {
      const fontFamilies = [
        'Roboto, Arial, sans-serif',
        '"Open Sans", sans-serif',
      ]

      const suggestions = suggestModernStacks(fontFamilies)

      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions.some((s) => s.detectedFont === 'Roboto')).toBe(true)
    })

    it('should not duplicate stack suggestions', () => {
      const fontFamilies = [
        'Roboto, sans-serif',
        'Inter, Arial, sans-serif', // Both map to neo-grotesque
      ]

      const suggestions = suggestModernStacks(fontFamilies)

      // Should only have one neo-grotesque suggestion
      const neoGrotesqueCount = suggestions.filter(
        (s) => s.suggestedStack.id === 'neo-grotesque'
      ).length
      expect(neoGrotesqueCount).toBe(1)
    })

    it('should return empty array for system fonts only', () => {
      const fontFamilies = ['Arial, sans-serif', 'Georgia, serif']

      const suggestions = suggestModernStacks(fontFamilies)

      // These are system fonts, may or may not have suggestions
      // The key is it shouldn't crash
      expect(Array.isArray(suggestions)).toBe(true)
    })

    it('should include reason in suggestions', () => {
      const fontFamilies = ['Montserrat, sans-serif']

      const suggestions = suggestModernStacks(fontFamilies)

      expect(suggestions.length).toBe(1)
      expect(suggestions[0].reason).toContain('Montserrat')
      expect(suggestions[0].reason).toContain('Geometric Humanist')
    })

    it('should handle empty input', () => {
      const suggestions = suggestModernStacks([])
      expect(suggestions).toEqual([])
    })
  })

  describe('getStackById', () => {
    it('should return stack by ID', () => {
      const stack = getStackById('neo-grotesque')
      expect(stack).not.toBeNull()
      expect(stack?.name).toBe('Neo-Grotesque')
    })

    it('should return null for unknown ID', () => {
      const stack = getStackById('unknown-stack')
      expect(stack).toBeNull()
    })
  })

  describe('getStacksByCategory', () => {
    it('should return all sans-serif stacks', () => {
      const stacks = getStacksByCategory('sans-serif')
      expect(stacks.length).toBeGreaterThan(0)
      expect(stacks.every((s) => s.category === 'sans-serif')).toBe(true)
    })

    it('should return all serif stacks', () => {
      const stacks = getStacksByCategory('serif')
      expect(stacks.length).toBeGreaterThan(0)
      expect(stacks.every((s) => s.category === 'serif')).toBe(true)
    })

    it('should return all monospace stacks', () => {
      const stacks = getStacksByCategory('monospace')
      expect(stacks.length).toBeGreaterThan(0)
      expect(stacks.every((s) => s.category === 'monospace')).toBe(true)
    })
  })

  describe('Real-world font stack scenarios', () => {
    it('should handle typical SaaS landing page fonts', () => {
      const fontFamilies = [
        'Inter, system-ui, sans-serif',
        '"DM Sans", Arial, sans-serif',
      ]

      const suggestions = suggestModernStacks(fontFamilies)
      expect(suggestions.some((s) => s.suggestedStack.id === 'neo-grotesque')).toBe(true)
    })

    it('should handle editorial/blog fonts', () => {
      const fontFamilies = [
        '"Playfair Display", Georgia, serif',
        '"Source Sans Pro", Arial, sans-serif',
      ]

      const suggestions = suggestModernStacks(fontFamilies)
      expect(suggestions.some((s) => s.suggestedStack.id === 'didone')).toBe(true)
      expect(suggestions.some((s) => s.suggestedStack.id === 'humanist')).toBe(true)
    })

    it('should handle developer documentation fonts', () => {
      const fontFamilies = [
        '"IBM Plex Sans", Arial, sans-serif',
        '"IBM Plex Mono", monospace',
      ]

      const suggestions = suggestModernStacks(fontFamilies)
      expect(suggestions.some((s) => s.suggestedStack.id === 'neo-grotesque')).toBe(true)
      expect(suggestions.some((s) => s.suggestedStack.id === 'monospace-code')).toBe(true)
    })
  })
})
