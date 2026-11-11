'use client';

import React, { useState, useEffect } from 'react';
import { useGeolocation } from '../../geolocation';
import { useDiscovery } from '../useDiscovery';
import { getCategories } from '../../categories';
import { getCities, getDefaultCity } from '../../cities';
import { PlaceCard } from '../../places';
import { NearbyMap } from '../../maps';

export const DiscoverySection: React.FC = () => {
  const geo = useGeolocation();
  const discovery = useDiscovery();
  const categories = getCategories().filter((c) => !c.isEditorialOnly);
  const cities = getCities();

  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(getDefaultCity().id);

  // Cuando el usuario acepta geolocalización
  const handleRequestLocation = () => {
    geo.requestPosition();
  };

  useEffect(() => {
    if (geo.status === 'success' && geo.coordinates) {
      discovery.updateCenter(geo.coordinates);
      setHasSearched(true);
    }
  }, [geo.status, geo.coordinates]);

  // Manejo de selección manual de ciudad
  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    const city = cities.find((c) => c.id === cityId);
    if (city) {
      geo.setManualCity(city);
      discovery.updateCenter(city.coordinates);
      setHasSearched(true);
    }
  };

  return (
    <section id="cercanos" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Encabezado de la sección */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/60 px-4 py-1.5 text-xs font-semibold text-purple-300 border border-purple-500/30 mb-4">
          <i className="fa-solid fa-location-crosshairs text-fuchsia-400"></i>
          <span>Descubrimiento Hiperlocal</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hay lugares increíbles a pocos minutos de ti
        </h2>

        <p className="mt-3 text-base sm:text-lg text-zinc-400">
          Encuentra restaurantes, cafeterías de autor, sitios turísticos y espacios de interés cerca de tu ubicación.
        </p>

        {/* Barra de Acciones de Ubicación */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleRequestLocation}
            disabled={geo.status === 'requesting' || discovery.isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-900/30 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {geo.status === 'requesting' ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Obteniendo ubicación...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-location-arrow"></i>
                <span>Encontrar lugares cerca de mí</span>
              </>
            )}
          </button>

          {/* Selector de Ciudad Manual como alternativa */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-500 hidden sm:inline">o en:</span>
            <select
              value={selectedCityId}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full sm:w-auto rounded-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id} className="bg-zinc-900">
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensaje de estado o aviso de privacidad */}
        <div className="mt-4">
          {geo.status === 'denied' && (
            <p className="text-xs text-amber-400 flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-triangle-exclamation"></i>
              {geo.errorMessage}
            </p>
          )}
          {geo.status === 'idle' && (
            <p className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-zinc-400"></i>
              Tu ubicación solo se usa para calcular la distancia en este momento. No se almacena.
            </p>
          )}
          {geo.status === 'success' && (
            <p className="text-xs text-emerald-400 flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-circle-check"></i>
              {geo.isManualFallback
                ? `Explorando en ${geo.selectedCityName || 'ciudad seleccionada'}`
                : 'Ubicación obtenida con éxito'}
            </p>
          )}
        </div>
      </div>

      {/* Controles de Filtros: Categorías y Radio */}
      {(hasSearched || geo.status === 'success') && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          {/* Pills de categorías */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => discovery.changeCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  discovery.activeCategoryId === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                <i className={`${cat.icon} text-[10px]`}></i>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Selector de radio */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium">Radio:</span>
            {[1000, 3000, 5000].map((r) => (
              <button
                key={r}
                onClick={() => discovery.changeRadius(r)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  discovery.radiusMeters === r
                    ? 'bg-zinc-700 text-white border border-purple-500'
                    : 'bg-zinc-850 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {r / 1000} km
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contenido Principal: Lista + Mapa */}
      {(hasSearched || geo.status === 'success') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Columna Izquierda: Lista de Lugares */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[620px] overflow-y-auto pr-1">
            {discovery.isLoading ? (
              <div className="flex flex-col items-center justify-center p-12 text-zinc-400">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-purple-400 mb-2"></i>
                <span className="text-xs">Buscando lugares cercanos...</span>
              </div>
            ) : discovery.places.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400">
                <i className="fa-solid fa-map-pin text-2xl text-zinc-600 mb-2"></i>
                <p className="text-sm font-semibold text-white">No se encontraron lugares en este radio</p>
                <p className="text-xs text-zinc-500 mt-1">Prueba ampliando el radio a 5 km o cambiando de categoría.</p>
              </div>
            ) : (
              discovery.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSelected={place.id === discovery.selectedPlaceId}
                  onSelect={() => discovery.setSelectedPlaceId(place.id)}
                />
              ))
            )}

            {/* Aviso de atribución y fuente */}
            {discovery.statusMessage && (
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
                <i className="fa-solid fa-circle-info mr-1.5 text-purple-400"></i>
                {discovery.statusMessage}
              </div>
            )}
          </div>

          {/* Columna Derecha: Mapa Interactivo */}
          <div className="lg:col-span-7 h-[420px] lg:h-[620px] sticky top-24">
            <NearbyMap
              center={discovery.centerCoordinates}
              places={discovery.places}
              selectedPlaceId={discovery.selectedPlaceId}
              onSelectPlace={(id) => discovery.setSelectedPlaceId(id)}
              userLocation={geo.coordinates}
            />
          </div>
        </div>
      )}
    </section>
  );
};
