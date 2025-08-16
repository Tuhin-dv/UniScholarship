import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import AllScholarships from '../pages/AllScholarships/AllScholarships';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AuthLayout from '../layouts/AuthLayout';
import PrivateRoute from '../components/PrivateRoute';
import ScholarshipDetails from '../pages/ScholarshipDetails/ScholarshipDetails';
import DashboardLayout from '../layouts/DashboardLayout';
import AddScholarship from '../pages/Dashboard/Moderator/AddScholarship';
import AllAppliedScholarships from '../pages/Dashboard/Moderator/AllAppliedScholarships';
import ManageScholarships from '../pages/Dashboard/Moderator/ManageScholarships';
import MyProfile from '../pages/Dashboard/Moderator/MyProfile';
import AllReviews from '../pages/Dashboard/Moderator/AllReviews';
import ScholarshipApply from '../pages/Dashboard/Moderator/User/ScholarshipApply';
import MyApplications from '../pages/Dashboard/Moderator/User/MyApplications';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import Payment from '../pages/Dashboard/Payment/Payment';
import MyReviews from '../pages/Dashboard/Moderator/User/MyReviews';
import ManageUsers from '../pages/Dashboard/Moderator/ManageUsers';
import AdminOrModeratorRoute from '../components/routes/AdminOrModeratorRoute';
import ModeratorRoute from '../components/routes/ModeratorRoute';
import ForbiddenAccess from '../components/ForbiddenAccess';
import NotFound from '../pages/NotFound/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { path: '/', element: <Home /> },
      { path: 'all-scholarships', Component: AllScholarships },
      {
        path: '/scholarship/:id',
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: '/login', Component: Login },
      { path: '/register', Component: Register },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },

      // ✅ Admin or Moderator Routes (Secured)
      {
        path: 'add-scholarship',
        element: (
          <PrivateRoute>
            <AdminOrModeratorRoute>
              <AddScholarship />
            </AdminOrModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-applied',
        element: (
          <PrivateRoute>
            <AdminOrModeratorRoute>
              <AllAppliedScholarships />
            </AdminOrModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-scholarships',
        element: (
          <PrivateRoute>
            <AdminOrModeratorRoute>
              <ManageScholarships />
            </AdminOrModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminOrModeratorRoute>
              <ManageUsers />
            </AdminOrModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-reviews',
        element: (
          <PrivateRoute>
            <AdminOrModeratorRoute>
              <AllReviews />
            </AdminOrModeratorRoute>
          </PrivateRoute>
        ),
      },

      // ✅ Normal User Routes (Private Only)
      {
        path: 'apply/:id',
        element: (
          <PrivateRoute>
            <ScholarshipApply />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-application',
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment/:id',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      // ❌ Forbidden Page (No wrapper needed)
      {
        path: 'forbidden',
        Component: ForbiddenAccess,
      },
    ],
    
  },
  {
    path: '*',
    Component: NotFound,
  }
]);
