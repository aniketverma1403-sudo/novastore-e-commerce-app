import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { products } from './data/products';
import Navbar from './components/Navbar';
import ExploreCategories from './components/ExploreCategories';
import ImageCarousel from './components/ImageCarousel';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { Sun, Moon, Loader2 } from 'lucide-react';

// Lazy Loaded Heavy Pages for Code Splitting & Performance Optimization
const CatalogPage = lazy(() => import('./components/CatalogPage'));
const WishlistPage = lazy(() => import('./components/WishlistPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./components/OrderSuccessPage'));
const CustomerDashboard = lazy(() => import('./components/CustomerDashboard'));

// Fallback Spinner for Suspense Boundary
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-indigo-600 dark:text-amber-400 animate-spin mb-4" />
    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Loading Experience...</span>
  </div>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Theme state persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('novastore_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('novastore_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 1. Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('novastore_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. User-Specific Cart State with LocalStorage
  const [cart, setCart] = useState(() => {
    const savedUser = localStorage.getItem('novastore_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const userCart = localStorage.getItem(`novastore_cart_${user.email}`);
      return userCart ? JSON.parse(userCart) : [];
    }
    const guestCart = localStorage.getItem('novastore_cart_guest');
    return guestCart ? JSON.parse(guestCart) : [];
  });

  // 3. User-Specific Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedUser = localStorage.getItem('novastore_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const userWishlist = localStorage.getItem(`novastore_wishlist_${user.email}`);
      return userWishlist ? JSON.parse(userWishlist) : [];
    }
    const guestWishlist = localStorage.getItem('novastore_wishlist_guest');
    return guestWishlist ? JSON.parse(guestWishlist) : [];
  });

  // Promo Coupon Engine State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sync Cart to User-Specific Key whenever it changes
  useEffect(() => {
    const key = currentUser ? `novastore_cart_${currentUser.email}` : 'novastore_cart_guest';
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, currentUser]);

  // Sync Wishlist to User-Specific Key whenever it changes
  useEffect(() => {
    const key = currentUser ? `novastore_wishlist_${currentUser.email}` : 'novastore_wishlist_guest';
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, currentUser]);

  // Function to handle login and load specific user cart/wishlist
  const handleUserLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('novastore_user', JSON.stringify(user));

    const userCart = localStorage.getItem(`novastore_cart_${user.email}`);
    const userWishlist = localStorage.getItem(`novastore_wishlist_${user.email}`);

    setCart(userCart ? JSON.parse(userCart) : []);
    setWishlist(userWishlist ? JSON.parse(userWishlist) : []);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const buyNow = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast('Item removed from cart');
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`Added "${product.name}" to wishlist!`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Protected Route Guard Component
  const ProtectedRoute = ({ children }) => {
    const isLogged = currentUser || localStorage.getItem('novastore_user');
    if (!isLogged) {
      setIsAuthOpen(true);
      showToast('Please log in or register to access this page.');
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-gray-50/50 text-slate-900'}`}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 dark:border-amber-300 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-slate-950 animate-ping" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setCart={setCart}
        setWishlist={setWishlist}
      />

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <>
                {/* Premium Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 text-slate-900 dark:text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-sm border-b border-gray-100 dark:border-slate-800">
                  <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Main Headline & CTA */}
                    <div className="lg:col-span-7 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-slate-900 text-indigo-700 dark:text-amber-300 text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider mb-6 border border-indigo-100 dark:border-slate-800 shadow-sm">
                        <span className="flex text-amber-500">★★★★★</span>
                        <span className="text-slate-800 dark:text-slate-200">Trusted by 50,000+ Modern Shoppers</span>
                      </div>

                      <h1 className="text-3xl sm:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 dark:from-white dark:via-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent leading-[1.1]">
                        Elevate Your Lifestyle With <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-amber-300 dark:to-amber-500 bg-clip-text text-transparent">NovaStore</span>
                      </h1>

                      <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
                        Discover curated flagship luxury across fashion, elite electronics, smart home living, and more with an absolute quality guarantee.
                      </p>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <button 
                          onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/25 dark:shadow-amber-400/20 transition-all active:scale-95"
                        >
                          Explore Collection
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Premium Trust & Value Highlights */}
                    <div className="lg:col-span-5">
                      <div className="bg-white/80 dark:bg-slate-900/80 border border-gray-200/80 dark:border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] shadow-xl dark:shadow-none space-y-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-violet-500/5 pointer-events-none" />

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-amber-400 font-black text-lg shrink-0">
                            01
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-wide">Mastercrafted Quality Guarantee</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Every item undergoes rigorous 7-point inspection before dispatch.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-slate-800 border border-violet-100 dark:border-slate-700 flex items-center justify-center text-violet-600 dark:text-amber-400 font-black text-lg shrink-0">
                            02
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-wide">Complimentary VIP Concierge</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">24/7 priority customer support for all registered members.</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-lg shrink-0">
                            03
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-wide">Zero-Risk 7-Day Returns</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Instant refunds with free door-to-door courier pickups.</p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                <ExploreCategories 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory} 
                />
                <ImageCarousel />
                <ProductList
                  products={filteredProducts}
                  addToCart={addToCart}
                  buyNow={buyNow}
                  toggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                  selectedCategory={selectedCategory}
                />
              </>
            } />

            {/* Lazy Loaded Routes */}
            <Route path="/product/:id" element={
              <ProductDetailPage 
                products={products} 
                addToCart={addToCart} 
                buyNow={buyNow} 
                toggleWishlist={toggleWishlist} 
                wishlist={wishlist} 
              />
            } />

            <Route path="/catalog" element={
              <CatalogPage 
                products={products} 
                addToCart={addToCart} 
                buyNow={buyNow} 
                toggleWishlist={toggleWishlist} 
                wishlist={wishlist} 
              />
            } />

            <Route path="/wishlist" element={
              <WishlistPage 
                wishlist={wishlist} 
                removeFromWishlist={removeFromWishlist} 
                moveToCart={moveToCart} 
              />
            } />

            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Checkout Route */}
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage 
                  cart={cart} 
                  clearCart={() => { setCart([]); setAppliedCoupon(null); }} 
                  appliedCoupon={appliedCoupon} 
                  setAppliedCoupon={setAppliedCoupon} 
                />
              </ProtectedRoute>
            } />

            {/* Order Success & Tracking Route */}
            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />

            {/* Protected Customer Dashboard Route */}
            <Route path="/account" element={
              <ProtectedRoute>
                <CustomerDashboard currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        setCurrentUser={handleUserLogin}
      />

      <Footer />

      {/* Floating Sticky Dark/Light Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed right-5 bottom-5 z-50 p-4 rounded-full bg-slate-900 dark:bg-amber-400 text-amber-400 dark:text-slate-950 shadow-2xl hover:scale-110 transition-all duration-300 border border-slate-800 dark:border-amber-300 flex items-center justify-center group"
        title="Toggle Theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 transition-transform group-hover:rotate-90" />
        ) : (
          <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
        )}
      </button>
    </div>
  );
}