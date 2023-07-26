import App from '@/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';

const Root = () => {
  let basename = '/';

  const matchPreviewDeployment = window.location.pathname.startsWith('/2022');

  if (matchPreviewDeployment) {
    basename += '/2022';
  }

  return (
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);