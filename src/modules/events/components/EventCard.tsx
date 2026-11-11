import React from 'react';
import Link from 'next/link';
import { PlanCityEvent } from '../types';

interface EventCardProps {
  event: PlanCityEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-950/20">
      {/* Imagen & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

        {/* Badge Editorial Propio PlanCity */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30 backdrop-blur-md">
          <i className="fa-solid fa-sparkles text-[10px] text-fuchsia-400"></i>
          <span>PlanCity Editorial</span>
        </div>

        {/* Badge Precio / Gratis */}
        <div className="absolute top-3 right-3 rounded-full bg-zinc-900/90 px-3 py-1 text-xs font-bold text-white border border-white/10 backdrop-blur-md">
          {event.isFree ? (
            <span className="text-emerald-400 font-extrabold">Gratis</span>
          ) : (
            <span>{event.price}</span>
          )}
        </div>

        {/* Ciudad */}
        {event.cityName && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-zinc-300">
            <i className="fa-solid fa-location-dot text-purple-400 text-[11px]"></i>
            <span>{event.cityName}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <span>{event.category}</span>
          {event.scheduleText && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 normal-case">{event.scheduleText}</span>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Footer de Tarjeta con Lugar y CTA */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <span className="text-xs text-zinc-500 truncate max-w-[60%]">
            <i className="fa-solid fa-map-pin mr-1 text-zinc-400"></i>
            {event.venueName}
          </span>

          <Link
            href={`/event/${event.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
          >
            Ver detalles
            <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};
