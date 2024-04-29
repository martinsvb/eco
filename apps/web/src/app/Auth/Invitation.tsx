import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Paper, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { unsplashUrl } from '@eco/config';
import InvitationForm from './InvitationForm';

const Invitation = () => {

  const { palette, shape } = useTheme();

  const { t } = useTranslation();

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`;
  });

  return (
    <Stack
      height={`calc(100vh - ${isMobilePortrait ? 208 : 96}px)`}
      justifyContent="center"
      alignItems="center"
      sx={{
        background: unsplashUrl,
        borderRadius: shape.borderRadius / 4
      }}
    >
      <Stack
        width={isMobilePortrait ? 300 : 600}
        component={Paper}
        spacing={4}
        padding={4}
        sx={{
          backgroundColor: alpha(palette.background.default, .8),
          borderRadius: shape.borderRadius / 2
        }}
      >
        <Typography variant='h4'>{t('invitation')}</Typography>
        <InvitationForm />
      </Stack>
    </Stack>
  );
};

export default memo(Invitation);
