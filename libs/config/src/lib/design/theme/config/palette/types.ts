import { PaletteOptions } from '@mui/material/styles';

export enum THEME_MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export type PaletteConfigType = {
  [item in THEME_MODE]: PaletteOptions;
};
