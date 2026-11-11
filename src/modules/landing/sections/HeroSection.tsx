'use client';

import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Luz ambiental de fondo con los tonos oficiales púrpura y fucsia */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-900/30 via-fuchsia-900/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Columna Izquierda: Mensaje & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Pill / Badge oficial */}
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 animate-pulse" />
            <span>Descubrimiento urbano sin registro</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Tu ciudad tiene más planes de los que{' '}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              imaginas.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Descubre eventos, restaurantes, lugares increíbles y experiencias cerca de ti. Encuentra qué hacer y vive tu ciudad de otra manera.
          </p>

          {/* Grupo de Acciones / CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-900/30 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <i className="fa-solid fa-compass"></i>
              <span>Explorar PlanCity</span>
            </Link>

            <a
              href="#cercanos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-zinc-500 px-7 py-4 text-base font-semibold text-zinc-200 hover:text-white transition-all hover:bg-zinc-800"
            >
              <i className="fa-solid fa-location-crosshairs text-purple-400"></i>
              <span>Descubrir lugares cercanos</span>
            </a>
          </div>

          {/* Badges de Garantía */}
          <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-purple-400 text-sm"></i>
              <span>Curaduría editorial verificada</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-fuchsia-400 text-sm"></i>
              <span>Acceso directo sin registro</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-emerald-400 text-sm"></i>
              <span>Privacidad garantizada</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Mockup & Composición Visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

            {/* Contenedor del Mockup */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
              <img
                src="/assets/insightlancer-mockup.png"
                alt="PlanCity Interfaz Móvil"
                className="w-full h-auto rounded-2xl object-cover"
                loading="eager"
              />

              {/* Tarjeta Flotante con Evento Destacado */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 p-4 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <i className="fa-solid fa-sparkles text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Plan Destacado
                  </span>
                  <p className="text-xs font-bold text-white truncate">
                    Concierto de Jazz & Bossa Nova
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">
                    Provenza • El Poblado, Medellín
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/20">
                  $40k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
