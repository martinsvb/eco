import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.host}/api`
    : 'http://localhost:3010';

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1M2NmZjYyNC0zYTU2LTQyNTUtOGE5Zi1mMmYxMWY2OTQ2OTIiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE3MDkxMzc5NzEsImV4cCI6MTcwOTEzOTc3MX0._M5ANRa7lvzgSDR6MOIzqysHkeEzpw_mG7Nj5YjZghQ';

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
