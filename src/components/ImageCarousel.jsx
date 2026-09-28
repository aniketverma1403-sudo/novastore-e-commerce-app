import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export default function ImageCarousel() {
  const slides = [
    {
      id: 1,
      title: "Next-Gen Flagship Smartphones",
      subtitle: "Up to 40% OFF on Top Brands",
      description: "Experience ultra-fast processors, pro-grade cameras, and all-day battery life.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
      badge: "🔥 Hot Deal",
      bgColor: "from-blue-900/90 via-indigo-900/80 to-slate-900/90"
    },
    {
      id: 2,
      title: "Immersive Audio Experience",
      subtitle: "Wireless Noise-Canceling Headphones",
      description: "Block out the world and dive into crystal-clear acoustics with 30-hour playback.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
      badge: "🎧 Sound of Music",
      bgColor: "from-purple-900/90 via-indigo-900/80 to-slate-900/90"
    },
    {
      id: 3,
      title: "Ergonomic Workspace Essentials",
      subtitle: "Transform Your Home Office",
      description: "Boost your productivity and comfort with designer chairs, desks, and smart lamps.",
      image: "https://images.unsplash.com/photo-1580481077494-e3299ac25e94?q=80&w=1600&auto=format&fit=crop",
      badge: "💼 Work in Comfort",
      bgColor: "from-stone-900/90 via-neutral-900/80 to-zinc-900/90"
    },
    {
      id: 4,
      title: "Designer Streetwear Collection",
      subtitle: "Fresh Autumn Looks Just Dropped",
      description: "Upgrade your wardrobe with premium organic fabrics and modern aesthetics.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop",
      badge: "✨ New Arrival",
      bgColor: "from-rose-950/90 via-pink-900/80 to-slate-900/90"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[380px] sm:h-[440px] group">
        
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000" 
            />

            {/* Gradient Overlay for Text Readability */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} backdrop-blur-[2px]`} />

            {/* Content Container */}
            <div className="relative z-20 h-full max-w-3xl mx-auto px-6 sm:px-12 flex flex-col justify-center text-left text-white">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold px-3.5 py-1.5 rounded-full w-fit mb-4 shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{slide.badge}</span>
              </div>

              {/* Subtitle */}
              <p className="text-amber-400 text-sm sm:text-base font-extrabold uppercase tracking-widest mb-2">
                {slide.subtitle}
              </p>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3 text-white leading-tight">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
                {slide.description}
              </p>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => alert(`Exploring ${slide.title}! (Shop action triggered)`)}
                  className="bg-white hover:bg-indigo-600 text-gray-900 hover:text-white font-extrabold px-6 py-3 rounded-2xl text-sm transition-all duration-300 shadow-lg flex items-center gap-2 group/btn active:scale-95"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

            </div>
          </div>
        ))}

        {/* Left / Right Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? 'w-8 h-2.5 bg-indigo-500 shadow-md shadow-indigo-500/50' 
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}