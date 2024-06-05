import { Palette } from '@mui/material/styles';
import { Shape } from '@mui/system';

export const getBaseFormControlShape = (palette: Palette, shape: Shape, error?: boolean, noBorder?: boolean) => {
  const borderColor = error ? palette.error.main : palette.grey[500];

  return {
    borderRadius: shape.borderRadius,
    backgroundColor: palette.background.default,
    border: !noBorder ? `1px solid ${borderColor}` : undefined,
    width: '100%',
  }
};

export const getLabelShape = (marginTop: string | number) => ({
  'label + &': {
    marginTop,
  },
});

export const getFocusedBorder = (palette: Palette, error?: boolean, noBorderFocus?: boolean) => (
  !noBorderFocus
    ? `2px solid ${error ? palette.error.main : palette.primary.main}`
    : undefined
);
