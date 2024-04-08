import { ReactNode, useCallback, useState } from 'react';
import {
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { DialogTransition } from './DialogTransition';

export const useDialog = () => {
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

  return {
    open,
    setOpen,
    handleClickOpen,
    handleClose
  };
}

interface AppDialogProps extends DialogProps {
  actions: ReactNode;
  id: string;
  dialogTitle: ReactNode;
  contentText: ReactNode;
}

const AppDialog = ({actions, id, dialogTitle, contentText, ...rest}: AppDialogProps) => {

  const { breakpoints } = useTheme();

  const fullScreen = useMediaQuery(breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={DialogTransition}
      {...rest}
    >
      <DialogTitle id={`${id}-dialog-title`}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-dialog-content-text`}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}

export default AppDialog;
