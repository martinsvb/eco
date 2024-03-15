import { Divider, Stack } from '@mui/material';
import { GoogleLoginCmp } from './GoogleLogin';
import { LoginForm } from './LoginForm';

export const Login = () => {

  return (
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      <GoogleLoginCmp />
      <LoginForm />
    </Stack>
  );
};
