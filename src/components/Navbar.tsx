import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { api } from '../services/api';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleStartJobSearch = async () => {
    try {
      setIsSearching(true);
      const response = await api.get<{ status: string; message: string }>('/tasks/enqueue_task?task_type=check_for_jobs&priority=0');
      
      if (response.status === 'success') {
        // Show success feedback (could use toast notification here)
        console.log('Job search started:', response.message);
        // Optionally navigate to jobs page to see updates
        navigate('/jobs');
      }
    } catch (error) {
      console.error('Failed to start job search:', error);
      // Could show error toast here
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
      isActive
        ? 'text-upwork-green border-upwork-green'
        : 'text-upwork-text border-transparent hover:text-upwork-green hover:border-upwork-light-green'
    }`;

  return (
    <nav className="bg-white border-b border-upwork-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/jobs' : '/login'} className="flex items-center gap-1">
            <svg
              className="w-8 h-8 text-upwork-green"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
            </svg>
            <span className="text-xl font-bold text-upwork-text">
              Upwork<span className="text-upwork-green">Auto</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/jobs" className={navLinkClass}>
                Find Work
              </NavLink>
              <NavLink to="/prompts" className={navLinkClass}>
                Prompts
              </NavLink>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleStartJobSearch}
                disabled={isSearching}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-upwork-green text-white rounded-full text-sm font-medium hover:bg-upwork-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Jobs
                  </>
                )}
              </button>
            )}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-upwork-light-green transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-upwork-green text-white flex items-center justify-center text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <svg className="w-4 h-4 text-upwork-muted hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-upwork-border z-20 py-2">
                      <div className="px-4 py-3 border-b border-upwork-border">
                        <p className="text-sm font-semibold text-upwork-text">{user?.name}</p>
                        <p className="text-xs text-upwork-muted mt-0.5">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-upwork-green hover:text-upwork-dark-green transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-upwork-green text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-upwork-dark-green transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-upwork-light-green transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-upwork-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-upwork-border py-3 space-y-1">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    handleStartJobSearch();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isSearching}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-upwork-text hover:bg-upwork-light-green disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {isSearching ? 'Searching Jobs...' : 'Search Jobs'}
                </button>
                <NavLink
                  to="/jobs"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-upwork-light-green text-upwork-green' : 'text-upwork-text hover:bg-upwork-light-green'
                    }`
                  }
                >
                  Find Work
                </NavLink>
                <NavLink
                  to="/prompts"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-upwork-light-green text-upwork-green' : 'text-upwork-text hover:bg-upwork-light-green'
                    }`
                  }
                >
                  Prompts
                </NavLink>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-upwork-text hover:bg-upwork-light-green"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-upwork-green hover:bg-upwork-light-green"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
