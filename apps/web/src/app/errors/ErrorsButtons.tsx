import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ScopeItems } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';

interface ErrorsButtonsProps {
  isLoading: boolean;
  handleRefresh: () => void;
}

const ErrorsButtons = ({
  isLoading,
  handleRefresh,
}: ErrorsButtonsProps) => {

  const { t } = useTranslation();

  return (
    <Buttons
      isLoading={isLoading}
      scope={ScopeItems.Errors}
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
      createButton={null}
    />
  );
};

export default memo(ErrorsButtons);
