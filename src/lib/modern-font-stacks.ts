/**
 * Modern Font Stacks
 *
 * System font stacks organized by typeface classification.
 * Based on https://modernfontstacks.com/
 *
 * Benefits:
 * - No downloading, no layout shifts, no flashes
 * - Instant renders using pre-installed system fonts
 * - Consistent typography across platforms
 */

export interface ModernFontStack {
  id: string
  name: string
  category: 'sans-serif' | 'serif' | 'monospace' | 'display'
  stack: string
  description: string
  similarTo: string[] // Web fonts this stack can replace
}

/**
 * Complete collection of modern font stacks
 */
export const modernFontStacks: ModernFontStack[] = [
  // Sans-Serif Stacks
  {
    id: 'system-ui',
    name: 'System UI',
    category: 'sans-serif',
    stack: 'system-ui, sans-serif',
    description: 'The default system font. Clean and familiar on every platform.',
    similarTo: ['SF Pro', 'San Francisco', 'Segoe UI'],
  },
  {
    id: 'humanist',
    name: 'Humanist',
    category: 'sans-serif',
    stack: "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
    description: 'Warm, readable humanist sans-serif with calligraphic influence.',
    similarTo: ['Gill Sans', 'Source Sans Pro', 'Open Sans', 'Lato', 'Fira Sans'],
  },
  {
    id: 'geometric-humanist',
    name: 'Geometric Humanist',
    category: 'sans-serif',
    stack: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
    description: 'Modern geometric sans with humanist touches. Great for headings.',
    similarTo: ['Montserrat', 'Avenir', 'Proxima Nova', 'Gotham', 'Nunito', 'Poppins', 'Quicksand'],
  },
  {
    id: 'classical-humanist',
    name: 'Classical Humanist',
    category: 'sans-serif',
    stack: "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
    description: 'Elegant sans-serif with subtle serif influences.',
    similarTo: ['Optima', 'Raleway', 'Questrial'],
  },
  {
    id: 'neo-grotesque',
    name: 'Neo-Grotesque',
    category: 'sans-serif',
    stack: "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
    description: 'Clean, neutral, and highly legible. The modern workhorse.',
    similarTo: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'Barlow', 'DM Sans', 'Work Sans', 'IBM Plex Sans'],
  },
  {
    id: 'industrial',
    name: 'Industrial',
    category: 'sans-serif',
    stack: "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
    description: 'Bold, condensed industrial style. Great for impact.',
    similarTo: ['DIN', 'Oswald', 'Bebas Neue', 'Anton', 'Barlow Condensed'],
  },
  {
    id: 'rounded-sans',
    name: 'Rounded Sans',
    category: 'sans-serif',
    stack: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
    description: 'Friendly and approachable with rounded terminals.',
    similarTo: ['Quicksand', 'Comfortaa', 'Varela Round', 'Nunito'],
  },

  // Serif Stacks
  {
    id: 'transitional',
    name: 'Transitional',
    category: 'serif',
    stack: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
    description: 'Balanced, readable serif. Excellent for body text.',
    similarTo: ['Charter', 'Merriweather', 'Libre Baskerville', 'PT Serif', 'Noto Serif'],
  },
  {
    id: 'old-style',
    name: 'Old Style',
    category: 'serif',
    stack: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
    description: 'Classic, warm serif with traditional character.',
    similarTo: ['Palatino', 'Book Antiqua', 'Crimson Text', 'Libre Baskerville', 'EB Garamond', 'Garamond'],
  },
  {
    id: 'slab-serif',
    name: 'Slab Serif',
    category: 'serif',
    stack: "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
    description: 'Bold, sturdy slab serif. Strong visual presence.',
    similarTo: ['Roboto Slab', 'Rockwell', 'Arvo', 'Zilla Slab', 'Slabo'],
  },
  {
    id: 'antique',
    name: 'Antique',
    category: 'serif',
    stack: "Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
    description: 'Vintage, friendly serif with distinctive character.',
    similarTo: ['Bookman', 'Clarendon', 'Coustard'],
  },
  {
    id: 'didone',
    name: 'Didone',
    category: 'serif',
    stack: "Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', P052, Sylfaen, serif",
    description: 'High contrast, elegant serif. Sophisticated and editorial.',
    similarTo: ['Bodoni', 'Didot', 'Playfair Display', 'Cormorant Garamond'],
  },

  // Monospace Stacks
  {
    id: 'monospace-slab',
    name: 'Monospace Slab Serif',
    category: 'monospace',
    stack: "'Nimbus Mono PS', 'Courier New', monospace",
    description: 'Classic typewriter style monospace.',
    similarTo: ['Courier', 'Courier Prime'],
  },
  {
    id: 'monospace-code',
    name: 'Monospace Code',
    category: 'monospace',
    stack: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
    description: 'Modern coding font stack. Optimized for readability.',
    similarTo: ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'IBM Plex Mono', 'Inconsolata'],
  },

  // Display Stack
  {
    id: 'handwritten',
    name: 'Handwritten',
    category: 'display',
    stack: "'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
    description: 'Casual handwritten style for personal touch.',
    similarTo: ['Comic Sans', 'Caveat', 'Dancing Script', 'Pacifico'],
  },
]

/**
 * Map of common web fonts to their best matching modern font stack
 */
const webFontToStackMapping: Record<string, string> = {
  // Neo-Grotesque matches
  'inter': 'neo-grotesque',
  'roboto': 'neo-grotesque',
  'helvetica': 'neo-grotesque',
  'arial': 'neo-grotesque',
  'barlow': 'neo-grotesque',
  'dm sans': 'neo-grotesque',
  'work sans': 'neo-grotesque',
  'ibm plex sans': 'neo-grotesque',
  'nunito sans': 'neo-grotesque',

  // Geometric Humanist matches
  'montserrat': 'geometric-humanist',
  'avenir': 'geometric-humanist',
  'proxima nova': 'geometric-humanist',
  'gotham': 'geometric-humanist',
  'nunito': 'geometric-humanist',
  'poppins': 'geometric-humanist',
  'quicksand': 'geometric-humanist',
  'futura': 'geometric-humanist',
  'josefin sans': 'geometric-humanist',
  'comfortaa': 'rounded-sans',
  'varela round': 'rounded-sans',

  // Humanist matches
  'open sans': 'humanist',
  'lato': 'humanist',
  'source sans': 'humanist',
  'source sans pro': 'humanist',
  'fira sans': 'humanist',
  'noto sans': 'humanist',
  'muli': 'humanist',
  'mulish': 'humanist',
  'cabin': 'humanist',

  // Classical Humanist
  'raleway': 'classical-humanist',
  'optima': 'classical-humanist',
  'questrial': 'classical-humanist',

  // Industrial matches
  'oswald': 'industrial',
  'bebas neue': 'industrial',
  'anton': 'industrial',
  'barlow condensed': 'industrial',
  'din': 'industrial',

  // Transitional serif matches
  'merriweather': 'transitional',
  'pt serif': 'transitional',
  'noto serif': 'transitional',
  'charter': 'transitional',
  'libre baskerville': 'transitional',
  'lora': 'transitional',
  'source serif': 'transitional',
  'source serif pro': 'transitional',

  // Old Style serif matches
  'garamond': 'old-style',
  'eb garamond': 'old-style',
  'crimson text': 'old-style',
  'cormorant': 'old-style',
  'cormorant garamond': 'old-style',
  'palatino': 'old-style',
  'book antiqua': 'old-style',
  'libre caslon': 'old-style',

  // Slab Serif matches
  'roboto slab': 'slab-serif',
  'arvo': 'slab-serif',
  'zilla slab': 'slab-serif',
  'slabo': 'slab-serif',
  'rockwell': 'slab-serif',
  'rokkitt': 'slab-serif',
  'bitter': 'slab-serif',

  // Didone matches
  'playfair display': 'didone',
  'bodoni': 'didone',
  'didot': 'didone',
  'cormorant infant': 'didone',
  'libre bodoni': 'didone',

  // Monospace matches
  'fira code': 'monospace-code',
  'jetbrains mono': 'monospace-code',
  'source code pro': 'monospace-code',
  'ibm plex mono': 'monospace-code',
  'inconsolata': 'monospace-code',
  'ubuntu mono': 'monospace-code',
  'cascadia code': 'monospace-code',
  'monaco': 'monospace-code',
  'consolas': 'monospace-code',

  // Handwritten matches
  'caveat': 'handwritten',
  'dancing script': 'handwritten',
  'pacifico': 'handwritten',
  'comic sans': 'handwritten',
  'comic sans ms': 'handwritten',
  'kalam': 'handwritten',
  'indie flower': 'handwritten',
}

export interface FontStackSuggestion {
  detectedFont: string
  suggestedStack: ModernFontStack
  reason: string
}

/**
 * Find the best matching modern font stack for a given font name
 */
export function findMatchingStack(fontName: string): ModernFontStack | null {
  const normalizedName = fontName.toLowerCase().trim()

  // Direct lookup
  const stackId = webFontToStackMapping[normalizedName]
  if (stackId) {
    return modernFontStacks.find(s => s.id === stackId) || null
  }

  // Partial match - check if the font name contains a known font
  for (const [knownFont, stackId] of Object.entries(webFontToStackMapping)) {
    if (normalizedName.includes(knownFont) || knownFont.includes(normalizedName)) {
      return modernFontStacks.find(s => s.id === stackId) || null
    }
  }

  // Check similarTo arrays
  for (const stack of modernFontStacks) {
    for (const similar of stack.similarTo) {
      if (similar.toLowerCase() === normalizedName ||
          normalizedName.includes(similar.toLowerCase())) {
        return stack
      }
    }
  }

  return null
}

/**
 * Extract the primary font name from a font-family declaration
 */
export function extractPrimaryFont(fontFamilyDeclaration: string): string {
  // Get the first font in the stack
  const firstFont = fontFamilyDeclaration.split(',')[0].trim()
  // Remove quotes
  return firstFont.replace(/['"]/g, '')
}

/**
 * Generate modern font stack suggestions for detected web fonts
 */
export function suggestModernStacks(fontFamilies: string[]): FontStackSuggestion[] {
  const suggestions: FontStackSuggestion[] = []
  const seenStacks = new Set<string>()

  for (const declaration of fontFamilies) {
    const primaryFont = extractPrimaryFont(declaration)
    const matchingStack = findMatchingStack(primaryFont)

    if (matchingStack && !seenStacks.has(matchingStack.id)) {
      seenStacks.add(matchingStack.id)
      suggestions.push({
        detectedFont: primaryFont,
        suggestedStack: matchingStack,
        reason: `Replace "${primaryFont}" with the ${matchingStack.name} stack for zero-download instant rendering.`,
      })
    }
  }

  return suggestions
}

/**
 * Get a modern font stack by ID
 */
export function getStackById(id: string): ModernFontStack | null {
  return modernFontStacks.find(s => s.id === id) || null
}

/**
 * Get all stacks in a category
 */
export function getStacksByCategory(category: ModernFontStack['category']): ModernFontStack[] {
  return modernFontStacks.filter(s => s.category === category)
}
