import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Store, 
  Home, 
  Grid, 
  PhoneCall, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  setIsCartOpen,
  setIsAuthOpen,
  wishlistCount = 0,
  currentUser,
  setCurrentUser,
  setCart,
  setWishlist
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Robust Logout Handler: Clears user session but leaves user-specific cart & wishlist saved in storage
  const handleLogout = () => {
    localStorage.removeItem('novastore_user');

    if (setCurrentUser) setCurrentUser(null);
    if (setCart) setCart([]);
    if (setWishlist) setWishlist([]);

    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Catalog', path: '/catalog', icon: Grid },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <Store className="w-6 h-6 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent tracking-tight">
                NovaStore
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Next-Gen E-Commerce
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 group overflow-hidden ${
                  isActive 
                    ? 'bg-white text-indigo-600 shadow-md shadow-gray-200/50 scale-[1.02]' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-125 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`} />
                <span>{link.name}</span>
                {link.badge > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gray-50 hover:bg-indigo-50 border border-gray-200/80 hover:border-indigo-200 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl text-gray-700 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2.5 group active:scale-95 shadow-sm"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg shadow-indigo-500/50 animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-sm font-bold tracking-wide">Cart</span>
          </button>

          {/* Flipkart Style User Profile / Login Button */}
          {currentUser ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200/80 px-4 py-2 rounded-2xl hover:shadow-md transition-all"
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-black text-xs flex items-center justify-center shadow-md">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase leading-none">Hello,</span>
                  <span className="text-xs font-black text-gray-800 truncate max-w-[100px]">
                    {currentUser.name}
                  </span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link
                    to="/account"
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                  >
                    <User className="w-4 h-4 text-indigo-600" />
                    <span>My Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="relative hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-bold px-5 py-2.5 rounded-2xl text-sm shadow-xl shadow-indigo-500/25 active:scale-95 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Login / Signup</span>
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-100 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          {currentUser && (
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="block text-[10px] font-bold text-gray-400 uppercase">Logged in as</span>
                <span className="text-sm font-black text-gray-900">{currentUser.name}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                    location.pathname === link.path
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm'
                      : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              );
            })}
          </div>

          {currentUser ? (
            <div className="space-y-2">
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>My Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-rose-50 text-rose-600 font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              <User className="w-4 h-4" />
              <span>Login / Signup</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}