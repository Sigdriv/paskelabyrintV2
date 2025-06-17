export const mapReadyState: Record<number, 'warning' | 'success' | 'danger'> = {
  0: 'warning',
  1: 'success',
  2: 'warning',
  3: 'danger',
} as const;

export const mapReadyText: Record<number, string> = {
  0: 'Kobler til',
  1: 'Tilkoblet',
  2: 'Lukker',
  3: 'Frakoblet',
} as const;
