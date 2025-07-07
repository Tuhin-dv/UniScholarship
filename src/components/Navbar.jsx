import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships" onClick={() => setMenuOpen(false)}>
          All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" onClick={() => setMenuOpen(false)}>
          Login
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-purple-700">
          UniScholar
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {navLinks}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <ul className="flex flex-col gap-4 p-4">
            {navLinks}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
