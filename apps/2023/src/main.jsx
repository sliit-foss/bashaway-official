import App from '@/app';
import '@/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const Root = () => {
  let basename = '/';

  const matchPreviewDeployment = window.location.pathname.startsWith('/2023');

  if (matchPreviewDeployment) {
    basename += '/2023';
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
