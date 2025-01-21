import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Map, Compass, Info, Phone, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg backdrop-blur-sm bg-white/90 px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/yU6jInv.jpg" 
                alt="OrbitWayfarer Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">OrbitWayfarer</span>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/destinations" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Map className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <span>Destinations</span>
              </Link>
              <Link 
                to="/tours" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Compass className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <span>Tours</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Info className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Phone className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <User className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors group"
                  >
                    <LogOut className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg group"
                >
                  <User className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/destinations" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Map className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  <span>Destinations</span>
                </Link>
                <Link 
                  to="/tours" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Compass className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  <span>Tours</span>
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  <span>About</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                  <span>Contact</span>
                </Link>
                {currentUser ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50 group w-full"
                    >
                      <LogOut className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center shadow-md hover:shadow-lg group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;