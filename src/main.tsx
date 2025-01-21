import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Import Bugfender
import { Bugfender } from '@bugfender/sdk';

// Initialize. `appKey` is the only required option.
Bugfender.init({
  appKey: 'YOUR_APP_KEY_HERE',
  // apiURL: 'https://api.bugfender.com/', //Usually not required, should be used for on-premises or custom data centers
  // baseURL: 'https://dashboard.bugfender.com',  //Usually not required, should be used for on-premises or custom data centers
  // overrideConsoleMethods: true,
  // printToConsole: true,
  // registerErrorHandler: true,
  // version: '',
  // build: '',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
