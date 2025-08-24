export const urls = {
  signIn: '/api/auth/login',
  signUp: '/api/auth/signup',
  startPasskeyRegistration: '/api/auth/passkey/register-options',
  finishPasskeyRegistration: '/api/auth/passkey/finish-registration',

  verifyPasskeyLogin: '/api/auth/passkey/verify-passkey-login',
  getLoginOptions: '/api/auth/passkey/login-options',

  getUser: (userId?: string) => (userId ? `/api/user/${userId}` : '/api/user'),
  googleSignin: '/api/auth/google/login',
  signOut: '/api/auth/logout',
  forgottPassword: '/api/auth/forgott-password',
  validateToken: (token: string) => `/api/auth/validate-token/${token}`,
  resetPassword: (token: string) => `/api/auth/reset-password/${token}`,
  getUsers: '/api/users',
  updateUser: '/api/user',

  postTeam: '/api/teams',
  getTeams: (queryParams: string) => `/api/teams${queryParams}`,
  getTeam: (teamId: string) => `/api/teams/${teamId}`,
  deleteTeam: (id: string) => `/api/teams/${id}`,
  updateTeam: '/api/teams',
} as const;
