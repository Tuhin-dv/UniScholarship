import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import AllScholarships from '../pages/AllScholarships/AllScholarships';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AuthLayout from '../layouts/AuthLayout';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/all-scholarships',
        Component: AllScholarships
      },

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  }
]);
