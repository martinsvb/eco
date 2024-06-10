import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ScopeItems } from '@eco/types';
import { Buttons } from '../components';

interface ContactsButtonsProps {
  isLoading: boolean;
  handleNew: () => void;
  handleRefresh: () => void;
}

export const ContactsButtons = memo(({
  isLoading,
  handleNew,
  handleRefresh,
}: ContactsButtonsProps) => {

  const { t } = useTranslation();

  return (
    <Buttons
      isLoading={isLoading}
      scope={ScopeItems.Contacts}
      refreshButton={
        <IconButton
          aria-label={t('labels:refresh')}
          onClick={handleRefresh}
          size='large'
          sx={{
            mb: 2
          }}
        >
          <RefreshIcon />
        </IconButton>
      }
      createButton={
        <Fab
          aria-label={t('contacts:createContact')}
          onClick={handleNew}
          color='primary'
        >
          <AddIcon />
        </Fab>
      }
    />
  );
});
