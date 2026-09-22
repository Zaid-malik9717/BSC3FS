import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchModal from '../common/SearchModal';

export default function Navbar() {
  const { setIsCartOpen, totalItemsCount } = useCart();
  const { setIsWishlistOpen, wishlist } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?filter=fragrance', label: 'Fragrance' },
    { to: '/shop?filter=single-stems', label: 'Single Flowers' },
    { to: '/builder', label: 'Custom' },
    { to: '/note', label: 'Gift Notes' },
  ];

  const isCheckout = location.pathname === '/checkout';

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-white/85 dark:bg-surface/85 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(26,43,60,0.05)] border-b border-surface-container transition-all duration-300">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          
          {/* Left: Mobile Menu Toggle + Brand */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-primary p-1 rounded-lg hover:bg-surface-container"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Brand */}
            <Link 
              to="/" 
              className="font-display-lg text-2xl md:text-3xl tracking-tighter text-primary dark:text-primary-fixed-dim hover:scale-105 transition-transform duration-300 font-bold"
            >
              FLORA
            </Link>
          </div>

          {/* Center: Desktop Nav Links (Hidden in checkout) */}
          {!isCheckout ? (
            <nav className="hidden md:flex items-center gap-8 font-body-md text-sm lg:text-base">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary pb-1 transition-all duration-300'
                      : 'text-on-surface-variant hover:text-primary transition-colors hover:scale-105 duration-300'
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          ) : (
            <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-base">lock</span>
              SECURE CHECKOUT
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-4 text-primary">
            {!isCheckout && (
              <>
                {/* Search */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 hover:scale-110 transition-transform duration-300 text-primary relative"
                  aria-label="Search"
                >
                  <span className="material-symbols-outlined">search</span>
                </button>

                {/* Wishlist */}
                <button 
                  onClick={() => setIsWishlistOpen(true)}
                  className="p-1.5 hover:scale-110 transition-transform duration-300 text-primary relative"
                  aria-label="Favorites"
                >
                  <span className="material-symbols-outlined">favorite</span>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 hover:scale-110 transition-transform duration-300 text-primary relative"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Bouquet Builder Fast CTA */}
            <Link
              to="/builder"
              className="hidden lg:inline-flex items-center gap-1 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-label-caps hover:scale-105 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">palette</span>
              <span>Build Bouquet</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-surface-container bg-surface px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base text-on-surface hover:text-primary py-1 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-surface-container flex flex-col gap-3">
              <Link
                to="/builder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 bg-primary text-white text-center rounded-full text-xs font-label-caps"
              >
                BUILD YOUR BOUQUET
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
