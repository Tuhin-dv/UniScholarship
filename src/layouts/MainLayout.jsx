import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className='bg-orange-50'>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default MainLayout;
