import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { generateRouterBasePath } from '@app/utils';
import './styles/index.css';
import { default as App } from './app';

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename={generateRouterBasePath('2023')}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
