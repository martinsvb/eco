import { FC, ReactNode, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ms from 'ms';
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocalStorageItems, THEME_MODE } from '@eco/config';

interface MuiProvidersProps {
  children: ReactNode;
}

const MuiProviders: FC<MuiProvidersProps> = ({ children }) => {
  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');
  const newMode = localStorage.getItem(LocalStorageItems.Mode) as THEME_MODE;

  const [mode, setMode] = useState(newMode || (isLightMode ? THEME_MODE.LIGHT : THEME_MODE.DARK));

  useEffect(
    () => {
      onstorage = () => {
        const newMode = localStorage.getItem(LocalStorageItems.Mode);
        if (newMode && Object.values(THEME_MODE).includes(newMode as THEME_MODE)) {
          setMode(newMode as THEME_MODE);
        }
        else {
          setMode(isLightMode ? THEME_MODE.LIGHT : THEME_MODE.DARK);
        }
      }
    },
    [isLightMode]
  );

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode
      }
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
