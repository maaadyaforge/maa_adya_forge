import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EXPORT_DESTINATIONS, GALLERY_ITEMS } from '../data/catalog';
import { CountryFlag } from './CountryFlag';
import { SafeImage } from './SafeImage';

export function ExporterAndGallerySection() {
  const exportRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (
    ref: React.RefObject<HTMLDivElement | null>,
    distance: number
  ) => {
    ref.current?.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <>
      {/* Global Exporter Section */}
      <section
        id="exporter"
        className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
                Global Footprint · International Supply
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
                Trusted International Exporter
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Supplying high-grade refractories and industrial forgings across
                international borders.
              </p>
            </div>
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollTrack(exportRef, -290)}
                aria-label="Scroll export destinations left"
                data-testid="exporter-scroll-left"
                className="w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(exportRef, 290)}
                aria-label="Scroll export destinations right"
                data-testid="exporter-scroll-right"
                className="w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={exportRef}
            data-testid="exporter-track"
            className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible gap-5 no-scrollbar scroll-smooth snap-x snap-mandatory lg:snap-none pb-2"
          >
            {EXPORT_DESTINATIONS.map((dest) => (
              <article
                key={dest.country}
                className="min-w-[85%] sm:min-w-[300px] lg:min-w-0 w-full bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shrink-0 snap-start"
              >
                <div>
                  <div className="mb-4">
                    <CountryFlag code={dest.flagCode} country={dest.country} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-1.5">
                    {dest.country}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>
                <p className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-terracotta-700">
                  Active Route
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Factory & Product Gallery Section */}
      <section
        id="gallery"
        className="py-20 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
                Visual Showcase · Plant &amp; Production
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
                Factory &amp; Product Gallery
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Explore our refractory pressing lines, testing labs, and
                finished forged steel components.
              </p>
            </div>
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollTrack(galleryRef, -320)}
                aria-label="Scroll gallery left"
                className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(galleryRef, 320)}
                aria-label="Scroll gallery right"
                className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-terracotta-600 hover:text-white hover:border-terracotta-600 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible gap-5 no-scrollbar scroll-smooth pb-2"
          >
            {GALLERY_ITEMS.map((item) => (
              <figure
                key={item.id}
                className="min-w-[280px] sm:min-w-[300px] lg:min-w-0 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shrink-0 group"
              >
                <div className="h-52 overflow-hidden bg-slate-200">
                  <SafeImage
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
