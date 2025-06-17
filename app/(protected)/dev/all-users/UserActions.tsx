import { EditIcon } from '@components';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
}

export function UserActions({ userId }: Props) {
  const navigate = useRouter().push;

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon onClick={() => navigate(`all-users/${userId}`)} />
      </span>
    </div>
  );
}
