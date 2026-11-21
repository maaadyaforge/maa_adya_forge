import { useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Cog,
  Download,
  Flame,
  Hammer,
  X,
} from 'lucide-react';
import {
  AUTOMOTIVE_PRODUCTS,
  FORGING_PRODUCTS,
  REFRACTORY_CATEGORIES,
  type RefractoryCategoryKey,
} from '../data/catalog';
import { downloadBrochurePdf } from '../utils/brochureDownload';
import { getSubProductsByCategory } from '../utils/inquiry';
import { SafeImage } from './SafeImage';

interface ProductsSectionProps {
  onSelectProductForQuote: (productName: string) => void;
}

export function ProductsSection({
  onSelectProductForQuote,
}: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<RefractoryCategoryKey | null>(null);
  const [downloadingCastables, setDownloadingCastables] = useState(false);

  const handleDownloadCastables = async () => {
    if (downloadingCastables) return;
    setDownloadingCastables(true);
    await downloadBrochurePdf('castables');
    setDownloadingCastables(false);
  };

  const refractoriesRef = useRef<HTMLDivElement>(null);
  const forgingRef = useRef<HTMLDivElement>(null);
  const automotiveRef = useRef<HTMLDivElement>(null);
  const subTilesRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    distance: number
  ) => {
    ref.current?.scrollBy({ left: distance, behavior: 'smooth' });
  };

  const handleToggleCategory = (key: RefractoryCategoryKey) => {
    setActiveCategory((prev) => (prev === key ? null : key));
    requestAnimationFrame(() => {
      subTilesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  };

  const selectedCategoryData = activeCategory
    ? getSubProductsByCategory(activeCategory)
    : undefined;

  return (
    <section
      id="products"
      className="py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
            Our Product Portfolio · Three Industrial Divisions
          </p>
          <h2
            className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3"
            style={{ textWrap: 'balance' }}
          >
            Refractories, Forging &amp; Automotive Spares
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Click &ldquo;View sub-products&rdquo; inside any Refractories
            category below to inspect individual grades and request a direct
            plant quotation.
          </p>
        </div>

        {/* 01. Refractories Division */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta-600 text-white flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  01. Refractories Division
                </h3>
              </div>
            </div>
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack(refractoriesRef, -280)}
                aria-label="Scroll refractories left"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(refractoriesRef, 280)}
                aria-label="Scroll refractories right"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={refractoriesRef}
            className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-5 lg:gap-6 no-scrollbar scroll-smooth pb-2"
          >
            {REFRACTORY_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category.key;
              return (
                <article
                  key={category.key}
                  data-testid={`refractory-card-${category.key}`}
                  className={`text-left min-w-[270px] sm:min-w-[300px] lg:min-w-0 w-full rounded-2xl overflow-hidden border transition-colors flex flex-col justify-between shrink-0 ${
                    isSelected
                      ? 'bg-terracotta-50/60 border-terracotta-600'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="h-44 overflow-hidden bg-slate-200">
                      <SafeImage
                        src={category.img}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5 pb-3">
                      <p className="text-xs text-slate-500 mb-1">
                        Refractory · {category.items.length} grades
                      </p>
                      <h4 className="text-base font-bold text-slate-900 mb-1.5">
                        {category.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {category.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(category.key)}
                      aria-expanded={isSelected}
                      aria-label={`${isSelected ? 'Hide' : 'View'} sub-products for ${category.title}`}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-terracotta-600 text-white hover:bg-terracotta-700'
                          : 'bg-white text-terracotta-700 border border-terracotta-200 hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600'
                      }`}
                    >
                      <span>
                        {isSelected ? 'Hide sub-products' : 'View sub-products'}
                      </span>
                      <ArrowDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSelected ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {category.key === 'castables' && (
                      <button
                        type="button"
                        onClick={handleDownloadCastables}
                        disabled={downloadingCastables}
                        data-testid="castables-download-brochure"
                        aria-label="Download Brochure for Castables"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-charcoal-900 text-white hover:bg-terracotta-600 disabled:opacity-70 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {downloadingCastables
                            ? 'Downloading...'
                            : 'Download Brochure'}
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Expandable Sub-Product Tiles Panel */}
          {selectedCategoryData && (
            <div
              ref={subTilesRef}
              data-testid="sub-tile-container"
              className="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs text-slate-500">
                    Refractories Division · {selectedCategoryData.items.length}{' '}
                    items
                  </p>
                  <h4 className="text-xl font-serif font-bold text-slate-900">
                    {selectedCategoryData.collectionTitle}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white px-3.5 py-2 rounded-lg border border-slate-200 cursor-pointer"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div
                data-testid="sub-tile-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {selectedCategoryData.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-40 overflow-hidden bg-slate-200">
                        <SafeImage
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] font-mono text-terracotta-700 mb-1">
                          {item.grade} · Max {item.tempRating}
                        </p>
                        <h5 className="text-sm font-semibold text-slate-900 leading-snug">
                          {item.name}
                        </h5>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <a
                        href="#contact"
                        onClick={() => onSelectProductForQuote(item.name)}
                        className="w-full py-2 px-3 bg-terracotta-50 text-terracotta-700 rounded-lg text-xs font-semibold hover:bg-terracotta-600 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 02. Forging Division */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-gold-400 flex items-center justify-center shrink-0">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                02. Forging Division
              </h3>
            </div>
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack(forgingRef, -280)}
                aria-label="Scroll forging products left"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(forgingRef, 280)}
                aria-label="Scroll forging products right"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={forgingRef}
            className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-5 lg:gap-6 no-scrollbar scroll-smooth pb-2"
          >
            {FORGING_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="min-w-[270px] sm:min-w-[300px] lg:min-w-0 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="h-44 overflow-hidden bg-slate-200">
                    <SafeImage
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 mb-1">
                      {product.division} Division
                    </p>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {product.name}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <dl className="divide-y divide-slate-200 border-t border-slate-200 pt-2 text-xs">
                      {product.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between py-1.5"
                        >
                          <dt className="text-slate-500">{spec.label}</dt>
                          <dd className="font-semibold text-slate-900">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <a
                    href="#contact"
                    onClick={() => onSelectProductForQuote(product.name)}
                    className="w-full py-2 px-3 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-semibold hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 03. Automotive Spares */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-gold-500 text-slate-950 flex items-center justify-center shrink-0">
                <Cog className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                03. Automotive Spares
              </h3>
            </div>
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack(automotiveRef, -280)}
                aria-label="Scroll automotive spares left"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(automotiveRef, 280)}
                aria-label="Scroll automotive spares right"
                className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={automotiveRef}
            className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible gap-5 no-scrollbar scroll-smooth pb-2"
          >
            {AUTOMOTIVE_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="min-w-[260px] sm:min-w-[280px] lg:min-w-0 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between shrink-0"
              >
                <div>
                  <div className="h-40 overflow-hidden bg-slate-200">
                    <SafeImage
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 mb-1">
                      {product.division} OEM Spares
                    </p>
                    <h4 className="text-base font-bold text-slate-900 mb-1.5">
                      {product.name}
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <dl className="divide-y divide-slate-200 border-t border-slate-200 pt-2 text-xs">
                      {product.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between py-1.5"
                        >
                          <dt className="text-slate-500">{spec.label}</dt>
                          <dd className="font-semibold text-slate-900">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <a
                    href="#contact"
                    onClick={() => onSelectProductForQuote(product.name)}
                    className="w-full py-2 px-3 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-semibold hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
