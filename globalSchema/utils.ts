import { parseNumber } from '@utils';

export function isNumeric(val: string): boolean {
  const parsed = parseNumber(val);

  return parsed === undefined ? false : isFinite(parsed);
}

export const notUndefined = (value: unknown): boolean =>
  value !== undefined && value !== null;
