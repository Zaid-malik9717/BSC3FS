import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLOWER_BUILDER_OPTIONS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function BouquetBuilderPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFlower, setSelectedFlower] = useState(FLOWER_BUILDER_OPTIONS.flowerTypes[0]);
  const [selectedColor, setSelectedColor] = useState(FLOWER_BUILDER_OPTIONS.colors[0]);
  const [selectedSize, setSelectedSize] = useState(FLOWER_BUILDER_OPTIONS.sizes[1]); // Signature default
  const [selectedWrap, setSelectedWrap] = useState(FLOWER_BUILDER_OPTIONS.wraps[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(FLOWER_BUILDER_OPTIONS.ribbons[0]);

  // Calculate live price
  const baseFlowerPrice = selectedFlower.price;
  const sizeMultiplier = selectedSize.multiplier;
  const wrapExtra = selectedWrap.extraPrice;
  const ribbonExtra = selectedRibbon.extraPrice;
  const totalPrice = Math.round((baseFlowerPrice * 4 * sizeMultiplier) + wrapExtra + ribbonExtra);

  const handleAddToCart = () => {
    addToCart({
      id: `custom-bouquet-${selectedFlower.id}-${selectedColor.id}-${Date.now()}`,
      name: `Custom ${selectedFlower.name} Arrangement`,
      price: totalPrice,
      image: selectedFlower.image,
      isCustomBouquet: true,
      flowerName: selectedFlower.name,
      flowerCount: selectedSize.stems,
      colorName: selectedColor.name,
      wrapName: selectedWrap.name,
      ribbonName: selectedRibbon.name,
      quantity: 1
    });
  };

  const steps = [
    { num: 1, label: 'FLOWER' },
    { num: 2, label: 'COLOR' },
    { num: 3, label: 'SIZE' },
    { num: 4, label: 'WRAP & RIBBON' }
  ];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-label-caps text-primary tracking-widest uppercase">
          BESPOKE FLORAL STUDIO
        </span>
        <h1 className="font-headline-md text-3xl md:text-4xl text-primary font-bold mt-1">
          Build Your Bouquet
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant mt-1">
          Create a personalized botanical masterpiece, stem by stem.
        </p>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto hide-scrollbar pb-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <button
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2 font-label-caps text-xs px-3 py-1.5 rounded-full transition-all ${
                  currentStep === step.num
                    ? 'bg-primary text-white shadow-sm'
                    : currentStep > step.num
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container text-on-surface-variant hover:text-primary'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === step.num ? 'bg-white text-primary' : 'bg-transparent'
                }`}>
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span className="whitespace-nowrap">{step.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className="h-px w-6 bg-outline-variant/50 hidden sm:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Interactive Step Controls */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm space-y-6">
          
          {/* STEP 1: Focal Flower */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold">1. Choose Primary Focal Bloom</h3>
                <p className="text-xs text-on-surface-variant">Select the centerpiece stem that anchors your arrangement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FLOWER_BUILDER_OPTIONS.flowerTypes.map((flower) => {
                  const isSelected = selectedFlower.id === flower.id;
                  return (
                    <div
                      key={flower.id}
                      onClick={() => setSelectedFlower(flower)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                      }`}
                    >
                      <img 
                        src={flower.image} 
                        alt={flower.name} 
                        className="w-16 h-16 object-cover rounded-xl shrink-0"
                      />
                      <div>
                        <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{flower.name}</h4>
                        <p className="text-xs text-on-surface-variant">{flower.description}</p>
                        <span className="text-xs font-bold text-primary mt-1 inline-block">${flower.price}/stem base</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Color Palette */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold">2. Select Color Palette</h3>
                <p className="text-xs text-on-surface-variant">Choose the color harmony for your arrangement.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FLOWER_BUILDER_OPTIONS.colors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <div
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                        isSelected 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                      }`}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full shrink-0 shadow-sm ${color.bgClass}`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{color.name}</h4>
                        <span className="text-xs text-on-surface-variant">Signature studio tint</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Size & Stem Count */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold">3. Select Bouquet Volume</h3>
                <p className="text-xs text-on-surface-variant">Decide how opulent and full you want your arrangement.</p>
              </div>

              <div className="space-y-3">
                {FLOWER_BUILDER_OPTIONS.sizes.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{size.name}</h4>
                          <span className="text-[10px] font-label-caps bg-primary-fixed text-primary px-2 py-0.5 rounded-full">
                            {size.stems}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">{size.description}</p>
                      </div>
                      <span className="font-headline-sm text-sm text-primary font-bold">
                        {size.multiplier === 1 ? 'Standard' : `+${Math.round((size.multiplier - 1) * 100)}% volume`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Wrapping & Ribbon */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold">4. Wrapping & Raw Silk Ribbon</h3>
                <p className="text-xs text-on-surface-variant">The finishing atelier presentation touches.</p>
              </div>

              {/* Wrapping Selection */}
              <div className="space-y-2">
                <label className="text-xs font-label-caps text-on-surface-variant block">WRAP PAPER</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FLOWER_BUILDER_OPTIONS.wraps.map((wrap) => (
                    <button
                      key={wrap.id}
                      onClick={() => setSelectedWrap(wrap)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedWrap.id === wrap.id 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 bg-surface'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-on-surface">{wrap.name}</span>
                      <span className="text-[11px] text-primary">{wrap.extraPrice === 0 ? 'Included' : `+$${wrap.extraPrice}`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ribbon Selection */}
              <div className="space-y-2">
                <label className="text-xs font-label-caps text-on-surface-variant block">LUXE RIBBON</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FLOWER_BUILDER_OPTIONS.ribbons.map((ribbon) => (
                    <button
                      key={ribbon.id}
                      onClick={() => setSelectedRibbon(ribbon)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedRibbon.id === ribbon.id 
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30' 
                          : 'border-outline-variant/40 bg-surface'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-on-surface">{ribbon.name}</span>
                      <span className="text-[11px] text-primary">{ribbon.extraPrice === 0 ? 'Included' : `+$${ribbon.extraPrice}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-surface-container">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2.5 bg-surface-container hover:bg-surface-variant rounded-full text-xs font-label-caps text-on-surface transition-colors"
              >
                ← BACK
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-8 py-3 bg-primary text-white hover:bg-primary/90 rounded-full text-xs font-label-caps tracking-wider transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>NEXT STEP</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-8 py-3.5 bg-primary text-white hover:bg-primary/90 rounded-full text-xs font-label-caps tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                <span>ADD CUSTOM BOUQUET • ${totalPrice}</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Bouquet Preview & Summary Card */}
        <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6 sticky top-28">
          
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface shadow-inner border border-surface-container">
            <img 
              src={selectedFlower.image} 
              alt={selectedFlower.name} 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Overlay Badges */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span className="font-label-caps text-[10px] text-primary-fixed bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1">
                  LIVE STUDIO PREVIEW
                </span>
                <h4 className="font-headline-sm text-base font-semibold">{selectedFlower.name}</h4>
                <p className="text-xs text-white/80">{selectedColor.name} • {selectedSize.stems}</p>
              </div>
              <div className="text-right">
                <span className="font-headline-md text-xl font-bold text-primary-fixed">${totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Configuration Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="text-xs font-label-caps text-primary tracking-wider mb-2">ARRANGEMENT SUMMARY</div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-on-surface-variant">Focal Bloom</span>
              <span className="font-semibold text-on-surface">{selectedFlower.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-on-surface-variant">Palette Hue</span>
              <span className="font-semibold text-on-surface">{selectedColor.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-on-surface-variant">Arrangement Size</span>
              <span className="font-semibold text-on-surface">{selectedSize.name} ({selectedSize.stems})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-on-surface-variant">Kraft Wrapping</span>
              <span className="font-semibold text-on-surface">{selectedWrap.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">Ribbon Accent</span>
              <span className="font-semibold text-on-surface">{selectedRibbon.name}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            <span>Add Custom Arrangement to Cart</span>
          </button>

        </div>

      </div>

    </div>
  );
}
