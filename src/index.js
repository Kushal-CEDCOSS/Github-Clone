import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from '@shopify/polaris';
import { Provider } from 'react-redux';
import store from './Store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
