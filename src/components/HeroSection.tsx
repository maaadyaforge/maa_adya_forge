import { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { downloadBrochurePdf } from '../utils/brochureDownload';

export function downloadBrochureFile() {
  void downloadBrochurePdf('main');
}

export function HeroSection() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadBrochure = async () => {
    if (downloading) return;
    setDownloading(true);
    await downloadBrochurePdf('main');
    setDownloading(false);
  };
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 lg:pt-28 bg-charcoal-950 overflow-hidden"
    >
      {/* Background Photography + Measured Contrast Scrim */}
      <img
        src={ASSETS.heroKiln}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/75 to-charcoal-950/55"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 w-full">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-amber-gold-400 mb-5">
            Refractory Bricks · Industrial Forgings · High-Temp Foundry Solutions
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            Maa Adya Forge &amp;{' '}
            <span className="text-amber-gold-400">Refractories</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 mb-10 leading-relaxed max-w-2xl">
            Delivering high-alumina refractory bricks, monolithic castables,
            industrial forgings, and precision automotive components engineered
            for extreme thermal endurance and global plant standards.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-terracotta-600 text-white font-semibold text-sm sm:text-base hover:bg-terracotta-500 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <button
              type="button"
              onClick={handleDownloadBrochure}
              disabled={downloading}
              data-testid="hero-download-brochure"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-charcoal-900/80 text-white font-semibold text-sm sm:text-base border border-slate-600 hover:bg-charcoal-800 hover:border-amber-gold-400 disabled:opacity-70 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-gold-400 mr-2" />
              <span>{downloading ? 'Downloading PDF...' : 'Download Brochure'}</span>
            </button>
          </div>

          {/* Quantified Legacy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-14 pt-8 border-t border-slate-700/80">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tabular-nums">
                60+
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Years of Industrial Legacy
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-gold-400 tabular-nums">
                100%
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Metallurgical &amp; Thermal QA
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tabular-nums">
                4+
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Active Export Nations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
