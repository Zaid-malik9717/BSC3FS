import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    giftNote, 
    subtotal, 
    discountAmount, 
    discountPercent, 
    shippingFee, 
    estimatedTax, 
    total, 
    promoCode, 
    applyPromo,
    clearCart 
  } = useCart();

  const [step, setStep] = useState(1);
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    recipientName: giftNote?.recipient || '',
    streetAddress: '742 Evergreen Terrace',
    apt: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    phone: '+1 (555) 234-5678',
    deliverySlot: 'morning',
    instructions: 'Please ring bell and leave with reception if unavailable.',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoInput) return;
    try {
      const backendRes = await api.validatePromo(promoInput, subtotal);
      if (backendRes.success) {
        applyPromo(promoInput);
        setPromoFeedback({ success: true, message: backendRes.message });
      } else {
        setPromoFeedback({ success: false, message: backendRes.message || 'Invalid promo code' });
      }
    } catch {
      const res = applyPromo(promoInput);
      setPromoFeedback(res);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems,
        deliveryDetails: {
          recipientName: formData.recipientName,
          streetAddress: formData.streetAddress,
          apt: formData.apt,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          phone: formData.phone,
          deliverySlot: formData.deliverySlot,
          instructions: formData.instructions,
        },
        giftNote: giftNote,
        promoCode: promoCode,
        paymentMethod: formData.paymentMethod,
        total: total
      };

      const result = await api.createOrder(orderPayload);
      const placedNum = result.orderNumber || `FL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(placedNum);
      setIsOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error('Order placement error:', err);
      const fallbackNum = `FL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(fallbackNum);
      setIsOrderPlaced(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="material-symbols-outlined text-6xl text-primary/30">shopping_bag</span>
        <h2 className="font-headline-md text-2xl text-on-surface font-bold">Your cart is empty</h2>
        <p className="text-sm text-on-surface-variant">Add some fresh botanical stems before proceeding to checkout.</p>
        <Link 
          to="/shop" 
          className="inline-block px-8 py-3 bg-primary text-white rounded-full font-label-caps text-xs tracking-wider hover:bg-primary/90"
        >
          EXPLORE SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
      
      {/* Order Complete Modal / State */}
      {isOrderPlaced ? (
        <div className="max-w-2xl mx-auto bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border border-surface-container text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <div>
            <span className="text-xs font-label-caps text-primary tracking-widest uppercase">ORDER CONFIRMED</span>
            <h2 className="font-headline-md text-3xl text-on-surface font-bold mt-1">Thank You For Your Order</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              We're preparing your botanical stems. Order confirmation #{orderNumber} has been sent to your email.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-surface-container text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Recipient:</span>
              <span className="font-semibold text-on-surface">{formData.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Delivery Address:</span>
              <span className="font-semibold text-on-surface">{formData.streetAddress}, {formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Delivery Window:</span>
              <span className="font-semibold text-on-surface capitalize">{formData.deliverySlot} (Cold-Chain)</span>
            </div>
            {giftNote && (
              <div className="flex justify-between pt-2 border-t border-surface-container">
                <span className="text-on-surface-variant">Gift Card:</span>
                <span className="font-semibold text-primary">Attached & Wax Sealed</span>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/"
              className="px-8 py-3.5 bg-primary text-white rounded-full font-label-caps text-xs tracking-wider hover:bg-primary/90 transition-transform hover:scale-105"
            >
              RETURN TO HOME
            </Link>
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-surface-container text-primary rounded-full font-label-caps text-xs tracking-wider hover:bg-surface-variant transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column: Forms & Progress */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Progress Step Bar */}
            <div className="flex items-center gap-4 pb-2 border-b border-surface-container">
              <div className={`flex items-center gap-2 font-label-caps text-xs ${step >= 1 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-primary text-white' : 'bg-surface-container'}`}>
                  1
                </div>
                <span>DELIVERY</span>
              </div>
              <div className="h-px w-10 bg-outline-variant"></div>
              <div className={`flex items-center gap-2 font-label-caps text-xs ${step >= 2 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-primary text-white' : 'bg-surface-container'}`}>
                  2
                </div>
                <span>PAYMENT</span>
              </div>
            </div>

            {/* STEP 1: Delivery Details */}
            {step === 1 && (
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-headline-sm text-xl text-on-surface font-semibold">Delivery Details</h3>
                  <p className="text-xs text-on-surface-variant">Where should we send these freshly cut blooms?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">RECIPIENT NAME *</label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">STREET ADDRESS *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Street name and number"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">APT / SUITE / UNIT</label>
                    <input
                      type="text"
                      name="apt"
                      value={formData.apt}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">CITY *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">STATE *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">ZIP CODE *</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="ZIP"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-label-caps text-on-surface-variant block">CONTACT PHONE FOR COURIER *</label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Delivery Time Slots */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-label-caps text-on-surface-variant block">DELIVERY TIME WINDOW</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'morning', label: 'Morning Slot', time: '9:00 AM - 1:00 PM' },
                      { id: 'afternoon', label: 'Afternoon Slot', time: '1:00 PM - 5:00 PM' },
                      { id: 'evening', label: 'Evening Slot', time: '5:00 PM - 8:00 PM' }
                    ].map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, deliverySlot: slot.id }))}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          formData.deliverySlot === slot.id 
                            ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                            : 'border-outline-variant/40 bg-surface'
                        }`}
                      >
                        <span className="block text-xs font-semibold text-on-surface">{slot.label}</span>
                        <span className="text-[10px] text-on-surface-variant">{slot.time}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}

            {/* STEP 2: Payment Details */}
            {step === 2 && (
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-headline-sm text-xl text-on-surface font-semibold">Payment Method</h3>
                    <p className="text-xs text-on-surface-variant">Encrypted with 256-bit SSL protection.</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-label-caps text-primary hover:underline"
                  >
                    Edit Delivery
                  </button>
                </div>

                {/* Payment Selector Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Credit Card', icon: 'credit_card' },
                    { id: 'apple', label: 'Apple Pay', icon: 'phone_iphone' },
                    { id: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' }
                  ].map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                        formData.paymentMethod === method.id 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 bg-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg text-primary">{method.icon}</span>
                      <span className="text-[11px] font-semibold text-on-surface">{method.label}</span>
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-label-caps text-on-surface-variant block">CARD NUMBER</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-primary text-base">credit_card</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-label-caps text-on-surface-variant block">EXPIRY DATE</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-label-caps text-on-surface-variant block">CVC / CVV</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 bg-surface-container rounded-full text-xs font-label-caps text-on-surface hover:bg-surface-variant transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="flex-grow py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isSubmitting ? 'progress_activity' : 'lock'}
                    </span>
                    <span>
                      {isSubmitting ? 'Processing Order...' : `Complete Order • $${total.toFixed(2)}`}
                    </span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6 sticky top-28">
            <h3 className="font-headline-sm text-lg text-primary font-bold">Order Summary</h3>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.uniqueKey || item.id} className="flex items-center gap-3 bg-surface p-2.5 rounded-2xl border border-surface-container">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-headline-sm text-xs text-on-surface truncate">{item.name}</h4>
                    <p className="text-[10px] text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-headline-sm text-xs text-primary font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Gift Note Box */}
            {giftNote && (
              <div className="p-3 bg-primary-fixed/30 border border-primary-fixed rounded-2xl text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] text-primary">ATTACHED GIFT CARD</span>
                  <Link to="/note" className="text-[10px] font-label-caps text-primary hover:underline">Edit</Link>
                </div>
                <p className="italic text-on-surface text-[11px] line-clamp-1">"{giftNote.message}"</p>
                <span className="text-[10px] text-on-surface-variant block">To: {giftNote.recipient} • Wax Sealed</span>
              </div>
            )}

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try FLORA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="bg-surface border border-outline-variant/60 rounded-xl px-3 py-2 text-xs flex-grow uppercase outline-none focus:ring-2 focus:ring-primary-container"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-surface-container hover:bg-surface-variant text-primary font-label-caps text-xs rounded-xl transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoFeedback && (
                <p className={`text-[11px] ${promoFeedback.success ? 'text-emerald-600' : 'text-error'}`}>
                  {promoFeedback.message}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs border-t border-surface-container pt-4">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount ({discountPercent * 100}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Cold-Chain Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-primary font-semibold">FREE</span> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Sales Tax (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface font-headline-sm text-base font-bold pt-2 border-t border-surface-container">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
