import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './ProductSkeleton';

export default function ProductList({
  products,
  addToCart,
  buyNow,
  toggleWishlist,
  wishlist,
  selectedCategory,
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Trigger loading skeleton whenever category or products filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // 400ms smooth skeleton transition

    return () => clearTimeout(timer);
  }, [selectedCategory, products]);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="w-48 h-8 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category header & product count */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {selectedCategory === 'All' ? 'Featured Collection' : `${selectedCategory} Collection`}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Handcrafted luxury and elite essentials curated for modern living.
          </p>
        </div>
        
        <span className="text-xs font-bold text-indigo-600 dark:text-amber-300 bg-indigo-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-indigo-100 dark:border-slate-800 shadow-sm shrink-0">
          {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm px-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-amber-400 flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
            🔍
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No products found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            We couldn't find any items matching your active filter or search query. Try switching categories or clearing search keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              buyNow={buyNow}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}