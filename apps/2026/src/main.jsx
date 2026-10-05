import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { generateRouterBasePath } from '@app/utils';
import { default as App } from './app';
import { CURRENT_YEAR } from './constants/dates';
import './styles/index.css';

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename={generateRouterBasePath(CURRENT_YEAR)}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
