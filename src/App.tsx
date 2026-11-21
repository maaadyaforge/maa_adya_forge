import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ClientsAndTestimonialsSection } from './components/ClientsAndTestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { ExporterAndGallerySection } from './components/ExporterAndGallerySection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductsSection } from './components/ProductsSection';
import { findMatchingProductOption } from './utils/inquiry';

export default function App() {
  const [selectedInquiryProduct, setSelectedInquiryProduct] = useState('');

  const handleSelectProductForQuote = (productName: string) => {
    const matched = findMatchingProductOption(productName);
    if (matched) {
      setSelectedInquiryProduct(matched);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection
          onSelectProductForQuote={handleSelectProductForQuote}
        />
        <ExporterAndGallerySection />
        <ClientsAndTestimonialsSection />
        <ContactSection selectedProduct={selectedInquiryProduct} />
      </main>
      <Footer />
    </div>
  );
}
