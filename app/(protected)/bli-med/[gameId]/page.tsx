'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useWebsocket } from '@websocket';
import { Card, Header1, Form, TextInput, Button } from '@components';
import { addToast } from '@heroui/react';

import { Answers } from './Answers';

export type Answer = {
  id: string;
  questionId: string;
  teamId: string;
  answer: string;
  submittedBy: string;
  createdAt: string;
};

export default function Game() {
  const { gameId } = useParams<{ gameId: string }>();

  const [answer, setAnswer] = useState<string>('');
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const {
    send,
    data: answers = [],
    error,
    readyState,
  } = useWebsocket<Answer[]>({
    url: 'ws://localhost:8080/ws',
  });

  const handleSubmit = () => {
    if (answer !== '') {
      send({ answer, type: 'answer' });
      setIsSubmitAttempted(false);
      setAnswer('');

      return;
    }

    setIsSubmitAttempted(true);
  };

  useEffect(() => {
    if (error) {
      console.log('WebSocket error:', error);
      setIsSubmitAttempted(false);
      addToast({
        title: 'Error',
        description: 'Det skjedde en feil under henting/sending av data',
        color: 'danger',
      });
    }
  }, [error]);

  return (
    <div className="h-full">
      <Header1>Game: {gameId}</Header1>

      <Card fullHeight align="center" readyState={readyState || 3}>
        <Answers answers={answers} />

        <Form action="submit" onAction={handleSubmit}>
          <div className="w-full flex flex-col gap-2">
            <TextInput
              errorText="Svar kan ikke være tomt"
              isError={isSubmitAttempted && answer == ''}
              label="Svar"
              type="text"
              value={answer}
              onChange={(value) => setAnswer(value)}
            />

            <Button type="submit" variant="solid">
              Svar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
