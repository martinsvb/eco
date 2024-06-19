import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface AppGridFilterToolbarProps {
  filterValues: (string | null)[];
  handleClearFilter: () => void;
}

export const AppGridFilterToolbar = memo(({
  filterValues,
  handleClearFilter
}: AppGridFilterToolbarProps) => {

  const { t } = useTranslation();

  const { palette, typography } = useTheme();

  return (
    <Stack
      direction="row"
      p={1.5}
      alignItems="center"
      borderBottom={`1px solid ${palette.grey[300]}`}
    >
      <Typography fontWeight={typography.fontWeightBold} mr={1}>{`${t('labels:filter')}:`}</Typography>
      {filterValues.map((value, index) => (
        <Typography mr={1}>
          {value}
          {index < filterValues.length - 1 ? ', ' : ''}
        </Typography>
      ))}
      <Button
        id="clearFilter"
        color="warning"
        startIcon={<ClearIcon />}
        onClick={handleClearFilter}
        sx={{
          marginLeft: 'auto'
        }}
      >
        {t('labels:filterSearchClear')}
      </Button>
    </Stack>
  );
});
