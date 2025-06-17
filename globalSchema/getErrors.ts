interface Params<T extends object> {
  fieldError: T;
}

export function getErrors<T extends object>({ fieldError }: Params<T>) {
  return Object.values(fieldError).filter((error) => !!error);
}
