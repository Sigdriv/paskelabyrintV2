type TkErrorType<T> = {
  data?: T;
  errorText: string;
  statusCode: number;
};

export class TkError<ErrorData = undefined> extends Error {
  data?: ErrorData;
  statusCode: 400 | 401 | 404 | 409 | 500;

  constructor({ data, errorText, statusCode }: TkErrorType<ErrorData>) {
    super(errorText);
    this.data = data;
    if (
      statusCode === 400 ||
      statusCode === 401 ||
      statusCode === 404 ||
      statusCode === 409 ||
      statusCode === 500
    ) {
      this.statusCode = statusCode;
    } else {
      throw new Error(`Invalid statusCode: ${statusCode}`);
    }
  }
}

export async function resToTkError<ErrorData>(
  res: Response
): Promise<TkError<ErrorData>> {
  const resBody = await res.json();
  const { data, error } = resBody;

  return new TkError<ErrorData>({
    data,
    errorText: error ?? '',
    statusCode: res.status,
  });
}
