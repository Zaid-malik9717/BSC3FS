import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function FlowerCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedOption: product.stemOptions ? product.stemOptions[0] : { label: 'Signature', price: product.price },
      includeVase: false
    });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group flex flex-col justify-between cursor-pointer rounded-2xl p-4 bg-surface-container-low hover:bg-surface-container transition-all duration-300 relative border border-transparent hover:border-outline-variant/30"
    >
      {/* Top Image Card */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface-container mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="font-label-caps text-[10px] text-primary-fixed bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.categoryLabel || 'CURATED'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            isFavorited 
              ? 'bg-white text-error shadow-sm' 
              : 'bg-black/20 text-white hover:bg-white hover:text-primary'
          }`}
          aria-label="Toggle Wishlist"
        >
          <span className={`material-symbols-outlined text-base ${isFavorited ? 'fill-1' : ''}`}>
            favorite
          </span>
        </button>

        {/* Quick Add overlay button on hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white/90 dark:bg-surface/90 backdrop-blur-md text-primary font-label-caps text-xs rounded-xl shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            QUICK ADD • ${product.price}
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-headline-sm text-base text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 mt-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-variant/40">
          <span className="font-headline-sm text-base text-primary font-semibold">
            ${product.price}
          </span>
          <span className="text-xs text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
            View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </span>
        </div>
      </div>
    </div>
  );
}
