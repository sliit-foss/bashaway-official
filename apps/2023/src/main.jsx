import App from '@/app';
import '@/styles/index.css';
import { generateRouterBasePath } from '@app/utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

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
