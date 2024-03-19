import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '@eco/redux';
import { Provider } from 'react-redux';
import { router } from './Router/routerConfiguration';
import MuiProviders from './MuiProviders';
import i18n from './app/locales/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
        <MuiProviders>
          <I18nextProvider i18n={i18n}>
            <RouterProvider router={router} />
          </I18nextProvider>
        </MuiProviders>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
