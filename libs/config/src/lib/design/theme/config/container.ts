import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material/styles';

export const MuiContainer: {
  defaultProps: ComponentsProps['MuiContainer'];
  styleOverrides: ComponentsOverrides<Theme>['MuiContainer'];
} = {
  defaultProps: {
    disableGutters: true,
  },
  styleOverrides: {
    root: ({ theme: { spacing } }) => ({
      paddingLeft: spacing(3),
    }),
  },
};
