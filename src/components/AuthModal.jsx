import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, setCurrentUser }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Fetch existing registered users from localStorage (acting as dummy DB)
    const existingUsers = JSON.parse(localStorage.getItem('novastore_users')) || [];

    if (!isLoginTab) {
      // --- SIGNUP LOGIC ---
      if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }

      // Check if user already exists
      const userExists = existingUsers.find((u) => u.email === email);
      if (userExists) {
        setError('An account with this email already exists. Please log in.');
        return;
      }

      const newUser = { id: Date.now(), name, email, password };
      existingUsers.push(newUser);
      localStorage.setItem('novastore_users', JSON.stringify(existingUsers));

      // Automatically log them in
      localStorage.setItem('novastore_user', JSON.stringify(newUser));
      setCurrentUser(newUser);

      setSuccessMsg('Account created successfully! Welcome to NovaStore.');
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1200);

    } else {
      // --- LOGIN LOGIC ---
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      const foundUser = existingUsers.find((u) => u.email === email && u.password === password);
      
      // Default fallback account if no users registered yet
      if (!foundUser && email === 'admin@novastore.com' && password === 'admin123') {
        const adminUser = { id: 1, name: 'Aniket Verma', email: 'admin@novastore.com' };
        localStorage.setItem('novastore_user', JSON.stringify(adminUser));
        setCurrentUser(adminUser);
        successAndClose('Welcome back, Aniket!');
        return;
      }

      if (!foundUser) {
        setError('Invalid email or password. Please check your credentials.');
        return;
      }

      localStorage.setItem('novastore_user', JSON.stringify(foundUser));
      setCurrentUser(foundUser);
      successAndClose(`Welcome back, ${foundUser.name}!`);
    }
  };

  const successAndClose = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      onClose();
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden relative p-8">
        
        {/* Close Button */}
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            N
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {isLoginTab ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isLoginTab ? 'Sign in to access your orders and wishlist' : 'Join NovaStore for exclusive luxury privileges'}
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl mb-6">
          <button
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              isLoginTab
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              !isLoginTab
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Aniket Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 pl-11 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-amber-400 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 pl-11 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-amber-400 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 pl-11 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-amber-400 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/25 dark:shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{isLoginTab ? 'Sign In to NovaStore' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}