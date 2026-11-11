'use client';

import { useState, useCallback } from 'react';
import { Coordinates, GeolocationState } from './types';
import { City } from '../cities/types';

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coordinates: null,
    errorMessage: null,
    isManualFallback: false,
  });

  const requestPosition = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setState({
        status: 'unavailable',
        coordinates: null,
        errorMessage: 'La geolocalización no está soportada por tu navegador.',
        isManualFallback: false,
      });
      return;
    }

    setState({
      status: 'requesting',
      coordinates: null,
      errorMessage: null,
      isManualFallback: false,
    });

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setState({
          status: 'success',
          coordinates: coords,
          errorMessage: null,
          isManualFallback: false,
        });
      },
      (error) => {
        let status: GeolocationState['status'] = 'error';
        let message = 'No pudimos obtener tu ubicación actual.';

        if (error.code === error.PERMISSION_DENIED) {
          status = 'denied';
          message =
            'Permiso denegado. Puedes seleccionar tu ciudad manualmente para descubrir lugares.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          status = 'unavailable';
          message = 'La señal de ubicación no está disponible en este momento.';
        } else if (error.code === error.TIMEOUT) {
          status = 'timeout';
          message = 'Se agotó el tiempo de espera para obtener la ubicación.';
        }

        setState({
          status,
          coordinates: null,
          errorMessage: message,
          isManualFallback: false,
        });
      },
      options
    );
  }, []);

  const setManualCity = useCallback((city: City) => {
    setState({
      status: 'success',
      coordinates: city.coordinates,
      errorMessage: null,
      isManualFallback: true,
      selectedCityName: city.name,
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      coordinates: null,
      errorMessage: null,
      isManualFallback: false,
    });
  }, []);

  return {
    ...state,
    requestPosition,
    setManualCity,
    reset,
  };
}
