import { resToTkError } from './TkError';

type Params = {
  url: string;
};

export async function del<T, ErrorData = undefined>({
  url,
}: Params): Promise<T & { message: string }> {
  const res = await fetch(url, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw await resToTkError<ErrorData>(res);
  }

  const result = (await res.json()) as T & { message: string };

  return result;
}
