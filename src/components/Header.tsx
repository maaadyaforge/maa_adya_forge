import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS, NAV_LINKS } from '../data/catalog';
import { SafeImage } from './SafeImage';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto h-20 lg:h-28 flex items-stretch justify-between lg:justify-center lg:gap-8 xl:gap-12 px-2 sm:px-4 lg:px-8 bg-white">
        {/* Website Logo shifted right on desktop to sit cleanly beside Home */}
        <a
          href="#home"
          aria-label="Maa Adya Forge and Refractories Home"
          data-testid="header-logo-link"
          className="relative flex-1 lg:flex-initial min-w-0 h-full overflow-hidden flex items-center justify-start lg:justify-end bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-terracotta-600"
        >
          <SafeImage
            src={ASSETS.headerLogo}
            alt="Maa Adya Forge Logo"
            className="h-[124%] w-auto max-w-full object-contain object-left lg:object-right translate-y-[2%] block"
            fallbackTitle="Maa Adya Forge & Refractories"
          />
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0 bg-white"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-700 hover:text-terracotta-600 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-terracotta-600 text-white font-semibold text-sm hover:bg-terracotta-700 transition-colors whitespace-nowrap shrink-0"
          >
            Get Quote
          </a>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center px-3 shrink-0 bg-white">
          <button
            type="button"
            id="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-11 h-11 rounded-lg flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-white border-t border-slate-200 px-6 py-5 space-y-3 shadow-lg"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-semibold text-slate-800 hover:text-terracotta-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center py-3 rounded-lg bg-terracotta-600 text-white font-semibold hover:bg-terracotta-700 transition-colors"
          >
            Get Quote
          </a>
        </nav>
      )}
    </header>
  );
}
