import { DeleteIcon, Dialog, EditIcon } from '@components';
import { Tooltip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  userId: string;
  name: string;
}

export function UserActions({ userId, name }: Props) {
  const navigate = useRouter().push;

  const [deleteUser, setDeleteUser] = useState<string>('');

  return (
    <div className=" relative flex items-center gap-2">
      <Tooltip content="Oppdater bruker">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon onClick={() => navigate(`all-users/${userId}`)} />
        </span>
      </Tooltip>

      <Tooltip color="danger" content="Slette bruker">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon onClick={() => setDeleteUser(userId)} />
        </span>
      </Tooltip>

      <Dialog
        isDelete
        header={`Slette bruker ${name}?`}
        isOpen={!!deleteUser}
        isSubmitting={false}
        onClose={() => setDeleteUser('')}
        onSubmit={() => {}}
      >
        <p>Er du sikker på at du vil slette denne brukeren?</p>
      </Dialog>
    </div>
  );
}
