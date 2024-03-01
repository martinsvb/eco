export const apiPrefix = 'api';

export const endPoints = {
  account: 'account',
  accounts: 'accounts',
  loginGoogle: 'auth/login-google',
  users: 'users',
};

export const api = {
  account: `/${apiPrefix}/${endPoints.account}`,
  accounts: `/${apiPrefix}/${endPoints.accounts}`,
  loginGoogle: `/${apiPrefix}/${endPoints.loginGoogle}`,
  users: `/${apiPrefix}/${endPoints.users}`,
};
