import { Theme, ComponentsOverrides, ComponentsProps } from '@mui/material/styles';
import { COLORS } from 'constants/design/colors';

interface MuiDialogTitleProps {
  defaultProps: ComponentsProps['MuiDialogTitle'];
  styleOverrides: ComponentsOverrides<Theme>['MuiDialogTitle'];
}

export const MuiDialogTitle: MuiDialogTitleProps = {
  defaultProps: {
    sx: {
      background: COLORS.darkBlue900,
      color: COLORS.darkBlue50,
      fontWeight: 600,
      fontSize: 24,
      lineHeight: '28px',
      height: 64,
      py: 2.25,
      px: 6,
    },
  },
  styleOverrides: {
    root: {},
  },
};
