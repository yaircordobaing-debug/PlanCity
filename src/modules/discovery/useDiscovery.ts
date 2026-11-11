'use client';

import { useState, useCallback } from 'react';
import { PlaceItem } from '../places/types';
import { searchNearbyPlaces } from '../places/places.service';
import { Coordinates } from '../geolocation/types';
import { getDefaultCity } from '../cities/cities.service';

export function useDiscovery() {
  const defaultCity = getDefaultCity();

  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('todos');
  const [radiusMeters, setRadiusMeters] = useState<number>(3000);
  const [centerCoordinates, setCenterCoordinates] = useState<Coordinates>(defaultCity.coordinates);
  const [isGoogleConfigured, setIsGoogleConfigured] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  const executeSearch = useCallback(
    async (coords: Coordinates, categoryId = activeCategoryId, radius = radiusMeters) => {
      setIsLoading(true);
      setStatusMessage(undefined);
      try {
        const response = await searchNearbyPlaces({
          lat: coords.lat,
          lng: coords.lng,
          radiusMeters: radius,
          categoryId: categoryId === 'todos' ? undefined : categoryId,
        });

        setPlaces(response.places);
        setIsGoogleConfigured(response.isGoogleConfigured);
        if (response.message) {
          setStatusMessage(response.message);
        }
        if (response.places.length > 0) {
          setSelectedPlaceId(response.places[0].id);
        } else {
          setSelectedPlaceId(null);
        }
      } catch (err) {
        console.error('Error en búsqueda de descubrimiento:', err);
        setStatusMessage('No fue posible completar la búsqueda en este momento.');
      } finally {
        setIsLoading(false);
      }
    },
    [activeCategoryId, radiusMeters]
  );

  const changeCategory = useCallback(
    (newCategory: string) => {
      setActiveCategoryId(newCategory);
      executeSearch(centerCoordinates, newCategory, radiusMeters);
    },
    [centerCoordinates, executeSearch, radiusMeters]
  );

  const changeRadius = useCallback(
    (newRadius: number) => {
      setRadiusMeters(newRadius);
      executeSearch(centerCoordinates, activeCategoryId, newRadius);
    },
    [activeCategoryId, centerCoordinates, executeSearch]
  );

  const updateCenter = useCallback(
    (newCoords: Coordinates) => {
      setCenterCoordinates(newCoords);
      executeSearch(newCoords, activeCategoryId, radiusMeters);
    },
    [activeCategoryId, executeSearch, radiusMeters]
  );

  return {
    isLoading,
    places,
    selectedPlaceId,
    setSelectedPlaceId,
    activeCategoryId,
    radiusMeters,
    centerCoordinates,
    isGoogleConfigured,
    statusMessage,
    executeSearch,
    changeCategory,
    changeRadius,
    updateCenter,
  };
}
