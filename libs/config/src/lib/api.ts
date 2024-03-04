//@ts-ignore
export const apiPrefix = process.env.NODE_ENV = 'development' ? 'api' : '';

export const endPoints = {
  account: 'account',
  accounts: 'accounts',
  loginGoogle: 'auth/login-google',
  users: 'users',
};
