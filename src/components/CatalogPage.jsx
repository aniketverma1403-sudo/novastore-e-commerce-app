import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { PackageX, Search, ArrowUpDown, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function CatalogPage({ products, addToCart, buyNow, toggleWishlist, wishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, searchQuery, maxPrice, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-900 text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      
      {/* Catalog Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full text-indigo-200 border border-white/10">
            Faceted Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 mb-3 text-white">
            Complete Product Catalog
          </h1>
          <p className="text-indigo-200/80 text-sm max-w-xl font-light">
            Browse our complete curated inventory with real-time price filtering, multi-criteria sorting, and responsive pagination.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR: FACETED FILTERS ================= */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-600 dark:text-amber-400" />
                  Filters
                </h3>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxPrice(1000); setSortBy('featured'); }}
                  className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white underline"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Categories</h4>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                      className={`text-left px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white dark:bg-amber-400 dark:text-slate-950 shadow-md font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Max Price</span>
                  <span className="text-indigo-600 dark:text-amber-400 font-black">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                  className="w-full accent-indigo-600 dark:accent-amber-400 cursor-pointer bg-gray-200 dark:bg-slate-800 rounded-lg h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  <span>$50</span>
                  <span>$1,000+</span>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT MAIN CONTENT: SEARCH, SORT & GRID ================= */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search & Sort Controls Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-amber-400"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-amber-400"
                >
                  <option value="featured">Featured</option>
                  <option value="popularity">Popularity (Rating)</option>
                  <option value="newest">Newest Drops</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>

            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between px-1">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
                {selectedCategory} Inventory
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing <strong className="text-indigo-600 dark:text-amber-400">{paginatedProducts.length}</strong> of <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> items
              </span>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const isWishlisted = wishlist.some((item) => item.id === product.id);
                  return (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      addToCart={addToCart} 
                      buyNow={buyNow}
                      toggleWishlist={toggleWishlist}
                      isWishlisted={isWishlisted}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl">
                <PackageX className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No products match your filters</h3>
                <p className="text-xs text-slate-500 mt-1">Try increasing your price slider range or clearing your search keywords.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-11 h-11 rounded-2xl text-xs font-bold transition-all ${
                        currentPage === pageNum 
                          ? 'bg-indigo-600 text-white dark:bg-amber-400 dark:text-slate-950 shadow-lg scale-105' 
                          : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}