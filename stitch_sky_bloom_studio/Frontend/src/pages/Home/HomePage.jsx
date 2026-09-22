import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import FlowerCard from '../../components/common/FlowerCard';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-section-gap pb-section-gap">
      
      {/* Hero Section (Editorial Asymmetrical Layout) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[580px] lg:min-h-[618px]">
          
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 z-10 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/40 text-on-primary-container text-xs font-label-caps mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              NEW SEASON ARRIVALS • AZURE EDITION
            </div>
            
            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface mb-6 leading-[1.1] tracking-tight">
              Flowers,<br />
              <span className="text-primary italic font-serif font-normal">Your Way.</span>
            </h1>
            
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant mb-8 max-w-md leading-relaxed">
              Fresh blooms, custom bouquets, and thoughtful little details delivered with an effortless, airy elegance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-soft-float group"
              >
                <span>Shop Flowers</span>
                <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link 
                to="/builder" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-outline-variant text-primary rounded-full font-headline-sm text-sm hover:bg-surface-variant hover:scale-[1.02] transition-all duration-300 shadow-sm"
              >
                <span>Create Your Bouquet</span>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-surface-container">
              <div>
                <span className="font-headline-md text-xl md:text-2xl text-primary font-bold">100%</span>
                <p className="text-xs text-on-surface-variant font-label-caps">FRESH BLOOMS</p>
              </div>
              <div>
                <span className="font-headline-md text-xl md:text-2xl text-primary font-bold">48h</span>
                <p className="text-xs text-on-surface-variant font-label-caps">COLD DELIVERY</p>
              </div>
              <div>
                <span className="font-headline-md text-xl md:text-2xl text-primary font-bold">4.9★</span>
                <p className="text-xs text-on-surface-variant font-label-caps">TOP RATED</p>
              </div>
            </div>
          </div>

          {/* Asymmetrical Imagery */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 h-[380px] sm:h-[480px] lg:h-[618px]">
            <div className="absolute right-0 top-0 w-full lg:w-[108%] h-full bg-surface-container-low rounded-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl overflow-hidden shadow-sky-glow">
              <img 
                alt="Hero Floral Arrangement" 
                className="w-full h-full object-cover object-center hero-img-clip hover:scale-105 transition-transform duration-1000 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzzKrTEAzwALBQbOe7lqkBBXfm7O_B2DqAmDBh372cdCfvC58leJLfbaE6huMfvOEbcMMBDksKoU0E-uhTfLPV6mfwdy_X7PvkxtgEcoSyMvsvOgiHRuv5vtpvT6pi_1rLGLPWJ28nU1V1z3He2wctDzj9LAJhyMu5G75YPK9AQk0fvrEePAZd5MCwMvzcxc8gbXMoAzCLzb7LjwleYK5-zGoFMB33AUESjwZkB2lE1a_o0DdiE5M2Jw" 
              />
            </div>
            
            {/* Decorative Floating Element */}
            <div className="absolute -bottom-6 -left-6 w-40 sm:w-48 h-56 sm:h-64 rounded-2xl overflow-hidden border-4 border-surface shadow-xl hidden sm:block z-20 hover:rotate-1 transition-transform duration-300">
              <img 
                alt="Detail flower shot" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWI4Vo8oRg7rd-7CtB5rdh7CkKZYSQmOiJANdTSxZKS1HDw5LxVkUnaCWZsEzXnIFVXeIviJNloMX5f3AkxpX2ErR6dbEOeC7Evu1Tp9Cn4_wY6izn9jSQ6Of2ozzORakLjY5TWe7Bfxu5fGkRi06w5rB_dZrNtdfEgDN4jW39FfuStfaSnwFGGu9KH3l51dui1RvOt7MfxFFQ4m_Uw4olhFON48v6QIJzfe6ChjTS2wk1J61Aud3VUg" 
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white text-[10px] font-label-caps text-center">
                MACRO DETAIL
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Bento Grid Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-2">
          <div>
            <span className="text-xs font-label-caps text-primary tracking-widest uppercase">DISCOVER FLORA</span>
            <h2 className="font-headline-md text-2xl sm:text-3xl text-primary font-bold">Curated Collections</h2>
          </div>
          <Link to="/shop" className="text-sm font-label-caps text-primary hover:underline flex items-center gap-1">
            VIEW ALL COLLECTIONS <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter auto-rows-[320px] lg:auto-rows-[380px]">
          
          {/* Card 1: Fragrance (Spans 2 cols on lg) */}
          <Link 
            to="/shop?filter=fragrance" 
            className="group relative rounded-[2rem] overflow-hidden lg:col-span-2 block bg-surface-container-low isolate shadow-sm hover:shadow-card-hover transition-all duration-300"
          >
            <img 
              alt="Fragrance Collection" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out -z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-o5r4YP_h4VnSZ3X9AsZYHnkt7YkYwi-hXmGWaMn1kzdAFrflrYsISeRSH83b3YUkIrf_-diHnxqp5jZ7g9oqpsLEPWp8qc4Es4Oud49zPIxzGmUSXKY107qpAm0Ri_5GMzzSE2BzGqyiA6UDKtzRgeyJFxHrE7dZGsb-qG5SvQ_JvnajOkw90iwnnxqopT4b69QkVWcpTDOAaicNli6qAh8PjOOF6zlT-lB1b5F9mWRPiexQuMADsA" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent -z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <span className="font-label-caps text-xs text-primary-fixed bg-black/40 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                  SCENTED & AROMATIC
                </span>
                <h3 className="font-headline-sm text-2xl md:text-3xl text-white mb-1">Fragrance Collection</h3>
                <p className="font-body-md text-sm md:text-base text-white/90">Aromatic lilies and peonies for multisensory delight.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary-container group-hover:text-primary transition-colors duration-300 shrink-0">
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Card 2: Non-Fragrance / Hypoallergenic */}
          <Link 
            to="/shop?filter=hypoallergenic" 
            className="group relative rounded-[2rem] overflow-hidden block bg-[#F0F9FF] isolate shadow-sm hover:shadow-card-hover transition-all duration-300"
          >
            <img 
              alt="Hypoallergenic Collection" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out -z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtLDaXCHaozG8AlKPryXRI4HmUu3dt2kcGh1QhL3G9mZ1-lSaajQMl2S25ihA_5JVfdIExz0MHUnoc_k5nRmFd8s-bjcYNmaXsIfqzS7jm0aL7AHI51GxLqi3p5U-jLKAxNUlIfJTA829nuIRonDQbZHzBzie0aU_M0shQZjQkBGAQ6nYas_3H3u7IrIvq8ABCR4M8DgDXJz3qVacF4JT_ulGx1bFUVEhnhvuULJGMd_CK_ippyZiHFg" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="font-label-caps text-xs text-primary-fixed bg-black/40 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                POLLEN-FREE
              </span>
              <h3 className="font-headline-sm text-2xl text-white mb-2">Hypoallergenic</h3>
              <p className="font-body-md text-sm text-white/90 mb-4">Sculptural beauty without the sneeze.</p>
              <span className="font-label-caps text-xs text-white border border-white/60 rounded-full px-4 py-2 group-hover:bg-white group-hover:text-primary transition-colors duration-300 inline-block">
                SHOP NOW
              </span>
            </div>
          </Link>

          {/* Card 3: Single Flowers */}
          <Link 
            to="/shop?filter=single-stems" 
            className="group relative rounded-[2rem] overflow-hidden block bg-surface-container isolate shadow-sm hover:shadow-card-hover transition-all duration-300"
          >
            <img 
              alt="Single Stems Collection" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out -z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr4yzZ3g7U1kk9bm8XFyqLvvXVul08-jww8rWH13IksZDdxAlzJlXH3fFDU11lKxoMR3y63jfKEjxhgYjmp66BXFOvp0ExBaOzr-XYiAFPxC83dzh131UDUpTMSRB-Dn3CA5J67ohvYqLL8EA0MmVor1-MLlHZ_IAm8s_UllqxnS3cC8qqyXls_lDX0_QNJuT13FuT79_ApxWlNTzWy4_EMWzsKAwGF-xdECeC2VGABSZ9wc5gbME9uw" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="font-label-caps text-xs text-primary-fixed bg-black/40 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
                MINIMALIST
              </span>
              <h3 className="font-headline-sm text-2xl text-white mb-2">Single Stems</h3>
              <p className="font-body-md text-sm text-white/90 mb-4">Curate your own refined focal stems.</p>
              <span className="font-label-caps text-xs text-white border border-white/60 rounded-full px-4 py-2 group-hover:bg-white group-hover:text-primary transition-colors duration-300 inline-block">
                EXPLORE STEMS
              </span>
            </div>
          </Link>

          {/* Card 4: Customised Bouquet (Spans 2 cols on lg) */}
          <Link 
            to="/builder" 
            className="group relative rounded-[2rem] overflow-hidden lg:col-span-2 block bg-surface-variant isolate shadow-sm hover:shadow-card-hover transition-all duration-300"
          >
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white z-10">
                <span className="font-label-caps text-xs text-primary mb-3 tracking-widest uppercase">
                  BESPOKE FLORISTRY
                </span>
                <h3 className="font-headline-md text-2xl md:text-3xl text-on-surface mb-3 font-bold">Custom Bouquets</h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 max-w-sm">
                  Mix and match stems, palettes, and ribbons to create a bespoke arrangement that perfectly captures your sentiment.
                </p>
                <span className="inline-flex items-center gap-2 font-headline-sm text-sm text-primary group-hover:gap-4 transition-all duration-300">
                  Start Creating <span className="material-symbols-outlined text-sm">east</span>
                </span>
              </div>
              <div className="md:w-1/2 h-full relative overflow-hidden">
                <img 
                  alt="Custom Bouquet Workspace" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwU3J3RpYPzhjR2wU-gTtUvqn9KvzQbaucVJIS7N8cHE3Ft84pIWv2okZPVbPZVTlNfUw6CgQ-sL8nl3HRCN13lZNcIZYrYnYaQBdoi73Rp7LhruVnYwAKaaYE-t2jdYTzXYHxAyX0wQnQepH-Evr2utS7An5guKscj70R89M0fdXvPYi4QLoxRe6KP4gq_enG0m5rUv9ncLatLM6QsUd13CNzRSYo77cHpwwcXBhThQsES9M7RNGoxg" 
                />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Featured Botanical Arrivals */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-label-caps text-primary tracking-widest uppercase">MOST LOVED</span>
            <h2 className="font-headline-md text-2xl sm:text-3xl text-primary font-bold">Signature Selections</h2>
          </div>
          <Link to="/shop" className="text-sm font-label-caps text-primary hover:underline flex items-center gap-1">
            EXPLORE SHOP <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {featuredProducts.map(product => (
            <FlowerCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Personal Note Promo Banner */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-primary-fixed/40 via-surface-container-low to-secondary-container/40 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary-fixed">
          <div className="max-w-xl">
            <span className="font-label-caps text-xs text-primary mb-2 inline-block">THOUGHTFUL DETAILS</span>
            <h3 className="font-headline-md text-2xl md:text-3xl text-on-surface font-bold mb-3">
              Add a Complimentary Wax-Sealed Note
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Every arrangement tells a story. Personalize your order with our custom botanical card stationery, handwritten typography, and wax seal crests.
            </p>
          </div>
          <Link 
            to="/note" 
            className="px-8 py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 transition-transform hover:scale-105 shadow-md shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>Personalize a Note</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
