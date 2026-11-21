import { useState } from 'react';
import { Download } from 'lucide-react';
import { ASSETS, NAV_LINKS, PLANT_CONTACT } from '../data/catalog';
import { downloadBrochurePdf } from '../utils/brochureDownload';
import { SafeImage } from './SafeImage';

export function Footer() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadBrochure = async () => {
    if (downloading) return;
    setDownloading(true);
    await downloadBrochurePdf('main');
    setDownloading(false);
  };
  return (
    <footer className="bg-charcoal-900 text-slate-300 py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <div
              data-testid="footer-logo-container"
              className="w-full max-w-[240px] rounded-lg overflow-hidden"
            >
              <SafeImage
                src={ASSETS.headerLogo}
                alt="Maa Adya Forge Logo"
                className="w-full h-auto block"
                fallbackTitle="Maa Adya Forge & Refractories"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier refractory bricks, castables, mortars, metal forgings, and
              precision automotive components engineered for industrial
              endurance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-amber-gold-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Plant Desk
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="leading-relaxed">{PLANT_CONTACT.address}</li>
              <li className="tabular-nums">{PLANT_CONTACT.helpline}</li>
              <li>{PLANT_CONTACT.emailOrders}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              Product Brochure
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Download our complete refractory &amp; forging catalog overview.
            </p>
            <button
              type="button"
              onClick={handleDownloadBrochure}
              disabled={downloading}
              data-testid="footer-download-brochure"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-terracotta-600 text-white text-xs font-semibold hover:bg-terracotta-500 disabled:opacity-70 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              <span>{downloading ? 'Downloading PDF...' : 'Download Brochure'}</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>&copy; 2026 Maa Adya Forge and Refractories. All rights reserved.</p>
          <p>Refractories · Industrial Forgings · Automotive Spares</p>
        </div>
      </div>
    </footer>
  );
}
