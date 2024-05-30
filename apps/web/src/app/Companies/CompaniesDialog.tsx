import { memo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AppDialog } from '../components';

interface CompaniesDialogProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CompaniesDialog = ({
  isLoading,
  open,
  handleClose,
  handleDelete,
}: CompaniesDialogProps) => {

  const { t } = useTranslation();

  return (
    <AppDialog
      actions={
        <>
          <Button
            autoFocus
            id="company-delete-button-close"
            onClick={handleClose}
          >
            {t('labels:close')}
          </Button>
          <LoadingButton
            id="company-delete-button-submit"
            loading={isLoading}
            type="submit"
            variant="contained"
            onClick={handleDelete}
          >
            {t('labels:delete')}
          </LoadingButton>
        </>
      }
      id="company-delete"
      dialogTitle={t('companies:delete-question-title')}
      contentText={t('companies:delete-question-text')}
      open={open}
    />
  );
};

export default memo(CompaniesDialog);
