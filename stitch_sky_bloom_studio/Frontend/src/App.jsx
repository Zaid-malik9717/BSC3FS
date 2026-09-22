import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import BouquetBuilderPage from './pages/BouquetBuilder/BouquetBuilderPage';
import PersonalizeNotePage from './pages/PersonalizeNote/PersonalizeNotePage';
import CheckoutPage from './pages/Checkout/CheckoutPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/builder" element={<BouquetBuilderPage />} />
              <Route path="/note" element={<PersonalizeNotePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Layout>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
