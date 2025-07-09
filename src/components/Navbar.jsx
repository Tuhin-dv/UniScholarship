import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { FaBars, FaGraduationCap, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logged out");
        // Optional: show toast
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

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
        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
      </li>

      {!user && (
        <li>
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <button onClick={handleLogout} className="text-left w-full px-2 py-1 text-red-600 hover:underline">
            Log Out
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-purple-700 font-extrabold text-2xl hover:text-purple-900 transition">
          <FaGraduationCap size={28} />
          <span>UniScholar</span>
        </Link>

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
          <ul className="flex flex-col gap-4 p-4">{navLinks}</ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
