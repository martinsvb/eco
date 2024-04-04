import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Paper, Stack, Typography, useTheme } from '@mui/material';
import { selectRegistration, useAppSelector } from '@eco/redux';
import { RegistrationState } from '@eco/types';
import RegistrationForm from './RegistrationForm';
import VerificationForm from './VerificationForm';
import { unsplashUrl } from '@eco/config';

interface RegistrationProps {
  handleClose: () => void;
  isMobile?: boolean;
}

const Registration = ({handleClose, isMobile}: RegistrationProps) => {

  const { palette, shape } = useTheme();

  const state = useAppSelector(selectRegistration);

  const { t } = useTranslation();

  const titles = useMemo(
    () => {
      return {
        [RegistrationState.registration]: t('registration:inProgress'),
        [RegistrationState.verification]: t('registration:verification'),
      } as {[key: string]: string}
    },
    [t]
  );

  return (
    <Stack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: unsplashUrl,
      }}
    >
      <Stack
        width={isMobile ? 300 : 600}
        component={Paper}
        spacing={4}
        padding={4}
        sx={{
          backgroundColor: alpha(palette.background.default, .8),
          borderRadius: shape.borderRadius / 2
        }}
      >
        <Typography variant='h4'>{titles[state] || t('labels:registerButton')}</Typography>
        {state === RegistrationState.registration && <RegistrationForm handleClose={handleClose} />}
        {state === RegistrationState.verification && <VerificationForm handleClose={handleClose} />}
      </Stack>
    </Stack>
  );
};

export default memo(Registration);
