import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './routes/Route';
import AuthProvider from './context/AuthContext/AuthProvider';
import { Toaster } from 'react-hot-toast'; // ✅ import toast

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster /> 
    </AuthProvider>
  </StrictMode>
);
