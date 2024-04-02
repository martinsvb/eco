/* eslint-disable no-restricted-imports */
import '@fontsource/source-sans-pro';
import { Typography } from '@mui/material/styles/createTypography';

export const DEFAULT_TABLE_TYPOGRAPHY_VARIANT = 'body2';

export const typography: Partial<Typography> = {
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightBold: 600,
  fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
  h2: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
  },
  h3: {
    fontWeight: 300,
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.4,
  },
};
