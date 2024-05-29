import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import {
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogContentProps
} from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { DialogTransition } from './DialogTransition';
import { is } from 'ramda';
import { useMobileDetection } from '../../hooks';

export type DialogClickOpen = (id?: GridRowId | null) => void;

export const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [dialogItemId, setItemId] = useState<GridRowId | null>(null);

  const handleClickOpen = useCallback(
    (id?: GridRowId | null | MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      if (is(String, id) || is(Number, id)) {
        setItemId(id);
      }
    },
    []
  );

  const handleClose = useCallback(
    () => {
      setOpen(false);
      setItemId(null);
    },
    []
  );

  return {
    open,
    dialogItemId,
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
  dialogContentProps?: DialogContentProps;
}

const AppDialog = ({actions, id, dialogTitle, contentText, dialogContentProps, ...rest}: AppDialogProps) => {

  const fullScreen = useMobileDetection();

  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={DialogTransition}
      {...rest}
    >
      <DialogTitle id={`${id}-dialog-title`}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent {...dialogContentProps}>
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
