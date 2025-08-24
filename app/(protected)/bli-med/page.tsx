'use client';

import type { NewTeam } from '@api';

import { useUser } from '@app';
import { Card } from '@components';
import { useEffect, useState } from 'react';
import { checkSchemaError } from '@schema';
import { usePostTeam } from '@hooks';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';

import { useSchema } from './schema';
import { initialTeam } from './utils';
import { JoinForm } from './JoinForm';

export default function BliMed() {
  const router = useRouter().push;

  const { user, isFetchingUser } = useUser();
  const { schema } = useSchema();

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [team, setTeam] = useState<NewTeam>(initialTeam);

  const { mutate, isPending } = usePostTeam({
    userEmail: user?.email || '',
    onSuccess: (_, { teamName }) => {
      addToast({
        title: 'Lag opprettet',
        description: `Ditt lag "${teamName}" er nå opprettet`,
        color: 'success',
      });
      setTeam(initialTeam);
      setIsSubmitAttempted(false);
      router('/minside/lag');
    },
  });

  useEffect(() => {
    if (user) {
      setTeam((prev) => ({
        ...prev,
        contactName: user.name,
        contactEmail: user.email,
      }));
    }
  }, [user]);

  const fieldError = {
    contactName: checkSchemaError(schema.contactName, team.contactName),
    contactEmail: checkSchemaError(schema.contactEmail, team.contactEmail),
    teamName: checkSchemaError(schema.teamName, team.teamName),
    numberOfParticipants: checkSchemaError(
      schema.numberOfParticipants,
      team.numberOfParticipants
    ),
    youngestParticipantAge: team.youngestParticipantAge
      ? checkSchemaError(
          schema.youngestParticipantAge,
          team.youngestParticipantAge
        )
      : '',
    oldestParticipantAge: team.oldestParticipantAge
      ? checkSchemaError(schema.oldestParticipantAge, team.oldestParticipantAge)
      : '',
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleSubmit = () => {
    if (errors.length === 0) mutate(team);

    setIsSubmitAttempted(true);
  };

  return (
    <Card align="center" header="Bli med">
      <JoinForm
        fieldError={fieldError}
        handleSubmit={handleSubmit}
        isFetchingData={isFetchingUser}
        isPending={isPending}
        isSubmitAttempted={isSubmitAttempted}
        setTeam={setTeam}
        team={team}
        type="create"
      />
    </Card>
  );
}
