import React from 'react';
import Link from 'next/link';
import { getFeaturedEvents, EventCard } from '../../events';

export const FeaturedEventsSection: React.FC = () => {
  const events = getFeaturedEvents(6);

  return (
    <section id="eventos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/60 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30 mb-2">
            <i className="fa-solid fa-sparkles text-[10px] text-fuchsia-400"></i>
            <span>Curaduría PlanCity</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Eventos y Experiencias Destacadas
          </h3>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Seleccionados, investigados y organizados directamente por el equipo editorial.
          </p>
        </div>

        <Link
          href="/explore"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>Ver todos los eventos</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            No hay eventos editoriales publicados en este momento. Vuelve pronto para nuevas fechas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};
