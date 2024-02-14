import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { Toaster } from 'react-hot-toast';

import { HelmetProvider } from 'react-helmet-async';

import { router } from './router/router';
import { store } from './app/store';
import { toasterDefaultConfig } from './utils/toasterDefaultConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Toaster toastOptions={toasterDefaultConfig} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
