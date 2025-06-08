export const queryKeys = {
  getUser: ['getUser'],
  validateToken: (token: string) => [`auth/validate-token/${token}`],
};
