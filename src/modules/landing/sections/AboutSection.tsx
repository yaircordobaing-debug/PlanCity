import React from 'react';
import { EDITORIAL_CONTENT } from '../../editorial-content';

export const AboutSection: React.FC = () => {
  const { about, privacyNotice } = EDITORIAL_CONTENT;

  return (
    <section id="sobre-nosotros" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
            Identidad & Misión
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            {about.title}
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4">
            {about.summary}
          </p>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
            {about.mission}
          </p>

          {/* Bloque de Privacidad */}
          <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-4">
            <div className="h-9 w-9 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <i className="fa-solid fa-lock text-sm"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
                Compromiso de Privacidad
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {privacyNotice}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 text-center max-w-sm w-full">
            <img
              src="/assets/plancity-isotype.svg"
              alt="PlanCity Isotipo"
              className="h-20 w-auto mx-auto mb-6"
            />
            <h4 className="text-lg font-black text-white mb-1">
              Plan<span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">City</span>
            </h4>
            <p className="text-xs text-zinc-400 mb-6">
              Plataforma de Descubrimiento Urbano
            </p>
            <div className="py-3 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
              <span className="text-purple-400 font-semibold">Versión 2.0</span> • Colombia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
