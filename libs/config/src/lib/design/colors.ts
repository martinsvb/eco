import { Palette } from '@mui/material/styles';
import { THEME_MODE } from './theme/config/palette/types';

export const getBackgroundColor = ({ mode, common }: Palette) =>
  mode === THEME_MODE.LIGHT ? common.white : common.black;

export const getForegroundColor = ({ mode, common }: Palette) =>
  mode === THEME_MODE.LIGHT ? common.black : common.white;
