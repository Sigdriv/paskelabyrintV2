export type FloatNumberOrString = number | string;

export function parseNumber(value?: FloatNumberOrString): number | undefined {
  if (value === undefined || typeof value === 'number') return value;

  const parsedValue = value.replace(',', '.');

  return parsedValue.length > 0 ? parseFloat(parsedValue) : undefined;
}
