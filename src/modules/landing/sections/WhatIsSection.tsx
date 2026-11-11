import React from 'react';
import { EDITORIAL_CONTENT } from '../../editorial-content';

export const WhatIsSection: React.FC = () => {
  const { whatIs } = EDITORIAL_CONTENT;

  return (
    <section id="que-es" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
          Propuesta de Valor
        </h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {whatIs.title}
        </h3>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
          {whatIs.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {whatIs.highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-inner">
              <i className={`${item.icon} text-lg`}></i>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
