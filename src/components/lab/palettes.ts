export type Mode = 'kinetic' | 'silk' | 'weave' | 'audio'
export type PaletteName = 'amethyst' | 'temple-gold' | 'lotus'

export const palettes: Record<PaletteName, { bg: string; c: [string, string, string] }> = {
  amethyst: { bg: '#0d0a1f', c: ['#7f5cff', '#b794ff', '#e9ddff'] },
  'temple-gold': { bg: '#120c18', c: ['#e8a64a', '#f5c56b', '#ffe9c2'] },
  lotus: { bg: '#140a1c', c: ['#ff6fae', '#b794ff', '#ffd6ec'] },
}

