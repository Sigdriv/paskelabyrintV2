import { roles } from '@api';
import { globalSchema } from '@schema';
import z from 'zod';

export function useSchema() {
  const { createEmailSchema, createStringSchema } = globalSchema();

  const schema = {
    email: createEmailSchema(),
    name: createStringSchema('Navn', 1, 100),
    role: z.enum(roles),
  };

  return {
    schema,
  };
}
