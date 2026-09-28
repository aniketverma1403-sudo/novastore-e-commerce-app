import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm animate-pulse flex flex-col justify-between">
      {/* Image Skeleton */}
      <div className="w-full h-48 sm:h-60 bg-gray-200 dark:bg-slate-800 rounded-2xl mb-4" />
      
      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="w-1/3 h-4 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="w-3/4 h-5 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="w-1/2 h-4 bg-gray-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Footer / Price & Button Skeleton */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
        <div className="w-1/4 h-6 bg-gray-200 dark:bg-slate-800 rounded-md" />
        <div className="w-10 h-10 bg-gray-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}