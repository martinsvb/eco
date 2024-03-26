import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { selectRegistration, useShallowEqualSelector } from '@eco/redux';
import { RegistrationState } from '@eco/types';
import RegistrationForm from './RegistrationForm';
import VerificationForm from './VerificationForm';

interface RegistrationProps {
  handleClose: () => void;
}

const Registration = ({handleClose}: RegistrationProps) => {

  const { palette, shape } = useTheme();

  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const state = useShallowEqualSelector(selectRegistration);

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
        background: 'url(https://source.unsplash.com/featured/1920x1080)',
      }}
    >
      <Stack
        width={600}
        component={Paper}
        spacing={4}
        padding={4}
        sx={{
          backgroundColor: alpha(palette.common[isLightMode ? 'white' : 'black'], .8),
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
