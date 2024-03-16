import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '@eco/redux';
import { Provider } from 'react-redux';
import { router } from './Router/routerConfiguration';
import MuiProviders from './MuiProviders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
        <MuiProviders>
          <RouterProvider router={router} />
        </MuiProviders>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
