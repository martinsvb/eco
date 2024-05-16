import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import i18n from '@eco/locales';
import { store } from '@eco/redux';
import { router } from './Router/routerConfiguration';
import MuiProviders from './MuiProviders';

import './app/components/editor/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <MuiProviders>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </MuiProviders>
    </GoogleOAuthProvider>
  </Provider>
);
