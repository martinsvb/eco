import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { alpha, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import RegisterForm from './RegisterForm';

interface RegisterProps {
  handleClose: () => void;
}

const Register = ({handleClose}: RegisterProps) => {

  const { palette, shape } = useTheme();

  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const { t } = useTranslation();

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
        <Typography variant='h4'>{t('labels:registerButton')}</Typography>
        <RegisterForm handleClose={handleClose} />
      </Stack>
    </Stack>
  );
};

export default memo(Register);
