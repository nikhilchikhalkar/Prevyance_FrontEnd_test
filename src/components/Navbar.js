import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the FaBars icon

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu} // Toggle the mobile menu
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-white text-xl font-bold">
              <Link
                to="/"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                PreVyance Test
              </Link>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              {/* Profile Link */}
              <Link
                to="/profile"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>

              {/* Conditionally Render Admin Links */}
              {isAdmin ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/addorder"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Add Order
                  </Link>
                  <Link
                    to="/orderlist"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Order List
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/addorder"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Add Order
                  </Link>
                  <Link
                    to="/orderlist"
                    className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Order List
                  </Link>
                </>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`} // Apply smooth transition
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/profile"
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Profile
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/addorder"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Order
              </Link>
              <Link
                to="/orderlist"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Order List
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/addorder"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Order
              </Link>
              <Link
                to="/orderlist"
                className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              >
                Order List
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
