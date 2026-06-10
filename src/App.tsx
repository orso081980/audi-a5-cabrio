import { CarProvider } from './contexts/CarContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { StatsBar } from './components/sections/StatsBar';
import { WhySellSection } from './components/sections/WhySellSection';
import { Specs } from './components/sections/Specs';
import { Features } from './components/sections/Features';
import { Gallery } from './components/sections/Gallery';
import { Condition } from './components/sections/Condition';
import { Contact } from './components/sections/Contact';

/**
 * App — Controller layer.
 * Composes layout + sections, providing the CarContext and LanguageContext to the entire tree.
 */
export default function App() {
  return (
    <LanguageProvider>
      <CarProvider>
        <div className="min-h-screen bg-brand-black text-brand-white font-sans">
          <Navbar />
          <main>
            <Hero />
            <StatsBar />
            <WhySellSection />
            <Specs />
            <Features />
            <Gallery />
            <Condition />
            <Contact />
          </main>
          <Footer />
        </div>
      </CarProvider>
    </LanguageProvider>
  );
}
