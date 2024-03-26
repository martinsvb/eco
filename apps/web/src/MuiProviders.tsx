import { FC, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ms from 'ms';

interface MuiProvidersProps {
  children: ReactNode;
}

const MuiProviders: FC<MuiProvidersProps> = ({ children }) => {
  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');

  return (
    <ThemeProvider theme={createTheme({
      palette: {mode: isLightMode ? 'light' : 'dark'}
    })}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
        autoHideDuration={ms('4s')}
        preventDuplicate
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MuiProviders;
