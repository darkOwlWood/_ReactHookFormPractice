import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Theme from './Utils/Theme.ts';
import '@fontsource-variable/plus-jakarta-sans';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </LocalizationProvider>
    </React.StrictMode>,
  );
