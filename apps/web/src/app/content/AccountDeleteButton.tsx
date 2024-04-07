import { MouseEvent, forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import ms from 'ms';
import { useSnackbar } from 'notistack';
import { apiDeleteAccount, selectIsAccountsLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { ApiOperations } from '@eco/types';

interface AccountDeleteButtonProps {
  id: string;
}

const Transition = forwardRef((
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountDeleteButton = ({id}: AccountDeleteButtonProps) => {

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const { breakpoints } = useTheme();

  const fullScreen = useMediaQuery(breakpoints.down('md'));

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => selectIsAccountsLoading(state, ApiOperations.deleteItem));

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

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(apiDeleteAccount({
        id,
        onSuccess: () => {
          enqueueSnackbar(t('accounts:deleted'), {variant: 'success'});
          setOpen(false);
        }
      }));
    },
    [dispatch, id]
  );

  return (
    <>
      <Tooltip
        title={t('labels:delete')}
        enterDelay={ms('0.1s')}
      >
        <IconButton
          aria-label={t('labels:delete')}
          id="account-delete-button"
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle id="account-delete-dialog-title">
          {t('accounts:delete-question-title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="account-delete-dialog-content-text">
            {t('accounts:delete-question-text')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            id="account-delete-button-close"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
          <LoadingButton
            id="account-delete-button-submit"
            loading={isLoading}
            type="submit"
            variant="contained"
            onClick={handleDelete}
          >
            {t('labels:delete')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AccountDeleteButton;
