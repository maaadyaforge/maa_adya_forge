import { Star } from 'lucide-react';
import { ESTEEMED_CLIENTS, TESTIMONIALS } from '../data/catalog';
import { ClientLogo } from './ClientLogo';

export function ClientsAndTestimonialsSection() {
  return (
    <>
      {/* Esteemed Clients */}
      <section
        id="clients"
        className="py-20 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
              Our Esteemed Clients · Enterprise Partners
            </p>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Trusted by Industrial Giants
            </h2>
            <p className="text-slate-600 text-sm">
              Proudly supplying precision components and refractory linings to
              leading nation-building enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ESTEEMED_CLIENTS.map((client) => (
              <div
                key={client.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center justify-center"
              >
                <ClientLogo id={client.id} name={client.name} />
                <div className="font-semibold text-slate-900 text-sm">
                  {client.name}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {client.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold text-terracotta-700 tracking-wide mb-2">
              Client Trust · Verified Feedback
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-3">
              Trusted by Leading Builders &amp; Architects
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              See what industry professionals say about our structural product
              quality and timely plant dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="flex text-amber-gold-500 gap-1 mb-4"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-amber-gold-500 text-amber-gold-500"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <footer className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                  <div
                    className={`w-11 h-11 rounded-full font-bold flex items-center justify-center text-sm shrink-0 ${item.avatarTone}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500">{item.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
