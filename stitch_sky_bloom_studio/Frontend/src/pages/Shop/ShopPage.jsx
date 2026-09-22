import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { api } from '../../services/api';
import FlowerCard from '../../components/common/FlowerCard';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';
  const [sortBy, setSortBy] = useState('featured');
  const [productList, setProductList] = useState(PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    api.getProducts().then(data => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setProductList(data);
      }
    }).catch(err => console.warn('Could not fetch products from API:', err));
    return () => { isMounted = false; };
  }, []);

  const categories = [
    { id: 'all', label: 'All Stems' },
    { id: 'fragrance', label: 'Fragrance' },
    { id: 'hypoallergenic', label: 'Hypoallergenic' },
    { id: 'single-stems', label: 'Single Stems' },
    { id: 'curated', label: 'Curated Bouquets' },
  ];

  const handleFilterChange = (filterId) => {
    if (filterId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: filterId });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...productList];

    if (activeFilter === 'fragrance') {
      result = result.filter(p => p.isFragrant);
    } else if (activeFilter === 'hypoallergenic') {
      result = result.filter(p => p.isHypoallergenic);
    } else if (activeFilter === 'single-stems') {
      result = result.filter(p => p.isSingleStem);
    } else if (activeFilter === 'curated') {
      result = result.filter(p => p.category === 'curated' || !p.isSingleStem);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeFilter, sortBy, productList]);

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-surface-container pb-8 gap-4">
        <div>
          <span className="text-xs font-label-caps text-primary tracking-widest uppercase">
            FLORA BOTANICAL EDITIONS
          </span>
          <h1 className="font-headline-md text-3xl md:text-4xl text-on-surface font-bold mt-1">
            Shop All Flowers
          </h1>
          <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-xl mt-2">
            Explore fresh seasonal blooms, rare Japanese hydrangeas, pollen-free modern anthuriums, and artisan floral compositions.
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-label-caps text-on-surface-variant whitespace-nowrap">SORT BY:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3 py-2 text-xs font-medium text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-label-caps whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-sm scale-[1.02]'
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface-variant'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-surface-container-low rounded-3xl">
          <span className="material-symbols-outlined text-5xl text-primary/30 mb-3">yard</span>
          <h3 className="font-headline-sm text-lg text-on-surface mb-1">No flowers found</h3>
          <p className="text-xs text-on-surface-variant mb-6">Try selecting a different filter above.</p>
          <button
            onClick={() => handleFilterChange('all')}
            className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-label-caps"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredProducts.map((product) => (
            <FlowerCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Sustainability / Care Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-surface-container-lowest border border-surface-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container/50 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">local_florist</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-base text-on-surface font-semibold">100% Vase Life Guarantee</h4>
            <p className="text-xs text-on-surface-variant">We guarantee your blooms will remain fresh and vibrant for at least 7 days, or we'll replace them.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-label-caps text-primary">Need custom guidance?</span>
          <a href="mailto:concierge@flora.studio" className="px-4 py-2 bg-surface-container text-xs font-label-caps text-primary rounded-full hover:bg-surface-variant">
            TALK TO A FLORIST
          </a>
        </div>
      </div>

    </div>
  );
}
