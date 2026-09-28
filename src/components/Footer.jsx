import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Send, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Headphones, 
  Heart, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      console.log('--- Newsletter Subscription ---');
      console.log('Subscriber Email:', email);
      console.log('Timestamp:', new Date().toISOString());
      console.log('-------------------------------');
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const trustBadges = [
    { icon: Truck, title: 'Express Worldwide Shipping', desc: 'Free delivery on orders over $50' },
    { icon: ShieldCheck, title: '100% Secure Checkout', desc: 'Protected by 256-bit encryption' },
    { icon: RefreshCw, title: '30-Day Easy Returns', desc: 'Hassle-free refund policy' },
    { icon: Headphones, title: '24/7 Dedicated Support', desc: 'Expert customer care anytime' },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-12 border-t border-slate-900 relative overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trust Pillars Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-slate-800/80">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm hover:border-indigo-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{badge.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Store className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                NovaStore
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Crafting next-gen e-commerce experiences. Bringing you curated luxury across fashion, elite electronics, smart home living, and more.
            </p>

            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold bg-indigo-950/50 border border-indigo-900/50 px-3.5 py-2 rounded-xl w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Rated 4.9/5 by Over 50,000 Global Clients</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home Store</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-slate-400 hover:text-white transition-colors">Full Catalog</Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-slate-400 hover:text-white transition-colors">My Wishlist</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">Collections</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/catalog" className="text-slate-400 hover:text-white transition-colors">Electronics & Mobile</Link></li>
              <li><Link to="/catalog" className="text-slate-400 hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/catalog" className="text-slate-400 hover:text-white transition-colors">Home Appliances</Link></li>
              <li><Link to="/catalog" className="text-slate-400 hover:text-white transition-colors">Books & Media</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription Col */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200">Exclusive Insider Club</h3>
            <p className="text-slate-400 text-sm">
              Subscribe to receive private sales, new product drops, and 15% off your first order.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 p-4 rounded-2xl text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Welcome to the club! Check your inbox for your 15% voucher code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95"
                    title="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Payment Methods Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            © 2026 NovaStore Inc. Designed with React & Tailwind CSS. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Aniket Verma.
          </p>

          {/* Secure Payment Badges simulation */}
          <div className="flex items-center gap-3 font-semibold tracking-wider text-[10px] text-slate-400 uppercase">
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">VISA</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">Mastercard</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">Apple Pay</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">PayPal</span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">Stripe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}