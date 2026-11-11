import React from 'react';
import Link from 'next/link';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-8 sm:p-14 text-center">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Tu próximo plan puede estar más cerca de lo que crees.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Comienza a explorar eventos, restaurantes de autor y planes en vivo en tu ciudad ahora mismo.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 px-9 py-4 text-base font-bold text-white shadow-xl shadow-purple-900/40 hover:opacity-95 transition-all hover:scale-105"
            >
              <i className="fa-solid fa-compass"></i>
              <span>Explorar PlanCity</span>
            </Link>

            <Link
              href="/app.html"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              O probar el prototipo ligero (/app.html)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
