import { forwardRef, useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Login } from '../Auth/Login';

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginButton = () => {

  const [open, setOpen] = useState(false);

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
      <Button
        color="inherit"
        onClick={handleClickOpen}
      >
        Login
      </Button>
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
