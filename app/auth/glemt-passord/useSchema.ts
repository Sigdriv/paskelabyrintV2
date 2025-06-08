import { globalSchema } from '@schema';

export function useSchema() {
  const { createEmailSchema } = globalSchema();

  const schema = {
    email: createEmailSchema(),
  };

  return {
    schema,
  };
}
