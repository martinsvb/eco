import { Palette } from '@mui/material/styles';
import { Shape } from '@mui/system';
import { THEME_MODE } from '@eco/config';

export const getBaseFormControlShape = (palette: Palette, shape: Shape, error?: boolean) => {
  const borderColor = error
    ? palette.error.main
    : palette.mode === THEME_MODE.LIGHT
      ? palette.grey[500]
      : palette.common.white;

  return {
    borderRadius: shape.borderRadius,
    backgroundColor: palette.background.default,
    border: `1px solid ${borderColor}`,
    width: '100%',
  }
};

export const getLabelShape = (marginTop: string) => ({
  'label + &': {
    marginTop,
    fontSize: 14
  },
});

export const getFocusedBorder = (palette: Palette, error?: boolean) => (
  `1px solid ${error ? palette.error.main : palette.primary.main}`
);
