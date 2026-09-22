import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface-container-low text-primary font-body-md text-body-md w-full rounded-t-lg border-t border-surface-container mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop py-16 md:py-24 max-w-container-max mx-auto">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="font-display-lg text-3xl md:text-4xl text-primary font-bold tracking-tighter">
            FLORA
          </Link>
          <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
            Contemporary botanical design and sky-inspired florals curated with modern architectural poise.
          </p>
          <p className="text-on-surface-variant text-xs mt-4">
            © {new Date().getFullYear()} FLORA EDITIONS. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 font-medium">
          <span className="font-headline-sm text-base text-primary mb-2">Explore Flora</span>
          <Link to="/shop" className="text-on-surface-variant hover:text-primary transition-all duration-200 hover:opacity-70 text-sm">
            All Collections
          </Link>
          <Link to="/shop?filter=fragrance" className="text-on-surface-variant hover:text-primary transition-all duration-200 hover:opacity-70 text-sm">
            Aromatic & Fragrant
          </Link>
          <Link to="/shop?filter=hypoallergenic" className="text-on-surface-variant hover:text-primary transition-all duration-200 hover:opacity-70 text-sm">
            Hypoallergenic Stems
          </Link>
          <Link to="/builder" className="text-on-surface-variant hover:text-primary transition-all duration-200 hover:opacity-70 text-sm">
            Bespoke Bouquet Studio
          </Link>
          <Link to="/note" className="text-on-surface-variant hover:text-primary transition-all duration-200 hover:opacity-70 text-sm">
            Personalized Gift Notes
          </Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <span className="font-headline-sm text-base text-primary">Join the Edition</span>
          <p className="text-on-surface-variant text-sm">
            Subscribe for seasonal releases, private botanical drops, and floral care editorials.
          </p>

          {subscribed ? (
            <div className="p-3 bg-primary-container text-on-primary-container rounded-xl text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Thank you for subscribing to FLORA Editions!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white border border-outline-variant/50 rounded-xl px-4 py-3 text-sm flex-grow focus:ring-2 focus:ring-primary-container outline-none transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-primary text-white rounded-xl px-5 hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>
          )}

          <div className="flex items-center gap-4 text-on-surface-variant text-xs pt-2">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">eco</span> 100% Eco-Kraft
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">local_shipping</span> Cold-Chain Delivery
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
