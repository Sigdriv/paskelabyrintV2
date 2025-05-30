import { globalSchema } from '@schema';

export function useSchema() {
  const { createStringSchema, createEmailSchema } = globalSchema();

  const schema = {
    email: createEmailSchema(),
    password: createStringSchema('Description', 1, 4000),
  };

  return {
    schema,
  };
}
