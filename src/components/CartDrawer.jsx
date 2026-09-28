import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check, AlertCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, setIsOpen, cart, updateQuantity, removeFromCart, appliedCoupon, setAppliedCoupon }) {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate discount based on applied coupon
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shipping = discountedSubtotal > 50 || discountedSubtotal === 0 ? 0 : 15;
  const total = discountedSubtotal + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a promo code.');
      return;
    }

    if (code === 'SAVE15') {
      setAppliedCoupon({ code: 'SAVE15', type: 'percent', value: 15 });
      setCouponSuccess('Success! 15% discount applied.');
      setCouponInput('');
    } else if (code === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', type: 'flat', value: 10 });
      setCouponSuccess('Success! $10 flat discount applied.');
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try SAVE15 or WELCOME10.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-gray-100 dark:border-slate-800 transition-colors">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 p-2.5 rounded-2xl shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Shopping Bag</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{cart.reduce((s, i) => s + i.quantity, 0)} items selected</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-indigo-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-amber-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Your bag is empty</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6 font-medium">
                  Discover our exclusive catalog and add your favorite luxury items here.
                </p>
                <Link
                  to="/catalog"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs shadow-lg shadow-indigo-600/25"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-gray-50/80 dark:bg-slate-950/60 border border-gray-100 dark:border-slate-800 items-center group">
                  <Link 
                    to={`/product/${item.id}`} 
                    onClick={() => setIsOpen(false)}
                    className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden border border-gray-200/80 dark:border-slate-800 shrink-0 block"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.id}`} 
                      onClick={() => setIsOpen(false)}
                      className="block truncate font-bold text-slate-900 dark:text-white text-sm hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {item.name}
                    </Link>

                    <p className="text-xs font-black text-indigo-600 dark:text-amber-400 mt-0.5">${item.price.toFixed(2)}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-4">
              
              {/* Promo Code Input Box */}
              <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-gray-200 dark:border-slate-800">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      <Check className="w-4 h-4" />
                      <span>Code "{appliedCoupon.code}" Applied</span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-xs text-rose-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. SAVE15)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-medium uppercase text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-900 dark:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-slate-800 transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && <p className="text-rose-500 text-[11px] mt-1.5 flex items-center gap-1 font-semibold"><AlertCircle className="w-3 h-3" /> {couponError}</p>}
                {couponSuccess && <p className="text-emerald-600 dark:text-emerald-400 text-[11px] mt-1.5 font-semibold">{couponSuccess}</p>}
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-slate-900 dark:text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-gray-200 dark:border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-indigo-600 dark:text-amber-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/25 dark:shadow-amber-400/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}