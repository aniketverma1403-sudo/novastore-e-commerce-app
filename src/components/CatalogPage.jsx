import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, ShoppingBag, Star, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export default function CatalogPage({ products, addToCart, buyNow, toggleWishlist, wishlist }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPrice;
        const matchesRating = (product.rating || 4.5) >= minRating;
        return matchesCategory && matchesSearch && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
        return 0; // 'featured'
      });
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice, minRating]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setMaxPrice(1000);
    setMinRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8 sm:mb-12 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block shadow-md">
            Flagship Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">Explore All Collections</h1>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
            Browse through our curated inventory of high-performance electronics, luxury wear, and lifestyle essentials engineered for perfection.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            
            {/* Header & Reset Button */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-sm">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-amber-400" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/30 text-slate-500 hover:text-rose-600 dark:text-slate-400 text-xs font-bold transition-all border border-gray-200/60 dark:border-slate-700"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Mobile Category Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="w-full flex items-center justify-between bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 p-3 rounded-2xl text-xs font-bold text-indigo-600 dark:text-amber-400"
              >
                <span>Categories ({selectedCategory})</span>
                {isMobileCategoriesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Categories List (Hidden by default on mobile unless toggled) */}
            <div className={`space-y-2 ${isMobileCategoriesOpen ? 'block' : 'hidden lg:block'}`}>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Categories</span>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsMobileCategoriesOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 shadow-md'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-800" />

            {/* Price Range Filter (Placed below Categories) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="uppercase tracking-wider text-slate-400 text-[11px]">Max Price</span>
                <span className="text-indigo-600 dark:text-amber-400 font-black">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>$50</span>
                <span>$1000+</span>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-800" />

            {/* Minimum Rating Filter */}
            <div className="space-y-2">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Minimum Rating</span>
              <div className="grid grid-cols-4 gap-2">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      minRating === rating
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Content: Search, Sort & Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search & Sort Bar */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 p-4 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 pl-11 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-amber-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-bold text-slate-400 uppercase shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-600 dark:focus:border-amber-400"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Product Results Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-[2.5rem] p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-indigo-600 dark:text-amber-400 text-2xl font-bold">
                🔍
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">No products found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                We couldn't find any items matching your selected filters or search query. Try resetting your filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden"
                  >
                    {/* Category Badge & Wishlist Button */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-indigo-600/90 dark:bg-amber-400/90 backdrop-blur-md text-white dark:text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {product.category}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-6 right-6 z-10 p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-md ${
                        isWishlisted
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:scale-110'
                      }`}
                      title="Wishlist toggle"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Product Image Link */}
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full h-52 sm:h-56 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden mb-4 block"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating || '4.8'}</span>
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className="font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-indigo-600 dark:hover:text-amber-400 transition-colors line-clamp-1 block"
                        >
                          {product.name}
                        </Link>

                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 font-medium">
                          {product.description}
                        </p>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                        <span className="text-lg font-black text-indigo-600 dark:text-amber-400">
                          ${product.price.toFixed(2)}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-amber-400 text-indigo-600 dark:text-amber-300 hover:text-white dark:hover:text-slate-950 p-2.5 rounded-xl transition-all shadow-sm"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}