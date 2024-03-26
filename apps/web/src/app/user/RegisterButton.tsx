import { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Register from '../Auth/Register';

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterButton = () => {

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
      <Button
        color="inherit"
        onClick={handleClickOpen}
      >
        {t('labels:registerButton')}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Register handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default RegisterButton;
