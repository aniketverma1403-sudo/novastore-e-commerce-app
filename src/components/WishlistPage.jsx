import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Star } from 'lucide-react';

export default function WishlistPage({ wishlist, removeFromWishlist, moveToCart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 py-12">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/10 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Saved Favorites</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-indigo-200/80 text-sm max-w-xl font-light">
            Keep track of items you love. Move them to your shopping cart whenever you're ready to complete your purchase.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100">
            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 animate-pulse shadow-sm">
              <Heart className="w-10 h-10 fill-rose-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Your wishlist is empty</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6 font-medium">
              Explore our catalog and click the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-indigo-600/25 transition-all"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-[2rem] p-5 border border-gray-100 shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                {/* Image Container */}
                <div className="relative aspect-square rounded-[1.5rem] bg-gray-50 overflow-hidden mb-5 border border-gray-100">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200 shadow-sm pointer-events-none">
                    {item.category}
                  </span>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-3 rounded-full shadow-md bg-white/90 text-gray-500 hover:text-rose-500 border border-gray-200 hover:scale-110 transition-all active:scale-75"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Details */}
                <div className="space-y-3 relative z-10 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tight">${item.price.toFixed(2)}</span>
                  </div>

                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-bold text-slate-900 text-base tracking-wide line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-5 mt-4 border-t border-gray-100 relative z-10">
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all duration-300 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move to Cart</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}