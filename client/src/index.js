import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomProvider } from 'rsuite';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomProvider theme='light'>
      <React.StrictMode>
        <React.Suspense fallback='Loading....'>
          <App />
        </React.Suspense>
      </React.StrictMode>
  </CustomProvider>
);


