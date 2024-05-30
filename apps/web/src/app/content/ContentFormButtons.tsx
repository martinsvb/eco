import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { LoadingButton } from '@mui/lab';

interface ContentFormButtonsProps {
  isLoading: boolean;
  isValid: boolean;
  isRoot?: boolean;
  handleClick: () => void;
  handleClose: () => void;
}

const ContentFormButtons = ({
  isLoading,
  isValid,
  isRoot,
  handleClick,
  handleClose,
}: ContentFormButtonsProps) => {

  const { t } = useTranslation();

  const { id } = useParams();

  return (
    <Grid xs={12}>
      <Stack direction="row" justifyContent="end">
        {isRoot &&
          <Button
            variant="text"
            onClick={handleClose}
            sx={{mr: 1}}
          >
            {t('labels:close')}
          </Button>
        }
        <LoadingButton
          disabled={!isValid}
          loading={isLoading}
          variant="contained"
          onClick={handleClick}
        >
          {isRoot && id ? t('labels:edit') : t('labels:create')}
        </LoadingButton>
      </Stack>
    </Grid>
  );
};

export default memo(ContentFormButtons);
