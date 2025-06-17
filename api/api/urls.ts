export const urls = {
  signIn: '/api/auth/login',
  signUp: '/api/auth/signup',
  getUser: (userId?: string) => (userId ? `/api/user/${userId}` : '/api/user'),
  googleSignin: '/api/auth/google/login',
  signOut: '/api/auth/logout',
  forgottPassword: '/api/auth/forgott-password',
  validateToken: (token: string) => `/api/auth/validate-token/${token}`,
  resetPassword: (token: string) => `/api/auth/reset-password/${token}`,
  getUsers: '/api/users',
  updateUser: '/api/user',
} as const;
