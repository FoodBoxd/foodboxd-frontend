import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importe o RouterProvider em vez do App
import { RouterProvider } from 'react-router-dom';

// 2. Importe o seu arquivo de rotas
import router from './routes';

import './index.css'; // ou App.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Use o RouterProvider para carregar seu roteador */}
    <RouterProvider router={router} />
  </React.StrictMode>
);