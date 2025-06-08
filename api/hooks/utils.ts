export type HooksParams<TRes = unknown, TData = unknown> = {
  onSuccess: (res: TRes, data: TData) => void;
};
