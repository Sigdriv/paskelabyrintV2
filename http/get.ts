import { resToTkError } from './TkError';

type Params = {
  url: string;
};

export async function get<T, ErrorData = undefined>({
  url,
}: Params): Promise<T> {
  const res: Response = await fetch(url);

  if (!res.ok) {
    throw await resToTkError<ErrorData>(res);
  }

  const result = (await res.json()) as T & { message: string };
  return result;
}
