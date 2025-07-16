type TkErrorType<T> = {
  data?: T;
  errorText: string;
  statusCode: number;
};

export const errorTitleMapper = {
  400: 'Dårlig forespørsel',
  401: 'Uautorisert',
  403: 'Forbudt',
  404: 'Ikke funnet',
  409: 'Allerede i bruk',
  410: 'Ugyldig lenke',
  500: 'Intern serverfeil',
  unknown: 'Ukjent feil',
  default: 'Ukjent feil',
} as const;

export const errorDescriptionMapper = {
  400: 'Innsendt data er ugyldig. Dette kan skyldes en feil hos oss eller hos deg. Prøv igjen, og dersom problemet vedvarer, ta kontakt med oss.',
  401: 'Du er ikke autorisert til å utføre denne handlingen. Vennligst logg inn eller sjekk dine tilgangsrettigheter.',
  403: 'Du har ikke tilgang til denne ressursen. Vennligst kontakt administrator hvis du mener dette er en feil.',
  404: 'Vi fant ikke innholdet du ba om. Dersom du mener dette er en feil, ta kontakt med oss.',
  409: 'Denne ressursen er allerede i bruk, vennligst velg en annen.',
  410: 'Denne lenken er ikke lenger gyldig. Vennligst be om en ny.',
  500: 'Det skjedde en ukjent feil. Prøv igjen, og dersom problemet vedvarer, ta kontakt med oss.',
  unknown: 'Det oppstod en ukjent feil. Vennligst prøv igjen senere.',
  default: 'Det oppstod en ukjent feil. Vennligst prøv igjen senere.',
} as const;

export const conflictErrorMapper: Record<string, string> = {
  teamName: 'Dette lagnavnet er allerede i bruk, venligst velg et annet.',
  email:
    'Denne e-postadressen er allerede i bruk. Hvis det er din, logg inn eller tilbakestill passordet ditt',
  default: 'Denne ressursen er allerede i bruk, vennligst velg en annen.',
};

export class TkError<ErrorData = undefined> extends Error {
  data?: ErrorData;
  statusCode: 400 | 401 | 403 | 404 | 409 | 410 | 500;

  constructor({ data, errorText, statusCode }: TkErrorType<ErrorData>) {
    super(errorText);
    this.data = data;
    if (
      statusCode === 400 ||
      statusCode === 401 ||
      statusCode === 403 ||
      statusCode === 404 ||
      statusCode === 409 ||
      statusCode === 410 ||
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
