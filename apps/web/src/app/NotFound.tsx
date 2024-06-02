import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { routes } from '@eco/config';

export const NotFound = () => {

  const { t } = useTranslation();

  const { palette, shape } = useTheme();

  return (
    <Box>
      <Typography variant='h2' mb={1}>{t('notFoundPage')}</Typography>
      <Divider />
      <Typography variant='body1' mt={2} mb={4}>{t('notFoundPageInfo')}</Typography>
      <Link to={routes.home}>
        <Typography
          variant='h6'
          px={4}
          py={1}
          sx={{
            display: 'inline-block',
            border: `1px solid ${palette.grey[500]}`,
            background: palette.grey[300],
            borderRadius: shape.borderRadius / 4
          }}
        >
          {t('home')}
        </Typography>
      </Link>
    </Box>
  );
};
