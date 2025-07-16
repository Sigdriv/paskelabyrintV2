'use client';

import {
  Button,
  Card,
  Dialog,
  Header1,
  QueryError,
  Skeleton,
} from '@components';
import { addToast } from '@heroui/react';
import { useDeleteTeam, useTeams } from '@hooks';
import { useState } from 'react';

export default function Teams() {
  const [deleteTeam, setDeleteTeam] = useState<string>();

  const { data = [], isPending: isFetchingTeams, error } = useTeams();
  const { mutate, isPending } = useDeleteTeam({
    onSuccess: () => {
      setDeleteTeam(undefined);
      addToast({
        title: 'Lag slettet',
        description: 'Laget er nå slettet',
        color: 'success',
      });
    },
  });

  return (
    <div>
      <Header1>Dine lag</Header1>

      <Skeleton count={3} elements={['teams']} isLoading={isFetchingTeams} />

      <QueryError error={error} />

      {data.length === 0 && !isFetchingTeams && !error && (
        <p className="text-center text-gray-500">
          Du har ingen lag. Opprett et lag for å være med på reisen!
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {data.map(({ id, teamName }) => (
          <Card key={id} header={teamName} width="max-w-md">
            <div className="flex flex-row gap-2">
              <Button href={`lag/${id}`} variant="solid">
                Rediger lag
              </Button>

              <Button color="danger" onClick={() => setDeleteTeam(id)}>
                Slett lag
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        isDelete
        header="Slette lag?"
        isOpen={!!deleteTeam}
        isSubmitting={isPending}
        onClose={() => setDeleteTeam(undefined)}
        onSubmit={() => mutate({ id: deleteTeam || '' })}
      >
        <p>Er du sikker på at du vil slette laget?</p>
      </Dialog>
    </div>
  );
}
