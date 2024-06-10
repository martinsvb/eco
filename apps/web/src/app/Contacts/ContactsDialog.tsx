import { memo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AppDialog } from '../components';

interface ContactsDialogProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const ContactsDialog = memo(({
  isLoading,
  open,
  handleClose,
  handleDelete,
}: ContactsDialogProps) => {

  const { t } = useTranslation();

  return (
    <AppDialog
      actions={
        <>
          <Button
            autoFocus
            id="contact-delete-button-close"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
          <LoadingButton
            id="contact-delete-button-submit"
            loading={isLoading}
            type="submit"
            variant="contained"
            onClick={handleDelete}
          >
            {t('labels:delete')}
          </LoadingButton>
        </>
      }
      id="contact-delete"
      dialogTitle={t('contacts:delete-question-title')}
      contentText={t('contacts:delete-question-text')}
      open={open}
    />
  );
});
