# NovaStore – Next-Gen Flagship E-Commerce Web Application

<div align="center">

  <p><b>A modern, high-performance, and fully responsive e-commerce web application built with React and Tailwind CSS, featuring user-specific cart persistence, protected checkout flows, and production-grade performance optimization.</b></p>
  
  <p>
    <a href="https://your-live-netlify-url.netlify.app" target="_blank"><b>🌐 View Live Demo</b></a>
  </p>
</div>

---

## 🚀 Key Features

* **🔐 User Authentication & Flipkart-Style Profile:** Custom signup and login flow with persistent local session management and user avatar dropdown.
* **🛒 User-Specific Cart & Wishlist Persistence:** Isolated state management ensuring each registered user's cart and wishlist items remain saved in browser storage across sessions.
* **🛡️ Protected Routes:** Secure route wrappers that automatically restrict guest access to sensitive pages like `/checkout` and `/account`, prompting immediate login integration.
* **⚡ Performance & Code Splitting:** Implemented route-based lazy loading (`React.lazy` and `Suspense`) to minimize initial bundle size and ensure lightning-fast load times.
* **🛡️ Error Boundaries & Loading Skeletons:** Graceful runtime crash catching with fallback error screens and shimmering skeleton placeholders for zero layout shifts.
* **🌙 Dark/Light Theme Persistence:** Seamless theme switching with automatic system preference detection and localStorage persistence.
* **🔍 SEO & Metadata Optimization:** Dynamic page titles, OpenGraph tags for social sharing, and JSON-LD Product Schema markup for Google Shopping readiness.

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router v6, JavaScript (ES6+)
* **Styling:** Tailwind CSS, Lucide React Icons
* **State & Storage:** React Hooks (useState, useEffect, useMemo), Browser LocalStorage API
* **Performance & SEO:** React.lazy, Suspense, JSON-LD Structured Data
* **Deployment:** Netlify

---

## 📂 Project Structure

```text
novastore/
│
├── public/                  # Static assets & favicon
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   ├── data/                # Mock product database and configuration
│   ├── App.jsx              # Main router configuration & global state management
│   ├── index.css            # Tailwind CSS directives & global animations
│   └── main.js / main.jsx   # React entry point
│
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation