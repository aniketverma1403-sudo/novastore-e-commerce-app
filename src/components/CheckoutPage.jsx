import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MapPin, 
  Lock, 
  AlertCircle,
  Tag,
  Check
} from 'lucide-react';

export default function CheckoutPage({ cart, clearCart, appliedCoupon, setAppliedCoupon }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // standard vs express
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: ''
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') discountAmount = (subtotal * appliedCoupon.value) / 100;
    else if (appliedCoupon.type === 'flat') discountAmount = appliedCoupon.value;
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingFee = deliveryMethod === 'express' ? 25 : (discountedSubtotal > 50 || discountedSubtotal === 0 ? 0 : 15);
  const total = discountedSubtotal + shippingFee;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError('Enter promo code.');
      return;
    }

    if (code === 'SAVE15') {
      setAppliedCoupon({ code: 'SAVE15', type: 'percent', value: 15 });
      setCouponSuccess('15% off applied!');
      setCouponInput('');
    } else if (code === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', type: 'flat', value: 10 });
      setCouponSuccess('$10 flat discount applied!');
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Try SAVE15.');
    }
  };

  const validateShipping = () => {
    let newErrors = {};
    if (!shippingData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!shippingData.email.trim() || !shippingData.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!shippingData.address.trim()) newErrors.address = 'Street address is required.';
    if (!shippingData.city.trim()) newErrors.city = 'City is required.';
    if (!shippingData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    let newErrors = {};
    if (!paymentData.cardNumber.trim() || paymentData.cardNumber.length < 15) newErrors.cardNumber = 'Valid card number required.';
    if (!paymentData.expiry.trim()) newErrors.expiry = 'MM/YY required.';
    if (!paymentData.cvc.trim() || paymentData.cvc.length < 3) newErrors.cvc = 'Valid CVC required.';
    if (!paymentData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateShipping()) return;
    setErrors({});
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = Math.floor(100000 + Math.random() * 900000);
      if (typeof clearCart === 'function') clearCart();
      navigate(`/order-success/${randomOrderId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => step === 1 ? navigate(-1) : handlePrevStep()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white bg-white dark:bg-slate-900 px-5 py-3 rounded-full border border-gray-200 dark:border-slate-800 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Back to Bag' : 'Previous Step'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-amber-400 bg-indigo-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-indigo-100 dark:border-slate-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Encrypted Gateway (Step {step} of 3)</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className={`p-4 rounded-2xl border transition-all ${step >= 1 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-slate-400'}`}>
            <span className="text-[10px] font-mono uppercase tracking-widest block opacity-80">Step 01</span>
            <span className="text-xs sm:text-sm font-black">Shipping Address</span>
          </div>
          <div className={`p-4 rounded-2xl border transition-all ${step >= 2 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-slate-400'}`}>
            <span className="text-[10px] font-mono uppercase tracking-widest block opacity-80">Step 02</span>
            <span className="text-xs sm:text-sm font-black">Delivery Method</span>
          </div>
          <div className={`p-4 rounded-2xl border transition-all ${step >= 3 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-slate-400'}`}>
            <span className="text-[10px] font-mono uppercase tracking-widest block opacity-80">Step 03</span>
            <span className="text-xs sm:text-sm font-black">Secure Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Box */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl">
            
            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-amber-400" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Shipping Destination</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Aniket Verma"
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.fullName ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                    />
                    {errors.fullName && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      placeholder="aniket@example.com"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.email ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                    />
                    {errors.email && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Street Address *</label>
                    <input
                      type="text"
                      placeholder="123 Luxury Lane"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.address ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                    />
                    {errors.address && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">City *</label>
                      <input
                        type="text"
                        placeholder="San Francisco"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.city ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                      />
                      {errors.city && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Postal Code *</label>
                      <input
                        type="text"
                        placeholder="94107"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.postalCode ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                      />
                      {errors.postalCode && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.postalCode}</p>}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all mt-6"
                >
                  <span>Proceed to Delivery Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: DELIVERY METHOD */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <Truck className="w-5 h-5 text-indigo-600 dark:text-amber-400" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Select Delivery Speed</h2>
                </div>

                <div className="space-y-4">
                  <label 
                    onClick={() => setDeliveryMethod('standard')}
                    className={`flex items-center justify-between p-5 rounded-3xl border-2 cursor-pointer transition-all ${deliveryMethod === 'standard' ? 'border-indigo-600 dark:border-amber-400 bg-indigo-50/50 dark:bg-slate-950' : 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={deliveryMethod === 'standard'} 
                        onChange={() => setDeliveryMethod('standard')} 
                        className="accent-indigo-600 dark:accent-amber-400 w-4 h-4"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Standard Express Delivery</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Delivered within 3 to 5 business days.</p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">FREE</span>
                  </label>

                  <label 
                    onClick={() => setDeliveryMethod('express')}
                    className={`flex items-center justify-between p-5 rounded-3xl border-2 cursor-pointer transition-all ${deliveryMethod === 'express' ? 'border-indigo-600 dark:border-amber-400 bg-indigo-50/50 dark:bg-slate-950' : 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={deliveryMethod === 'express'} 
                        onChange={() => setDeliveryMethod('express')} 
                        className="accent-indigo-600 dark:accent-amber-400 w-4 h-4"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Priority VIP Air Courier</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Next-day guaranteed morning delivery.</p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-indigo-600 dark:text-amber-400">$25.00</span>
                  </label>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all mt-6"
                >
                  <span>Proceed to Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 3: SECURE PAYMENT GATEWAY */}
            {step === 3 && (
              <form onSubmit={handleCompleteOrder} className="space-y-6 animate-in fade-in duration-300" noValidate>
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <CreditCard className="w-5 h-5 text-indigo-600 dark:text-amber-400" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Stripe / Razorpay Elements</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="Aniket Verma"
                      value={paymentData.nameOnCard}
                      onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
                      className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.nameOnCard ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                    />
                    {errors.nameOnCard && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.nameOnCard}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Card Number *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8920"
                        maxLength={19}
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.cardNumber ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Expiry Date *</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                        className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.expiry ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                      />
                      {errors.expiry && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.expiry}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">CVC / CVV *</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          placeholder="382"
                          maxLength={4}
                          value={paymentData.cvc}
                          onChange={(e) => setPaymentData({ ...paymentData, cvc: e.target.value })}
                          className={`w-full bg-gray-50 dark:bg-slate-950 border rounded-2xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 ${errors.cvc ? 'border-rose-500 ring-rose-500' : 'border-gray-200 dark:border-slate-800 focus:ring-indigo-500'}`}
                        />
                      </div>
                      {errors.cvc && <p className="text-rose-500 text-xs mt-1 font-semibold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.cvc}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-black py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all mt-6 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2 animate-pulse">Processing 256-Bit SSL Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize & Pay ${total.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Order Summary Sidebar with Promo Engine */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="font-black text-slate-900 dark:text-white text-base border-b border-gray-100 dark:border-slate-800 pb-4">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-slate-800 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-black text-xs text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Promo Code Box in Checkout */}
            <div className="bg-gray-50 dark:bg-slate-950 p-3 rounded-2xl border border-gray-200 dark:border-slate-800">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <Check className="w-4 h-4" />
                    <span>"{appliedCoupon.code}" Active</span>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="text-xs text-rose-500 font-bold hover:underline">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo (e.g. SAVE15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-medium uppercase text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <button type="submit" className="bg-slate-900 dark:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs">Apply</button>
                </form>
              )}
              {couponError && <p className="text-rose-500 text-[11px] mt-1 font-semibold">{couponError}</p>}
              {couponSuccess && <p className="text-emerald-600 dark:text-emerald-400 text-[11px] mt-1 font-semibold">{couponSuccess}</p>}
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-2">
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
                <span>Shipping ({deliveryMethod})</span>
                <span className="font-bold text-slate-900 dark:text-white">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-3 border-t border-gray-200 dark:border-slate-800">
                <span>Total Amount</span>
                <span className="text-indigo-600 dark:text-amber-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold bg-gray-50 dark:bg-slate-950 p-3 rounded-2xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Guaranteed bank-grade encryption via Stripe & Razorpay elements.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}