import { globalSchema } from '@schema';

export function useSchema() {
  const {
    createEmailSchema,
    createPasswordSchema,
    createPhoneNrSchema,
    createStringSchema,
    createRepeatPasswordSchema,
  } = globalSchema();

  const schema = {
    name: createStringSchema('Navn', 5, 400),
    email: createEmailSchema(),
    phoneNr: createPhoneNrSchema(),
    password: createPasswordSchema(),
    reapeatPassword: createRepeatPasswordSchema(),
  };

  return {
    schema,
  };
}
