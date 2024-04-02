import { Theme, ComponentsOverrides, ComponentsProps } from '@mui/material/styles';

interface MuiDialogContentProps {
  defaultProps: ComponentsProps['MuiDialogContent'];
  styleOverrides: ComponentsOverrides<Theme>['MuiDialogContent'];
}

export const MuiDialogContent: MuiDialogContentProps = {
  defaultProps: {
    sx: {
      px: 6,
    },
  },
  styleOverrides: {
    root: {},
  },
};
