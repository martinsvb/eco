import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { csCZ, enUS } from '@mui/material/locale';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en';
import 'dayjs/locale/cs';
import 'dayjs/locale/sk';
import ms from 'ms';
import { SnackbarProvider } from 'notistack';
import { LocalStorageItems } from '@eco/config';
import { Languages, getLanguageCode } from '@eco/locales';
import { THEME_MODE } from './config';

interface MuiProvidersProps {
  children: ReactNode;
}

const MuiProviders: FC<MuiProvidersProps> = ({ children }) => {

  const { i18n: { language } } = useTranslation();

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

  const muiLocales = useMemo(
    () => {
      let locales = enUS;
      if (language.includes(Languages.cs)) {
        locales = csCZ;
      }

      return locales;
    },
    [language]
  );

  return (
    <ThemeProvider
      theme={responsiveFontSizes(createTheme(
        {
          palette: {
            mode
          }
        },
        muiLocales
      ))}
    >
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
        autoHideDuration={ms('4s')}
        preventDuplicate
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={getLanguageCode(language)}
        >
          <CssBaseline enableColorScheme />
          {children}
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default MuiProviders;
