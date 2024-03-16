import { Divider, Stack } from '@mui/material';
import { GoogleLoginCmp } from './GoogleLogin';
import { LoginForm } from './LoginForm';

export const Login = () => {

  return (
    <Stack
      height="calc(100vh - 180px)"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        width={300}
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
      >
        <GoogleLoginCmp />
        <LoginForm />
      </Stack>
    </Stack>
  );
};
