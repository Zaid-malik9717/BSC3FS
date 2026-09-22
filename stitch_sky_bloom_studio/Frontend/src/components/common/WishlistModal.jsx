import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function WishlistModal() {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-on-secondary-fixed/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />
      <div className="relative bg-surface rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden border border-outline-variant/30 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary fill-1 text-2xl">favorite</span>
            <h3 className="font-headline-sm text-xl text-primary">Saved Blooms ({wishlist.length})</h3>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-5xl text-primary/30 mb-3">favorite_border</span>
              <p className="font-headline-sm text-lg text-on-surface mb-2">Your wishlist is empty</p>
              <p className="text-sm text-on-surface-variant mb-6">Explore our curated collections and save the blooms that speak to you.</p>
              <button 
                onClick={() => {
                  setIsWishlistOpen(false);
                  navigate('/shop');
                }}
                className="px-6 py-3 bg-primary text-white rounded-full font-label-caps text-xs tracking-wider hover:bg-primary/90 transition-all shadow-sm"
              >
                DISCOVER BLOOMS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map(flower => (
                <div 
                  key={flower.id}
                  className="flex items-center gap-4 p-3 bg-surface-container-lowest rounded-2xl border border-surface-container group"
                >
                  <img 
                    src={flower.image} 
                    alt={flower.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-grow">
                    <span className="text-[10px] font-label-caps text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full inline-block mb-1">
                      {flower.categoryLabel || 'CURATED'}
                    </span>
                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigate(`/product/${flower.id}`);
                      }}
                      className="font-headline-sm text-sm text-on-surface hover:text-primary cursor-pointer transition-colors"
                    >
                      {flower.name}
                    </h4>
                    <p className="font-body-md text-sm font-semibold text-primary mt-1">
                      ${flower.price}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        addToCart({
                          id: flower.id,
                          name: flower.name,
                          price: flower.price,
                          image: flower.image,
                          quantity: 1,
                          selectedOption: flower.stemOptions ? flower.stemOptions[0] : { label: 'Signature', price: flower.price }
                        });
                      }}
                      className="px-3 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-label-caps hover:scale-105 transition-transform"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(flower)}
                      className="text-xs text-error hover:underline flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">delete</span> Remove
                    </button>
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
