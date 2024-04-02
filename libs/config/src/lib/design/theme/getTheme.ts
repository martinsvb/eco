import { createTheme } from '@mui/material/styles';
import { MuiButton } from './config/button';
import { MuiChip } from './config/chip';
import { MuiContainer } from './config/container';
import { MuiDialog } from './config/dialog';
import { MuiDialogContent } from './config/dialogContent';
import { MuiDialogTitle } from './config/dialogTitle';
import { MuiGrid } from './config/grid';
import { PALETTE_CONFIG } from './config/palette/paletteConfig';
import { THEME_MODE } from './config/palette/types';
import { shape } from './config/shape';
import { typography } from './config/typography';

const getTheme = (isLightMode: boolean) =>
  createTheme({
    components: {
      MuiButton,
      MuiChip,
      MuiGrid,
      MuiContainer,

      // Dialog Overrides
      MuiDialog,
      MuiDialogTitle,
      MuiDialogContent,
    },
    shape,
    typography,
    palette: PALETTE_CONFIG[isLightMode ? THEME_MODE.LIGHT : THEME_MODE.DARK],
  });

export default getTheme;
