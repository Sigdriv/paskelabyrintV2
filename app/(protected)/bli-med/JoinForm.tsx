'use client';

import type { NewTeam } from '@api';

import { Button, Form, Skeleton, TextInput } from '@components';
import React from 'react';

interface Props<T extends NewTeam> {
  isFetchingData: boolean;
  fieldError: Record<string, string | undefined>;
  isSubmitAttempted: boolean;
  team: T;
  setTeam: (team: T) => void;
  handleSubmit: () => void;
  isPending: boolean;
  type: 'update' | 'create';
}

export function JoinForm<T extends NewTeam>({
  isFetchingData: isFetchingUser,
  fieldError,
  isSubmitAttempted,
  team,
  setTeam,
  handleSubmit,
  isPending,
  type,
}: Props<T>) {
  return (
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
              isError={!!fieldError.youngestParticipantAge && isSubmitAttempted}
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
          {type === 'update' ? 'Oppdater' : 'Bli med'}
        </Button>
      </div>
    </Form>
  );
}
