import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../common/CartDrawer';
import WishlistModal from '../common/WishlistModal';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="flex-grow pt-[80px] md:pt-[90px]">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WishlistModal />
    </div>
  );
}
