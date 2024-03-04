import { endPoints } from '@eco/config';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleAccount = () => {
  return (
    <GoogleLogin
      onSuccess={async ({ credential }) => {
        try {
          const response = await fetch(`/api/${endPoints.loginGoogle}`, {
            method: 'POST',
            body: JSON.stringify({ token: credential }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log({ data });
        } catch (error) {
          console.log({ error });
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
