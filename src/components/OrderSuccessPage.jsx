import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  
  // Fallback unique tracking ID if orderId is missing in URL
  const trackingNumber = orderId ? `NS-TRK-${orderId.toUpperCase()}` : 'NS-TRK-9842-8910';
  const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Header Banner */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="bg-emerald-50 dark:bg-emerald-950/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 animate-bounce shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full font-bold">
            Verified 256-Bit Secure Transaction
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-4 mb-2">
            Order Successfully Placed!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Your transaction has been authorized. We are currently preparing your curated luxury items for express dispatch.
          </p>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <div>
              <span className="text-slate-400 block uppercase">Tracking ID</span>
              <strong className="text-indigo-600 dark:text-amber-400 text-sm">{trackingNumber}</strong>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-slate-800" />
            <div>
              <span className="text-slate-400 block uppercase">Order Date</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">{orderDate}</strong>
            </div>
          </div>
        </div>

        {/* Live Delivery Timeline Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600 dark:text-amber-400" />
              Live Shipment Status
            </h3>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50">
              Processing in Hub
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-950 border border-indigo-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Order Confirmed</h4>
                <p className="text-[10px] text-slate-500">Verified & logged</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950/50 border border-gray-200/80 dark:border-slate-800 opacity-60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                02
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Courier Dispatch</h4>
                <p className="text-[10px] text-slate-500">Estimated tomorrow</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950/50 border border-gray-200/80 dark:border-slate-800 opacity-60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                03
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Delivered</h4>
                <p className="text-[10px] text-slate-500">Secure doorstep handover</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Invoice Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Transaction Invoice Summary
            </h3>
            <button
              onClick={handlePrintReceipt}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-amber-400 hover:underline"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
              <span>Payment Gateway</span>
              <strong className="text-slate-900 dark:text-white font-mono">Stripe Secure Elements (Visa •••• 8920)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
              <span>Shipping Speed</span>
              <strong className="text-slate-900 dark:text-white">Standard Express (Free)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
              <span>Fulfillment Status</span>
              <strong className="text-emerald-600 dark:text-emerald-400">Authorized & Verified</strong>
            </div>
            <div className="flex justify-between py-3 text-sm font-black text-slate-900 dark:text-white">
              <span>Total Paid Amount</span>
              <span className="text-indigo-600 dark:text-amber-400">$294.00</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to="/catalog"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-widest text-center shadow-lg transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="flex-1 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-widest text-center transition-all"
            >
              Return to Storefront
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}