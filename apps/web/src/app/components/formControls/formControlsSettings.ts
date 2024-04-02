import { Palette } from '@mui/material/styles';
import { Shape } from '@mui/system';
import { COLORS, getBackgroundColor } from '@eco/config';

export const getBaseFormControlShape = (palette: Palette, shape: Shape, error?: boolean) => ({
  borderRadius: shape.borderRadius,
  backgroundColor: getBackgroundColor(palette),
  border: `1px solid ${error ? palette.error.main : COLORS.lavenderGrey100}`,
  width: '100%',
});

export const getLabelShape = (marginTop: string) => ({
  'label + &': {
    marginTop,
  },
});

export const getFocusedBorder = (palette: Palette, error?: boolean) => (
  `1px solid ${error ? palette.error.main : palette.primary.main}`
);
