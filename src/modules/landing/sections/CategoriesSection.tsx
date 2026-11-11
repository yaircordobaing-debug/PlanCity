import React from 'react';
import Link from 'next/link';
import { getCategories } from '../../categories';

export const CategoriesSection: React.FC = () => {
  const categories = getCategories().filter((c) => c.id !== 'todos');

  return (
    <section id="categorias" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
            Exploración Temática
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Descubre tu ciudad por categorías
          </h3>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Elige la vibración del plan que estás buscando hoy.
          </p>
        </div>

        <Link
          href="/explore"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>Ver catálogo completo</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href="#cercanos"
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-850 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <i className={`${cat.icon} text-base`}></i>
                </div>
                {cat.badge && (
                  <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-950/60 border border-fuchsia-500/30 px-2 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {cat.name}
              </h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-500 group-hover:text-purple-400 transition-colors">
              <span>Explorar</span>
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform group-hover:translate-x-1"></i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
