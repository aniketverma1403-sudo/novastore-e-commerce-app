import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Sparkles,
  Truck
} from 'lucide-react';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock User Profile Data
  const [userProfile, setUserProfile] = useState({
    name: 'Aniket Verma',
    email: 'aniket@example.com',
    phone: '+91 98765 43210',
    tier: 'VIP Platinum Member'
  });

  // Mock Past Orders
  const [orders, setOrders] = useState([
    {
      id: 'NS-9842',
      date: 'Sep 25, 2026',
      total: 294.00,
      status: 'Out for Delivery',
      items: [
        { name: 'Flagship Wireless Headphones', qty: 1, price: 249.00 },
        { name: 'Minimalist Alloy Stand', qty: 1, price: 45.00 }
      ]
    },
    {
      id: 'NS-7612',
      date: 'Aug 14, 2026',
      total: 120.50,
      status: 'Delivered',
      items: [
        { name: 'Designer Organic Cotton Tee', qty: 2, price: 60.25 }
      ]
    }
  ]);

  // Mock Saved Addresses
  const [addresses, setAddresses] = useState([
    { id: 1, title: 'Home', address: '123 Luxury Lane, Sarkaghat, Himachal Pradesh, 175024' },
    { id: 2, title: 'Office / Workplace', address: 'Tech Park, Sector 5, Chandigarh, 160018' }
  ]);

  const [newAddress, setNewAddress] = useState('');
  const [addressTitle, setAddressTitle] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (newAddress.trim() && addressTitle.trim()) {
      setAddresses([...addresses, { id: Date.now(), title: addressTitle, address: newAddress }]);
      setNewAddress('');
      setAddressTitle('');
      setShowAddAddr(false);
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 font-black text-2xl flex items-center justify-center shadow-xl">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-amber-300 border border-white/10 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{userProfile.tier}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{userProfile.name}</h1>
              <p className="text-xs text-indigo-200/80 font-mono mt-0.5">{userProfile.email} • {userProfile.phone}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="relative z-10 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest border border-white/20 transition-all backdrop-blur-md"
          >
            Back to Storefront
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Orders & Tracking
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'addresses' ? 'bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Addresses
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-amber-400 w-fit rounded-2xl">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Total Orders Placed</h3>
              <p className="text-2xl font-black text-indigo-600 dark:text-amber-400">2 Active / Past</p>
              <p className="text-xs text-slate-500">All orders fully insured and tracked.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-3">
              <div className="p-3 bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 w-fit rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Account Security</h3>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">256-Bit SSL</p>
              <p className="text-xs text-slate-500">Two-factor authentication enabled.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 w-fit rounded-2xl">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Saved Addresses</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{addresses.length} Locations</p>
              <p className="text-xs text-slate-500">Ready for instant express checkout.</p>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & LIVE TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Past Order History & Live Tracking</h2>
            
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-600 dark:text-amber-400 font-bold">Order #{ord.id}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">Placed on {ord.date}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-amber-300 px-3.5 py-1.5 rounded-full border border-indigo-100 dark:border-slate-700">
                      {ord.status}
                    </span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">${ord.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{item.name} (x{item.qty})</span>
                      <span className="font-bold text-slate-900 dark:text-white">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-500 flex items-center gap-1"><Truck className="w-4 h-4 text-emerald-500" /> Express Courier Dispatch</span>
                  <Link to={`/order-success/${ord.id}`} className="text-indigo-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1">
                    <span>View Tracking Receipt</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Saved Shipping Addresses</h2>
              <button
                onClick={() => setShowAddAddr(!showAddAddr)}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            {showAddAddr && (
              <form onSubmit={handleAddAddress} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">New Shipping Location</h3>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">Location Title (e.g. Home / Office)</label>
                  <input
                    type="text"
                    placeholder="Home"
                    value={addressTitle}
                    onChange={(e) => setAddressTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">Full Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Luxury Lane, City, State, Pincode"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-indigo-600 text-white dark:bg-amber-400 dark:text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs">Save Address</button>
                  <button type="button" onClick={() => setShowAddAddr(false)} className="bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-5 py-2.5 rounded-xl text-xs">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-amber-400 rounded-2xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{addr.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{addr.address}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteAddress(addr.id)} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}