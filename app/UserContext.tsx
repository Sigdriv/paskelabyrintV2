import type { User } from '@api';

import { createContext, useContext } from 'react';
import { useGetUser } from '@hooks';

const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

interface UserContextType {
  user: User | undefined;
  isFetchingUser: boolean;
  isFetchingUserError: boolean;
}

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  const {
    data: user,
    isPending: isFetchingUser,
    isError: isFetchingUserError,
  } = useGetUser();

  const state: UserContextType = {
    user,
    isFetchingUser,
    isFetchingUserError,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
