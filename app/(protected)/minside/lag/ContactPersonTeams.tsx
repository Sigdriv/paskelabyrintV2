'use client';

import { Button, Card, Header1, QueryError, Skeleton } from '@components';
import { useTeams } from '@hooks';

export function ContactPersonTeams() {
  const {
    data = [],
    isPending: isFetchingTeams,
    error,
  } = useTeams({ isContactPersonTeams: true });

  if (data.length === 0 && !isFetchingTeams && !error) return null;

  return (
    <div>
      <Header1>Dine lag hvor du er kontaktperson</Header1>

      <Skeleton count={3} elements={['teams']} isLoading={isFetchingTeams} />

      <QueryError error={error} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {data.map(({ id, teamName }) => (
          <Card key={id} header={teamName} width="max-w-md">
            <div className="flex flex-row gap-2">
              <Button href={`lag/${id}`} variant="solid">
                Rediger lag
              </Button>

              <Button isDisabled color="danger" onClick={() => {}}>
                Slett lag
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
