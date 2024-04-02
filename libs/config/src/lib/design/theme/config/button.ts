import { Theme, ComponentsOverrides, ComponentsProps } from '@mui/material/styles';
import { COLORS } from 'constants/design/colors';
import { THEME_MODE } from 'constants/design/theme/config/palette/types';

export const MuiButton: {
  defaultProps: ComponentsProps['MuiButton'];
  styleOverrides: ComponentsOverrides<Theme>['MuiButton'];
} = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: ({ theme: { spacing, palette, shape, typography }, ownerState }) => ({
      marginRight: spacing(1),
      textTransform: 'none',
      borderRadius: Number(shape.borderRadius) * 2,
      fontSize: typography.htmlFontSize,
      lineHeight: 1.25,
      fontWeight: typography.fontWeightRegular,
      ':disabled': {
        color: COLORS.lavenderGrey100,
        borderColor: palette.mode === THEME_MODE.LIGHT && COLORS.lavenderGrey100,
      },
      ...(palette.mode === THEME_MODE.LIGHT &&
        ownerState.color === 'warning' &&
        ownerState.variant !== 'contained' && {
          borderColor: palette.warning.dark,
          color: palette.warning.dark,
        }),
    }),
    sizeSmall: ({ theme: { spacing } }) => ({
      padding: spacing(0.5, 1.25),
    }),
    sizeMedium: ({ theme: { spacing } }) => ({
      padding: spacing(1, 2),
    }),
    sizeLarge: ({ theme: { spacing } }) => ({
      padding: spacing(1.5, 2),
    }),
    outlinedPrimary: ({ theme: { palette } }) => ({
      borderColor: palette.mode === THEME_MODE.LIGHT ? palette.primary.light : palette.secondary.light,
      color: palette.mode === THEME_MODE.LIGHT ? palette.primary.light : palette.secondary.light,
      ':disabled': {
        backgroundColor: 'transparent',
      },
    }),
    outlinedSecondary: ({ theme: { palette } }) => ({
      borderColor: palette.secondary.light,
      ':disabled': {
        backgroundColor: 'transparent',
      },
    }),
    containedPrimary: ({ theme: { palette } }) => ({
      borderColor: palette.primary.light,
      ':disabled': {
        backgroundColor: COLORS.lavenderGrey100,
        borderColor: palette.secondary.light,
        color: COLORS.darkBlue800,
      },
    }),
    containedSecondary: ({ theme: { palette } }) => ({
      borderColor: palette.secondary.light,
      ':disabled': {
        backgroundColor: COLORS.lavenderGrey100,
        color: COLORS.darkBlue800,
      },
    }),
    textPrimary: ({ theme: { palette } }) => ({
      ...(palette.mode === THEME_MODE.DARK && {
        color: COLORS.white,
      }),
    }),
  },
};
