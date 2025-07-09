import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaPlusCircle, FaListUl, FaClipboardList, FaStar, FaArrowLeft } from 'react-icons/fa';

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Content area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="w-full navbar bg-base-100 lg:hidden px-4">
          <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <h2 className="ml-4 text-xl font-bold">Moderator Dashboard</h2>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side border-r border-gray-200">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content space-y-2">
          <h2 className="text-xl font-bold mb-4">Moderator Panel</h2>

          <li>
            <NavLink to="/dashboard/my-profile">
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-scholarships">
              <FaListUl /> Manage Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-scholarship">
              <FaPlusCircle /> Add Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-applied">
              <FaClipboardList /> All Applied Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-reviews">
              <FaStar /> All Reviews
            </NavLink>
          </li>
          <li className="pt-4 border-t border-gray-300">
            <NavLink to="/">
              <FaArrowLeft /> Back to Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
