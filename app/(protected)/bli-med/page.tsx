'use client';

import type { NewTeam } from '@api';

import { useUser } from '@app';
import { Button, Card, Form, Skeleton, TextInput } from '@components';
import { useEffect, useState } from 'react';
import { checkSchemaError } from '@schema';
import { usePostTeam } from '@hooks';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';

import { useSchema } from './schema';
import { initialTeam } from './utils';

export default function BliMed() {
  const router = useRouter().push;

  const { user, isFetchingUser } = useUser();
  const { schema } = useSchema();

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [team, setTeam] = useState<NewTeam>(initialTeam);

  const { mutate, isPending } = usePostTeam({
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
      <Form action="submit" onAction={handleSubmit}>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                isRequired
                errorText={fieldError.contactName}
                isError={!!fieldError.contactName && isSubmitAttempted}
                label="Kontaktperson navn"
                type="text"
                value={team.contactName}
                onChange={(value) => setTeam({ ...team, contactName: value })}
              />
            </Skeleton>

            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                isRequired
                errorText={fieldError.contactEmail}
                isError={!!fieldError.contactEmail && isSubmitAttempted}
                label="Kontaktperson epost"
                type="email"
                value={team.contactEmail}
                onChange={(value) => setTeam({ ...team, contactEmail: value })}
              />
            </Skeleton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                isRequired
                errorText={fieldError.teamName}
                isError={!!fieldError.teamName && isSubmitAttempted}
                label="Lagnavn"
                type="text"
                value={team.teamName}
                onChange={(value) => setTeam({ ...team, teamName: value })}
              />
            </Skeleton>

            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                isRequired
                errorText={fieldError.numberOfParticipants}
                isError={!!fieldError.numberOfParticipants && isSubmitAttempted}
                label="Antall deltakere"
                type="number"
                value={team.numberOfParticipants}
                onChange={(value) =>
                  setTeam({ ...team, numberOfParticipants: value })
                }
              />
            </Skeleton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                errorText={fieldError.youngestParticipantAge}
                isError={
                  !!fieldError.youngestParticipantAge && isSubmitAttempted
                }
                label="Yngste deltaker alder"
                type="number"
                value={team.youngestParticipantAge}
                onChange={(value) =>
                  setTeam({ ...team, youngestParticipantAge: value })
                }
              />
            </Skeleton>

            <Skeleton isLoading={isFetchingUser}>
              <TextInput
                errorText={fieldError.oldestParticipantAge}
                isError={!!fieldError.oldestParticipantAge && isSubmitAttempted}
                label="Eldste deltaker alder"
                type="number"
                value={team.oldestParticipantAge}
                onChange={(value) =>
                  setTeam({ ...team, oldestParticipantAge: value })
                }
              />
            </Skeleton>
          </div>

          <Button isLoading={isPending} type="submit" variant="solid">
            Bli med
          </Button>
        </div>
      </Form>
    </Card>
  );
}
