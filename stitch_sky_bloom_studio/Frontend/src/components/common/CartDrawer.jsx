import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    giftNote, 
    subtotal, 
    shippingFee, 
    total,
    totalItemsCount 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-on-secondary-fixed/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col justify-between border-l border-outline-variant/30 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-surface-container flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
              <div>
                <h3 className="font-headline-sm text-lg text-primary">Your Cart</h3>
                <span className="text-xs text-on-surface-variant font-label-caps">{totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-5xl text-primary/30 mb-3">shopping_bag</span>
                <h4 className="font-headline-sm text-base text-on-surface mb-1">Your cart is empty</h4>
                <p className="text-xs text-on-surface-variant mb-6">Start building your botanical arrangement or choose from our single stems.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-full font-label-caps text-xs tracking-wider hover:bg-primary/90 transition-all"
                >
                  SHOP FLOWERS
                </button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div 
                    key={item.uniqueKey || item.id}
                    className="flex gap-4 p-3 bg-surface-container-lowest rounded-2xl border border-surface-container relative group"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-headline-sm text-sm text-on-surface truncate pr-4">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.uniqueKey || item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>

                      {item.isCustomBouquet ? (
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          {item.flowerCount} • {item.colorName} • {item.wrapName}
                        </p>
                      ) : (
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          {item.selectedOption?.label || 'Signature Stems'}
                          {item.includeVase && ' + Ceramic Vase'}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-outline-variant/60 rounded-full px-2 py-0.5 bg-surface">
                          <button
                            onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity - 1)}
                            className="text-xs px-1 hover:text-primary font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs px-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity + 1)}
                            className="text-xs px-1 hover:text-primary font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-headline-sm text-sm text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift Note Banner */}
                {giftNote ? (
                  <div className="p-3 bg-primary-fixed/30 border border-primary-fixed rounded-2xl flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5">mark_email_read</span>
                      <div>
                        <p className="font-label-caps text-[11px] text-primary">ATTACHED GIFT NOTE</p>
                        <p className="text-xs text-on-surface italic line-clamp-1">"{giftNote.message}"</p>
                        <span className="text-[10px] text-on-surface-variant">To: {giftNote.recipient || 'Beloved'}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/note');
                      }}
                      className="text-[10px] font-label-caps text-primary hover:underline shrink-0"
                    >
                      EDIT
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/note');
                    }}
                    className="p-3 border border-dashed border-outline-variant hover:border-primary rounded-2xl flex items-center justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-lg">edit_note</span>
                      <span className="text-xs font-body-md text-on-surface group-hover:text-primary">Add a complimentary personalized gift note</span>
                    </div>
                    <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-surface-container bg-surface-container-lowest space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant text-xs">
                  <span>Estimated Delivery</span>
                  <span>{shippingFee === 0 ? <span className="text-primary font-semibold">FREE</span> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-on-surface font-headline-sm text-base pt-2 border-t border-surface-container">
                  <span>Estimated Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
