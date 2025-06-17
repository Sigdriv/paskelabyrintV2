'use client';

import { Header1, Table } from '@components';
import { useUsers } from '@hooks';

import { UserActions } from './UserActions';

export default function AllUsers() {
  const { data = [], error, isPending } = useUsers();

  return (
    <div>
      <Header1>Alle brukere</Header1>

      <Table
        emptyText="Ingen brukere funnet"
        error={error}
        header={[
          { label: 'Navn' },
          { label: 'E-post' },
          { label: 'Rolle' },
          { label: 'Handlinger' },
        ]}
        isLoading={isPending}
        items={data.map(({ id, name, email, role }) => [
          <div key={JSON.stringify({ id, name })}>{name}</div>,
          <div key={JSON.stringify({ id, email })}>{email}</div>,
          <div key={JSON.stringify({ id, role })}>{role}</div>,
          <UserActions key={id} name={name} userId={id} />,
        ])}
      />
    </div>
  );
}
