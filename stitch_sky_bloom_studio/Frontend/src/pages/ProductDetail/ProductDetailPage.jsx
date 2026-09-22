import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import FlowerCard from '../../components/common/FlowerCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by id or default to first product (cloud-blue-hydrangea)
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedStemOption, setSelectedStemOption] = useState(
    product.stemOptions ? product.stemOptions[0] : { count: 5, label: "Signature (5 Stems)", price: product.price }
  );
  const [includeVase, setIncludeVase] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [activeAccordion, setActiveAccordion] = useState('care');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    setSelectedImage(product.image);
    if (product.stemOptions && product.stemOptions.length > 0) {
      setSelectedStemOption(product.stemOptions[0]);
    }
    window.scrollTo(0, 0);
  }, [product]);

  const vasePrice = 28;
  const basePrice = selectedStemOption ? selectedStemOption.price : product.price;
  const rawTotal = basePrice + (includeVase ? vasePrice : 0);
  const finalPrice = isSubscription ? Math.round(rawTotal * 0.85) : rawTotal;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1,
      selectedOption: selectedStemOption,
      includeVase: includeVase,
      isSubscription: isSubscription,
      deliveryDate: deliveryDate
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-10 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant">
        <Link to="/" className="hover:text-primary">HOME</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">SHOP</Link>
        <span>/</span>
        <span className="text-primary font-bold uppercase">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] md:aspect-square w-full rounded-3xl overflow-hidden bg-surface-container-low border border-surface-container shadow-sm">
            <img 
              src={selectedImage} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isFavorited ? 'bg-white text-error shadow-md' : 'bg-black/20 text-white hover:bg-white hover:text-primary'
              }`}
              aria-label="Wishlist"
            >
              <span className={`material-symbols-outlined ${isFavorited ? 'fill-1' : ''}`}>favorite</span>
            </button>
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-label-caps text-primary-fixed bg-black/40 backdrop-blur-md px-3 py-1 rounded-full uppercase">
                {product.categoryLabel || 'CURATED'}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-primary scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Customization & Purchase Box */}
        <div className="lg:col-span-5 space-y-8 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm">
          
          {/* Title & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm fill-1">star</span>
                ))}
              </div>
              <span className="text-xs font-semibold text-on-surface">{product.rating}</span>
              <span className="text-xs text-on-surface-variant">({product.reviewsCount} reviews)</span>
            </div>
            <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-bold">
              {product.name}
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing Display */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-surface-container">
            <span className="font-headline-md text-3xl text-primary font-bold">
              ${finalPrice}
            </span>
            {isSubscription && (
              <span className="text-xs font-label-caps text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                15% SUBSCRIPTION DISCOUNT
              </span>
            )}
          </div>

          {/* Stem Size Selection */}
          {product.stemOptions && (
            <div className="space-y-3">
              <label className="block text-xs font-label-caps text-on-surface-variant">
                SELECT ARRANGEMENT SIZE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.stemOptions.map((opt) => {
                  const isSelected = selectedStemOption.count === opt.count;
                  return (
                    <button
                      key={opt.count}
                      onClick={() => setSelectedStemOption(opt)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary-container/30 ring-2 ring-primary/20'
                          : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-on-surface">{opt.label}</span>
                      <span className="block text-xs font-bold text-primary mt-1">${opt.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Vase Addon Option */}
          <div 
            onClick={() => setIncludeVase(!includeVase)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              includeVase ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant/40 bg-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                includeVase ? 'bg-primary border-primary text-white' : 'border-outline'
              }`}>
                {includeVase && <span className="material-symbols-outlined text-xs">check</span>}
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface block">Add Fluted Ceramic Vase</span>
                <span className="text-[11px] text-on-surface-variant block">Matte porcelain, minimalist sky blue silhouette</span>
              </div>
            </div>
            <span className="text-xs font-bold text-primary">+$28</span>
          </div>

          {/* Delivery Date Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-label-caps text-on-surface-variant">
              DESIRED DELIVERY DATE
            </label>
            <div className="relative">
              <input
                type="date"
                value={deliveryDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:ring-2 focus:ring-primary-container outline-none"
              />
            </div>
            <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-emerald-600">verified</span>
              Delivered fresh in temperature-regulated insulated packaging.
            </p>
          </div>

          {/* Add to Cart & Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Add to Cart • ${finalPrice}</span>
            </button>

            <Link
              to="/note"
              className="w-full py-3 bg-surface-container text-primary rounded-full font-label-caps text-xs hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Add Personalized Gift Note</span>
            </Link>
          </div>

          {/* Added to Cart Feedback */}
          {addedToast && (
            <div className="p-3 bg-primary-container text-on-primary-container rounded-2xl text-xs font-medium flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Added {product.name} to cart!
              </span>
              <button onClick={() => navigate('/checkout')} className="font-label-caps underline hover:text-primary">
                Checkout Now
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Product Accordion Care & FAQ */}
      <div className="max-w-3xl mx-auto space-y-3 pt-8">
        <h3 className="font-headline-md text-xl text-primary font-bold mb-4 text-center">
          Botanical Care & Studio Heritage
        </h3>

        {/* Care Tips Accordion */}
        <div className="border border-surface-container rounded-2xl overflow-hidden bg-surface-container-lowest">
          <button
            onClick={() => setActiveAccordion(activeAccordion === 'care' ? '' : 'care')}
            className="w-full p-4 text-left font-headline-sm text-sm text-on-surface flex justify-between items-center"
          >
            <span>Botanical Care & Vase Life Extension</span>
            <span className="material-symbols-outlined text-sm">
              {activeAccordion === 'care' ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {activeAccordion === 'care' && (
            <div className="p-4 pt-0 text-xs text-on-surface-variant space-y-2 border-t border-surface-container">
              <ul className="list-disc pl-4 space-y-1.5 pt-2">
                {product.care?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Dimensions Accordion */}
        <div className="border border-surface-container rounded-2xl overflow-hidden bg-surface-container-lowest">
          <button
            onClick={() => setActiveAccordion(activeAccordion === 'dimensions' ? '' : 'dimensions')}
            className="w-full p-4 text-left font-headline-sm text-sm text-on-surface flex justify-between items-center"
          >
            <span>Dimensions & Specifications</span>
            <span className="material-symbols-outlined text-sm">
              {activeAccordion === 'dimensions' ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {activeAccordion === 'dimensions' && (
            <div className="p-4 pt-0 text-xs text-on-surface-variant space-y-2 border-t border-surface-container">
              <p className="pt-2">{product.dimensions || "Approx. 50cm stem height"}</p>
              <p>Category: <span className="font-semibold text-primary">{product.categoryLabel}</span></p>
              <p>Pollen Level: <span className="font-semibold">{product.isHypoallergenic ? 'Zero (Hypoallergenic)' : 'Low to Medium'}</span></p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-10 border-t border-surface-container">
        <h3 className="font-headline-md text-2xl text-primary font-bold mb-6">
          Pair with Complementary Blooms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {relatedProducts.map(p => (
            <FlowerCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>
  );
}
