'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PlaceItem } from '../../places/types';
import { loadGoogleMapsSdk } from '../maps-loader';

interface NearbyMapProps {
  center: { lat: number; lng: number };
  places: PlaceItem[];
  selectedPlaceId: string | null;
  onSelectPlace: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
}

export const NearbyMap: React.FC<NearbyMapProps> = ({
  center,
  places,
  selectedPlaceId,
  onSelectPlace,
  userLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  const [hasSdk, setHasSdk] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadGoogleMapsSdk().then((success) => {
      if (isMounted) setHasSdk(success);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Inicializar mapa real cuando el SDK esté disponible
  useEffect(() => {
    if (!hasSdk || !mapContainerRef.current || !(window as any).google?.maps) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new (window as any).google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 14,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#18181b' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#18181b' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#a1a1aa' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#27272a' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#09090b' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        ],
      });
    } else {
      mapInstanceRef.current.setCenter(center);
    }
  }, [hasSdk, center]);

  // Actualizar marcadores
  useEffect(() => {
    if (!hasSdk || !mapInstanceRef.current || !(window as any).google?.maps) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // Marcador de usuario
    if (userLocation) {
      if (userMarkerRef.current) userMarkerRef.current.setMap(null);
      userMarkerRef.current = new (window as any).google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: 'Tu ubicación actual',
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#a855f7',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
    }

    // Marcadores de lugares
    places.forEach((p) => {
      if (!p.coordinates || !p.coordinates.lat || !p.coordinates.lng) return;
      const isSelected = p.id === selectedPlaceId;

      const marker = new (window as any).google.maps.Marker({
        position: p.coordinates,
        map: mapInstanceRef.current,
        title: p.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: isSelected ? 6 : 4.5,
          fillColor: isSelected ? '#ec4899' : '#8b5cf6',
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 1.5,
        },
      });

      marker.addListener('click', () => {
        onSelectPlace(p.id);
      });

      markersRef.current.push(marker);
    });
  }, [hasSdk, places, selectedPlaceId, userLocation, onSelectPlace]);

  if (hasSdk === false) {
    // Fallback visual elegante cuando no hay clave pública de Google Maps configurada
    return (
      <div className="relative flex flex-col items-center justify-center h-full min-h-[360px] rounded-2xl bg-zinc-950 border border-zinc-800 p-6 text-center overflow-hidden">
        {/* Gráfico decorativo de radar */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-96 h-96 rounded-full border border-purple-500 animate-ping"></div>
          <div className="w-64 h-64 rounded-full border border-purple-400 absolute"></div>
          <div className="w-32 h-32 rounded-full border border-purple-300 absolute"></div>
        </div>

        <div className="relative z-10 max-w-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400">
            <i className="fa-solid fa-map-location-dot text-xl"></i>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">
            Exploración de Puntos de Interés
          </h4>
          <p className="text-xs text-zinc-400 mb-4">
            Se encontraron <strong className="text-purple-300">{places.length} lugares</strong> cerca de estas coordenadas. Puedes explorarlos directamente desde la lista lateral con indicación en Google Maps.
          </p>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[11px] text-zinc-400 border border-zinc-800">
            <i className="fa-solid fa-circle-info text-purple-400"></i>
            <span>Google Maps SDK listo para asociar clave pública</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px]" />
      
      {/* Attribution overlay */}
      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 rounded-md bg-zinc-950/80 px-2 py-1 text-[10px] text-zinc-400 backdrop-blur-sm border border-zinc-800">
        <i className="fa-brands fa-google text-zinc-300"></i>
        <span>Google Maps Platform</span>
      </div>
    </div>
  );
};
