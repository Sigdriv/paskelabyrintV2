import { resToTkError } from './TkError';

type Params = {
  url: string;
  body: object;
  contentType?: string;
};

export async function patch<T, ErrorData = undefined>({
  url,
  body,
  contentType = 'application/json',
}: Params): Promise<T & { message: string }> {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw await resToTkError<ErrorData>(res);
  }

  const result = (await res.json()) as T & { message: string };

  return result;
}
