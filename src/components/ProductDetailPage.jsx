import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2, Check } from 'lucide-react';
import SEO from './SEO';

export default function ProductDetailPage({ products, addToCart, buyNow, toggleWishlist, wishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by id (converting string param to number or matching string)
  const product = products.find((p) => String(p.id) === String(id));

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [copiedShare, setCopiedShare] = useState(false);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-3xl mb-4 text-indigo-600 dark:text-amber-400 font-bold">
          🛍️
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          The product you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-lg transition-all"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // JSON-LD Product Schema for Google Shopping / SEO
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image, ...(product.gallery || [])],
    "description": product.description,
    "sku": `NOVA-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "NovaStore"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleAddToCartWithQty = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNowWithQty = () => {
    handleAddToCartWithQty();
    buyNow(product);
  };

  // Similar products from same category
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description}
        image={selectedImage || product.image}
        url={window.location.href}
        schema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:underline">Catalog</Link>
            <span>/</span>
            <span className="text-indigo-600 dark:text-amber-400 font-bold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 shadow-sm overflow-hidden group">
              <span className="absolute top-6 left-6 z-10 bg-indigo-600 dark:bg-amber-400 text-white dark:text-slate-950 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {product.category}
              </span>

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 z-10 p-3 rounded-2xl backdrop-blur-md transition-all shadow-md ${
                  isWishlisted
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:scale-110'
                }`}
                title="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <div className="w-full h-80 sm:h-[450px] flex items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnail Gallery (if available) */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {[product.image, ...product.gallery].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-2 h-20 flex items-center justify-center overflow-hidden transition-all ${
                      (selectedImage || product.image) === img
                        ? 'border-indigo-600 dark:border-amber-400 shadow-md scale-95'
                        : 'border-gray-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt="" className="h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-900">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{product.rating || '4.8'}</span>
                  <span className="text-slate-400 ml-1">({product.reviewsCount || 124} reviews)</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                  In Stock & Ready
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-amber-400">
                  ${product.price?.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through font-bold">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-extrabold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <hr className="border-gray-200 dark:border-slate-800" />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quantity</span>
              <div className="inline-flex items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-750 transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-sm text-slate-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-750 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCartWithQty}
                className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-850 text-indigo-600 dark:text-amber-300 border-2 border-indigo-600 dark:border-amber-400 font-bold px-6 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-sm transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNowWithQty}
                className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold px-6 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/25 dark:shadow-amber-400/20 transition-all active:scale-95"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Share & Extra actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 transition-all"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'Link Copied to Clipboard!' : 'Share Product'}</span>
              </button>
            </div>

            {/* Trust Badges Box */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Free Express Shipping</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-slate-800 text-violet-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">7-Day Easy Returns</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Hassle-free doorstep pickup</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Secure Checkout</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">256-Bit SSL Encrypted</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs Section: Description, Specifications & Reviews */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-gray-200 dark:border-slate-800 gap-8 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-indigo-600 dark:border-amber-400 text-indigo-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Detailed Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-indigo-600 dark:border-amber-400 text-indigo-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              Customer Reviews ({product.reviewsCount || 124})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              <p>
                Engineered with precision and crafted using premium-grade materials, the <strong>{product.name}</strong> represents the pinnacle of modern design and reliability. Every unit undergoes strict 7-point inspection to ensure absolute perfection before reaching your doorstep.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Category Standard</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Flagship {product.category} Series</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Warranty Coverage</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">1 Year Comprehensive Manufacturer Warranty</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Verified Buyer Feedback</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Average rating of 4.8 out of 5 stars based on 124 reviews.</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Alexander Wright</span>
                    <div className="flex text-amber-500 text-xs">★★★★★</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "Absolute top-tier build quality! Exceeded my expectations in every possible way. Delivery was lightning fast too."
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Priya Sharma</span>
                    <div className="flex text-amber-500 text-xs">★★★★★</div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "Stunning design and works flawlessly. NovaStore customer concierge resolved my query in minutes. Highly recommended!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar / Related Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Similar Products You Might Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((simProduct) => (
                <div 
                  key={simProduct.id} 
                  onClick={() => navigate(`/product/${simProduct.id}`)}
                  className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="h-48 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4 mb-4 overflow-hidden">
                    <img src={simProduct.image} alt={simProduct.name} className="h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate mb-1">{simProduct.name}</h4>
                  <span className="text-sm font-black text-indigo-600 dark:text-amber-400">${simProduct.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}