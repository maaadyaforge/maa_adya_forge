import { Landmark } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { SafeImage } from './SafeImage';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-slate-50 relative overflow-hidden font-['Inter',sans-serif]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <SafeImage
                src={ASSETS.aboutLegacyHistory}
                alt="Six Decades of Industrial Excellence Timeline"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 block"
                fallbackTitle="Six Decades of Industrial Excellence"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-700 text-xs font-bold tracking-wider uppercase border border-terracotta-200">
              <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Our Legacy &amp; History</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
              Six Decades of Industrial Experience and Excellence
            </h2>

            <p className="text-slate-700 leading-relaxed text-sm">
              The story of Maa Adya Forge is built on a rich industrial heritage
              spanning more than six decades. What began with fireclay mining in
              1960 has evolved through refractory manufacturing and, more
              recently, into forging and automotive component production. Over
              the years, each phase of our journey has strengthened our
              industrial expertise, expanded our manufacturing capabilities, and
              reinforced our commitment to meeting the changing needs of the
              industry.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-800">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-terracotta-700">
                  1960 | The Foundation:
                </span>{' '}
                First fireclay mine established, laying the raw-material sector
                foundation.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-terracotta-700">
                  1975 | Growth:
                </span>{' '}
                Establishment of our second fireclay mine, deepening our raw
                material supply role.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-terracotta-700">
                  1990 | Manufacturing:
                </span>{' '}
                Established our first refractory unit under{' '}
                <span className="font-semibold">Jai Mahadev Fire Bricks</span>.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                <span className="font-bold text-terracotta-700">
                  2020–2025 | Diversification:
                </span>{' '}
                Expanded into metal forging via{' '}
                <span className="font-semibold">Mahadev Forge</span>,
                specializing in parts for Tata Motors.
              </div>
            </div>

            <p className="text-slate-800 leading-relaxed text-sm font-medium italic">
              &ldquo;Maa Adya Forge — Rooted in Heritage. Driven by Industry.
              Focused on the Future.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
