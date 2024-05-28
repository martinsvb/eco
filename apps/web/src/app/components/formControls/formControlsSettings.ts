import { Palette } from '@mui/material/styles';
import { Shape } from '@mui/system';

export const getBaseFormControlShape = (palette: Palette, shape: Shape, error?: boolean) => {
  const borderColor = error ? palette.error.main : palette.grey[500];

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
  },
});

export const getFocusedBorder = (palette: Palette, error?: boolean) => (
  `2px solid ${error ? palette.error.main : palette.primary.main}`
);
