import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';

export default function ProductCard({ product, addToCart, buyNow, toggleWishlist, isWishlisted }) {
  return (
    <div className="group relative bg-white rounded-[2rem] p-5 border border-gray-100 shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5">
      
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-square rounded-[1.5rem] bg-gray-50 overflow-hidden mb-5 border border-gray-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-200 shadow-sm pointer-events-none">
          {product.category}
        </span>

        {/* Animated Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-3 rounded-full shadow-md backdrop-blur-xl transition-all duration-300 active:scale-75 group/btn ${
            isWishlisted 
              ? 'bg-rose-500 text-white scale-110' 
              : 'bg-white/90 text-gray-500 hover:text-rose-500 border border-gray-200 hover:scale-110'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12 ${isWishlisted ? 'fill-white scale-110' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="space-y-3 relative z-10 px-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">${product.price.toFixed(2)}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-slate-900 text-base tracking-wide line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      {/* Action Buttons Section with Padding & Spacing */}
      <div className="space-y-2.5 pt-5 mt-4 border-t border-gray-100 relative z-10">
        <div className="grid grid-cols-2 gap-2">
          
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-bold py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 border border-gray-200/80 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          {/* Buy Now */}
          <button
            onClick={() => buyNow(product)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all duration-300 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>

        {/* Wishlist Status Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-gray-50 hover:bg-gray-100 text-slate-600 border border-gray-200/60'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
          <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>

    </div>
  );
}