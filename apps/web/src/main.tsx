import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '@eco/redux';
import { Provider } from 'react-redux';
import { router } from './Router/routerConfiguration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ms from 'ms';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
        <ThemeProvider theme={createTheme()}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            maxSnack={3}
            autoHideDuration={ms('5s')}
            preventDuplicate
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <RouterProvider router={router} />
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
