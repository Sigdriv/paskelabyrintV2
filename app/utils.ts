export const errorTitleMapper = {
  400: 'Dårlig forespørsel',
  401: 'Uautorisert',
  403: 'Forbudt',
  404: 'Ikke funnet',
  409: 'Allerede i bruk',
  410: 'Ugyldig lenke',
  500: 'Intern serverfeil',
  default: 'Ukjent feil',
} as const;

export const errorDescriptionMapper = {
  400: 'Innsendt data er ugyldig. Dette kan skyldes en feil hos oss eller hos deg. Prøv igjen, og dersom problemet vedvarer, ta kontakt med oss.',
  401: 'Du er ikke autorisert til å utføre denne handlingen. Vennligst logg inn eller sjekk dine tilgangsrettigheter.',
  403: 'Du har ikke tilgang til denne ressursen. Vennligst kontakt administrator hvis du mener dette er en feil.',
  404: 'Vi fant ikke innholdet du ba om. Dersom du mener dette er en feil, ta kontakt med oss.',
  409: 'Denne e-postadressen er allerede i bruk. Hvis det er din, logg inn eller tilbakestill passordet ditt',
  410: 'Denne lenken er ikke lenger gyldig. Vennligst be om en ny.',
  500: 'Det skjedde en ukjent feil. Prøv igjen, og dersom problemet vedvarer, ta kontakt med oss.',
  default: 'Det oppstod en ukjent feil. Vennligst prøv igjen senere.',
} as const;
