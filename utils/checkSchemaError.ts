import type { ZodType } from 'zod';

export function checkSchemaError<T>(schema: ZodType<T>, value: T): string {
  const parsed = schema.safeParse(value);

  if (parsed.success) {
    return '';
  }

  return parsed.error.issues[0].message;
}
