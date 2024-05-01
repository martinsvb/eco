import { memo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AppDialog from '../components/dialog/AppDialog';

interface UsersDialogProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const UsersDialog = ({
  isLoading,
  open,
  handleClose,
  handleDelete,
}: UsersDialogProps) => {

  const { t } = useTranslation();

  return (
    <AppDialog
      actions={
        <>
          <Button
            autoFocus
            id="user-delete-button-close"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
          <LoadingButton
            id="user-delete-button-submit"
            loading={isLoading}
            type="submit"
            variant="contained"
            onClick={handleDelete}
          >
            {t('labels:delete')}
          </LoadingButton>
        </>
      }
      id="user-delete"
      dialogTitle={t('users:delete-question-title')}
      contentText={t('users:delete-question-text')}
      open={open}
    />
  );
};

export default memo(UsersDialog);
