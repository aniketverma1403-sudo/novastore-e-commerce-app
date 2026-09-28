import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Next render mein fallback UI dikhane ke liye state update karo
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Aap yahan error reporting service (jaise Sentry) ko log bhej sakte hain
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-8 rounded-[2.5rem] shadow-xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              We encountered an unexpected error while rendering this section. Don't worry, your cart is safe!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}