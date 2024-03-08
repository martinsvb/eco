import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.host}/api`
    : 'http://localhost:3010';

export let token = '';

export const socket = io(URL, {
  autoConnect: false,
  path: '',
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
});
