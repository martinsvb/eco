// "undefined" means the URL will be computed from the `window.location` object
export const URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.host}/api`
    : 'http://localhost:3010';
