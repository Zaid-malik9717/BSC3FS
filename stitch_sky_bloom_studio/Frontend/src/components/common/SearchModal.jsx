import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === '' 
    ? PRODUCTS.slice(0, 4) 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSelectProduct = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        className="fixed inset-0 bg-on-secondary-fixed/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-outline-variant/30 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-surface-container flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">search</span>
          <input
            type="text"
            placeholder="Search our fresh blooms, scents, collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/60 text-lg py-2"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs font-label-caps bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant"
          >
            ESC
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-label-caps text-on-surface-variant mb-3 px-2">
            {searchTerm ? `RESULTS (${filteredProducts.length})` : 'POPULAR PICKS'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 text-primary/40">filter_vintage</span>
              <p>No blooms found matching "{searchTerm}".</p>
              <p className="text-xs mt-1">Try searching for "Hydrangea", "Peony", "Luxe", or "Scented".</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-container/30 cursor-pointer transition-colors group"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-14 h-14 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-grow">
                    <h4 className="font-headline-sm text-sm text-on-surface group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm text-sm text-primary">
                      ${product.price}
                    </span>
                    <span className="block text-[10px] text-on-surface-variant uppercase font-label-caps">
                      {product.categoryLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
