import { globalSchema } from '@schema';

export function useSchema() {
  const { createPasswordSchema, createRepeatPasswordSchema } = globalSchema();

  const schema = {
    password: createPasswordSchema(),
    repeatPassword: createRepeatPasswordSchema(),
  };

  return {
    schema,
  };
}
