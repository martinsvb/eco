import { Theme, ComponentsOverrides } from '@mui/material/styles';

export const MuiGrid: { styleOverrides: ComponentsOverrides<Theme>['MuiGrid'] } = {
  styleOverrides: {
    root: ({ theme: { spacing } }) => ({
      marginBottom: spacing(1),
    }),
  },
};
