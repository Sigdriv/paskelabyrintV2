'use client';

import type { TkError } from '@http';

import { errorDescriptionMapper, errorTitleMapper } from '@http';

import { InfoBox } from '../InfoBox/InfoBox';

type Props = {
  error: TkError | null;
  header?: string;
  headerLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  text?: string;
  variant?: 'error' | 'warning';
};

export function QueryError({ error, header, text = '' }: Props) {
  const textFromError = () => {
    if (text) return text;

    if (error) return errorDescriptionMapper[error.statusCode] || error.message;

    return 'En ukjent feil oppstod. Vennligst prøv igjen senere.';
  };

  const headerFromError = () => {
    if (header) return header;

    if (error) {
      return errorTitleMapper[error.statusCode] || 'Ukjent feil';
    }

    return 'Ukjent feil';
  };

  return (
    <div className="flex items-center justify-center w-full max-w-120">
      <InfoBox
        isQuery
        body={text || textFromError()}
        header={headerFromError()}
        isVisible={!!error}
        variant="danger"
      />
    </div>
  );
}
