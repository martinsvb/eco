import { COLORS } from '../../../colors';
import { PaletteConfigType, THEME_MODE } from './types';

export const PALETTE_CONFIG: PaletteConfigType = {
  [THEME_MODE.DARK]: {
    mode: THEME_MODE.DARK,
    primary: {
      main: COLORS.blue600,
    },
    secondary: {
      main: COLORS.white,
    },
    error: {
      main: COLORS.red600,
    },
    warning: {
      main: COLORS.yellow600,
    },
    info: {
      dark: COLORS.info,
      main: COLORS.darkBlue50,
    },
    success: {
      main: COLORS.success,
    },
    background: {
      default: COLORS.grey700,
      paper: COLORS.grey700,
    },
  },
  [THEME_MODE.LIGHT]: {
    mode: THEME_MODE.LIGHT,
    primary: {
      main: COLORS.blue600,
    },
    secondary: {
      light: COLORS.darkBlue800,
      main: COLORS.darkBlue900,
    },
    error: {
      main: COLORS.red600,
    },
    warning: {
      main: COLORS.yellow600,
      dark: COLORS.orangeYellow600,
    },
    info: {
      dark: COLORS.blue800,
      main: COLORS.info,
    },
    success: {
      main: COLORS.success,
    },
    background: {
      default: COLORS.white,
      paper: COLORS.white,
    },
  },
};
