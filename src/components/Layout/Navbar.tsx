import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Code, User, LogOut, Home, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, userData, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">CodeMaster</span>
          </Link>

          {currentUser && (
            <div className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors ${
                  location.pathname === '/dashboard' ? 'bg-white/20' : ''
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/courses" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors ${
                  location.pathname === '/courses' ? 'bg-white/20' : ''
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors ${
                    location.pathname === '/profile' ? 'bg-white/20' : ''
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{userData?.displayName || 'Profile'}</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-white/20 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;