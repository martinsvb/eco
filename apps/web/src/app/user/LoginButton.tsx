import { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import LoginIcon from '@mui/icons-material/Login';
import Login from '../Auth/Login';

interface LoginButtonProps {
  isMobile?: boolean;
}

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginButton = ({isMobile}: LoginButtonProps) => {

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(
    () => {
      setOpen(false);
    },
    []
  );

  return (
    <>
      {isMobile ?
        <IconButton
          aria-label={t('labels:loginButton')}
          id="loginButton"
          onClick={handleClickOpen}
        >
          <LoginIcon />
        </IconButton>
        :
        <Button
          color="inherit"
          id="loginButton"
          onClick={handleClickOpen}
        >
          {t('labels:loginButton')}
        </Button>
      }
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Login handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default LoginButton;
