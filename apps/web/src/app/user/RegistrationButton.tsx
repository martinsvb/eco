import { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { setRegistration, useAppDispatch } from '@eco/redux';
import { RegistrationState } from '@eco/types';
import Registration from '../Auth/Registration';

interface RegistrationButtonProps {
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

const RegistrationButton = ({isMobile}: RegistrationButtonProps) => {

  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleClickOpen = useCallback(
    () => {
      dispatch(setRegistration(RegistrationState.registration));
      setOpen(true);
    },
    [dispatch]
  );

  const handleClose = useCallback(
    () => {
      dispatch(setRegistration(RegistrationState.none));
      setOpen(false);
    },
    [dispatch]
  );

  return (
    <>
      {isMobile ?
        <IconButton
          aria-label={t('labels:registerButton')}
          onClick={handleClickOpen}
        >
          <HowToRegIcon />
        </IconButton>
        :
        <Button
          color="inherit"
          onClick={handleClickOpen}
        >
          {t('labels:registerButton')}
        </Button>
      }
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Registration handleClose={handleClose} />
      </Dialog>
    </>
  );
}

export default RegistrationButton;
