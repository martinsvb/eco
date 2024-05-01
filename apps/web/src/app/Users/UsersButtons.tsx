import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ScopeItems } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';

interface UsersButtonsProps {
  isLoading: boolean;
  handleNew: () => void;
  handleRefresh: () => void;
}

const UsersButtons = ({
  isLoading,
  handleNew,
  handleRefresh,
}: UsersButtonsProps) => {

  const { t } = useTranslation();

  return (
    <Buttons
      isLoading={isLoading}
      scope={ScopeItems.Users}
      refreshButton={
        <IconButton
          aria-label={t('users:refresh')}
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
          aria-label={t('users:createUser')}
          onClick={handleNew}
          color='primary'
        >
          <AddIcon />
        </Fab>
      }
    />
  );
};

export default memo(UsersButtons);
