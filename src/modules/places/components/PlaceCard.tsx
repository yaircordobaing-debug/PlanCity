import React from 'react';
import { PlaceItem } from '../types';

interface PlaceCardProps {
  place: PlaceItem;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, isSelected, onSelect }) => {
  const isGoogle = place.source === 'google';
  const directionsUrl = isGoogle
    ? place.googleMapsUri
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${place.name} ${place.address}`
      )}`;

  const distanceText =
    typeof place.distanceMeters === 'number'
      ? place.distanceMeters < 1000
        ? `${place.distanceMeters} m`
        : `${(place.distanceMeters / 1000).toFixed(1)} km`
      : null;

  const reviewCount = isGoogle ? place.userRatingCount : place.reviewsCount;

  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-xl p-4 transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'bg-zinc-800/95 border-purple-500 shadow-lg shadow-purple-900/30 ring-1 ring-purple-500'
          : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850'
      }`}
    >
      <div>
        {/* Cabecera con Badge de Origen y Distancia */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {isGoogle ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 border border-blue-500/30">
              <i className="fa-brands fa-google text-[10px]"></i>
              <span>Google Places</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-purple-300 border border-purple-500/30">
              <i className="fa-solid fa-sparkles text-[10px] text-fuchsia-400"></i>
              <span>PlanCity Recomendado</span>
            </span>
          )}

          {distanceText && (
            <span className="text-[11px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md">
              <i className="fa-solid fa-person-walking mr-1 text-purple-400 text-[10px]"></i>
              {distanceText}
            </span>
          )}
        </div>

        {/* Título */}
        <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
          {place.name}
        </h4>

        {/* Dirección */}
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
          <i className="fa-solid fa-location-dot mr-1 text-zinc-500 text-[10px]"></i>
          {place.address}
        </p>

        {/* Rating si existe */}
        {place.rating !== null && place.rating !== undefined && (
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              <i className="fa-solid fa-star text-[11px] mr-1"></i>
              <span className="font-bold text-white">{place.rating.toFixed(1)}</span>
            </div>
            {reviewCount ? (
              <span className="text-zinc-500 text-[11px]">
                ({reviewCount.toLocaleString('es-CO')} reseñas)
              </span>
            ) : null}
          </div>
        )}

        {/* Descripción para editorial */}
        {'description' in place && place.description && (
          <p className="mt-2 text-xs text-zinc-400 line-clamp-2 italic">
            &ldquo;{place.description}&rdquo;
          </p>
        )}
      </div>

      {/* Botón de Cómo llegar */}
      <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
        <span className="text-[11px] text-zinc-500 capitalize">
          {'primaryType' in place
            ? place.primaryType.replace(/_/g, ' ')
            : 'category' in place
            ? place.category
            : 'Punto de interés'}
        </span>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
        >
          <span>Cómo llegar</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-purple-400"></i>
        </a>
      </div>
    </div>
  );
};
