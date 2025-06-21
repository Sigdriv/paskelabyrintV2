'use client';

import { Button, Card } from '@components';
import { useUsers } from '@hooks';

export default function Dev() {
  const { data = [] } = useUsers();

  return (
    <Card header="Alle brukere" headerAlign="center" width="max-w-md">
      <div className="flex flex-col items-center gap-4">
        <p className="text-default-500 text-xl">{data.length}</p>

        <Button href="dev/all-users" variant="solid">
          Se alle brukere
        </Button>
      </div>
    </Card>
  );
}
