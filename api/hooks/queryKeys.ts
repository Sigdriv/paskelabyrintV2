export const queryKeys = {
  getUser: (userId?: string) => ['getUser', userId],
  validateToken: (token: string) => [`auth/validate-token/${token}`],
  getUsers: ['getUsers'],
  getTeams: (isContactPersonTeams: boolean) => [
    'getTeams',
    isContactPersonTeams,
  ],
  getTeam: (teamId: string) => ['getTeam', teamId],
};
