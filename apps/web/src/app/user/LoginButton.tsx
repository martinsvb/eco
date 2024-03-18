import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { routes } from '@eco/config';

const LoginButton = () => {

  const navigate = useNavigate();

  const handleClick = useCallback(
    () => {
      navigate(`${routes.base}${routes.login}`);
    },
    [navigate]
  )

  return (
    <Button
      color="inherit"
      onClick={handleClick}
    >
      Login
    </Button>
  );
}

export default LoginButton;
