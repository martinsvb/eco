import { Theme, ComponentsOverrides, ComponentsProps } from '@mui/material/styles';

interface MuiDialogProps {
  defaultProps: ComponentsProps['MuiDialog'];
  styleOverrides: ComponentsOverrides<Theme>['MuiDialog'];
}

export const MuiDialog: MuiDialogProps = {
  defaultProps: {
    PaperProps: {
      sx: {
        width: '100%',
        borderRadius: 4,
        margin: {
          xs: 0,
          sm: 2,
          md: 4,
        },
        minWidth: {
          xs: '100%',
          sm: 568,
          md: 630,
        },
      },
    },
  },
  styleOverrides: {
    root: {},
  },
};
