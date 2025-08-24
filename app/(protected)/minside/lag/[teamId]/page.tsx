'use client';

import type { Team } from '@api';

import { Card } from '@components';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkSchemaError } from '@schema';
import { useTeam, useUpdateTeam } from '@hooks';
import { useUser } from '@app';
import { addToast } from '@heroui/react';

import { useSchema } from '../../../bli-med/schema';
import { JoinForm } from '../../../bli-med/JoinForm';

import { initialTeam } from './utils';

export default function Page() {
  const router = useRouter().push;
  const { teamId = '' } = useParams<{ teamId: string }>();
  const { user: { email = '' } = {} } = useUser();
  const { schema } = useSchema();

  const [team, setTeam] = useState<Team>(initialTeam);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const { data: currentTeam, isPending: isFetchingTeam } = useTeam({ teamId });
  const { mutate, isPending: isUpdatingTeam } = useUpdateTeam({
    onSuccess: (_, { teamName }) => {
      addToast({
        title: 'Laget ble oppdatert',
        description: `Endringene i laget "${teamName}" ble lagret.`,
        color: 'success',
      });
      router('.');
    },
    userEmail: email,
  });

  useEffect(() => {
    if (currentTeam) {
      setTeam({ ...currentTeam });
    }
  }, [currentTeam]);

  const fieldError = {
    contactName: checkSchemaError(schema.contactName, team.contactName),
    contactEmail: checkSchemaError(schema.contactEmail, team.contactEmail),
    teamName: checkSchemaError(schema.teamName, team.teamName),
    numberOfParticipants: checkSchemaError(
      schema.numberOfParticipants,
      team.numberOfParticipants
    ),
    youngestParticipantAge: checkSchemaError(
      schema.youngestParticipantAge,
      team.youngestParticipantAge
    ),
    oldestParticipantAge: checkSchemaError(
      schema.oldestParticipantAge,
      team.oldestParticipantAge
    ),
  };

  const errors = Object.values(fieldError).filter((error) => !!error);

  const handleSubmit = () => {
    if (errors.length === 0) mutate(team);

    setIsSubmitAttempted(true);
  };

  return (
    <div>
      <Card align="center" header="Oppdater lag">
        <JoinForm<Team>
          fieldError={fieldError}
          handleSubmit={handleSubmit}
          isFetchingData={isFetchingTeam}
          isPending={isUpdatingTeam}
          isSubmitAttempted={isSubmitAttempted}
          setTeam={setTeam}
          team={team}
          type="update"
        />
      </Card>
    </div>
  );
}
