import React from 'react';
import { EDITORIAL_CONTENT } from '../../editorial-content';

export const HowItWorksSection: React.FC = () => {
  const { howItWorks } = EDITORIAL_CONTENT;

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
          Paso a Paso
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cómo Funciona PlanCity
        </h3>
        <p className="mt-4 text-base text-zinc-400">
          Tres pasos sencillos para salir de la rutina y vivir tu ciudad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {howItWorks.map((item) => (
          <div
            key={item.step}
            className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800"
          >
            {/* Número de paso con gradiente */}
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-orange-500 flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-purple-900/40">
              {item.step}
            </div>

            <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
