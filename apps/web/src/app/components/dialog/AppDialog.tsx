import { MouseEvent, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogProps,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogContentProps,
  Stack
} from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTransition } from './DialogTransition';
import { is } from 'ramda';
import { useMobileDetection } from '../../hooks';
import { AppIconButton } from '../buttons';

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
  actions?: ReactNode;
  id: string;
  dialogTitle: ReactNode;
  contentText: ReactNode;
  dialogContentProps?: DialogContentProps;
  handleClose?: () => void;
}

export const AppDialog = ({
  actions,
  id,
  dialogTitle,
  contentText,
  dialogContentProps,
  handleClose,
  ...rest
}: AppDialogProps) => {

  const { t } = useTranslation();

  const fullScreen = useMobileDetection();

  return (
    <Dialog
      {...rest}
      fullScreen={fullScreen}
      TransitionComponent={DialogTransition}
      sx={{
        ...rest.sx,
        '& .MuiDialogTitle-root': {
          pb: 1
        }
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <DialogTitle id={`dialog-title-${id}`}>
          {dialogTitle}
        </DialogTitle>
        {handleClose &&
          <AppIconButton
            title={t('labels:close')}
            id={`dialog-close-button-${id}`}
            onClick={handleClose}
            sx={{
              mr: 4
            }}
          >
            <CloseIcon />
          </AppIconButton>
        }
      </Stack>
      <DialogContent {...dialogContentProps}>
        <DialogContentText id={`dialog-content-text-${id}`}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
