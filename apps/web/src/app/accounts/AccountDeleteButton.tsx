import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { apiDeleteAccount, selectIsAccountsLoading, useAppDispatch, useAppSelector } from '@eco/redux';
import { ApiOperations } from '@eco/types';
import { AppDialog, AppIconButton, useDialog } from '../components';

interface AccountDeleteButtonProps {
  id: string;
}

const AccountDeleteButton = ({id}: AccountDeleteButtonProps) => {

  const { open, setOpen, handleClickOpen, handleClose } = useDialog();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => selectIsAccountsLoading(state, ApiOperations.deleteItem));

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(apiDeleteAccount({
        id,
        onSuccess: () => {
          setOpen(false);
        }
      }));
    },
    [dispatch, setOpen, id]
  );

  return (
    <>
      <AppIconButton
        title={t('labels:delete')}
        id='account-delete-button'
        onClick={handleClickOpen}
      ><DeleteIcon /></AppIconButton>
      <AppDialog
        actions={
          <>
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
          </>
        }
        id="account-delete"
        dialogTitle={t('accounts:delete-question-title')}
        contentText={t('accounts:delete-question-text')}
        open={open}
      />
    </>
  );
}

export default AccountDeleteButton;
