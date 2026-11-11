import placesAndEventsData from '../../../data/places_and_events.json';
import { getGoogleTypesForCategory } from '../categories/categories.service';
import { EditorialPlace, GooglePlaceResult, NearbySearchInput, NearbySearchResponse } from './types';

// Fórmula de Haversine para cálculo de distancia real en metros
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Radio de la Tierra en metros
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Cargar lugares editoriales propios de PlanCity
export function getEditorialPlaces(filters?: { cityId?: string; categoryId?: string }): EditorialPlace[] {
  const places: EditorialPlace[] = [];

  if (placesAndEventsData && Array.isArray(placesAndEventsData.places_and_events)) {
    const raw = placesAndEventsData.places_and_events.filter((p) => p.type !== 'evento');

    for (const item of raw) {
      const cityId = item.city === 'medellin' ? 'c1' : item.city === 'bogota' ? 'c2' : 'c3';

      if (filters?.cityId && filters.cityId !== 'todos' && cityId !== filters.cityId) {
        continue;
      }

      // Coordenadas aproximadas de referencia por zona (El Poblado, Laureles, etc.)
      const lat = item.city === 'medellin' ? 6.2088 : 4.6533;
      const lng = item.city === 'medellin' ? -75.5678 : -74.0836;

      places.push({
        id: item.id,
        name: item.title,
        description: item.description,
        cityId,
        category: item.category,
        address: item.address,
        coordinates: { lat, lng },
        image: item.image,
        price: item.price,
        rating: item.rating,
        reviewsCount: item.reviews_count,
        badge: item.badge,
        features: item.features,
        schedule: item.schedule ? item.schedule.replace('&bull;', '•') : undefined,
        source: 'plancity',
        status: 'published',
        lastVerifiedAt: '2026-11-10',
      });
    }
  }

  return places;
}

// Consultar el endpoint seguro de Next.js para Google Places
export async function searchNearbyPlaces(input: NearbySearchInput): Promise<NearbySearchResponse> {
  const { lat, lng, radiusMeters = 2500, categoryId } = input;
  const includedTypes = categoryId ? getGoogleTypesForCategory(categoryId) : undefined;

  try {
    const res = await fetch('/api/places/nearby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lat,
        lng,
        radius: radiusMeters,
        includedTypes,
        maxResultCount: 12,
      }),
    });

    if (!res.ok) {
      console.warn('Endpoint /api/places/nearby respondió con código:', res.status);
      return fallbackToEditorialPlaces(input);
    }

    const data = await res.json();
    const googlePlaces: GooglePlaceResult[] = (data.places || []).map((p: any) => ({
      ...p,
      distanceMeters: calculateDistanceMeters(lat, lng, p.coordinates.lat, p.coordinates.lng),
    }));

    // Si Google no está configurado o no devuelve resultados, incorporar lugares editoriales
    if (googlePlaces.length === 0) {
      return fallbackToEditorialPlaces(input, data.isConfigured, data.message);
    }

    return {
      places: googlePlaces,
      isGoogleConfigured: data.isConfigured,
      message: data.message,
    };
  } catch (err) {
    console.error('Error al consultar lugares cercanos:', err);
    return fallbackToEditorialPlaces(input);
  }
}

function fallbackToEditorialPlaces(
  input: NearbySearchInput,
  isConfigured = false,
  message?: string
): NearbySearchResponse {
  const editorial = getEditorialPlaces();
  const sorted = editorial.map((place) => {
    const dist = place.coordinates
      ? calculateDistanceMeters(input.lat, input.lng, place.coordinates.lat, place.coordinates.lng)
      : undefined;
    return { ...place, distanceMeters: dist };
  });

  return {
    places: sorted,
    isGoogleConfigured: isConfigured,
    message: message || 'Mostrando lugares seleccionados por el equipo PlanCity.',
  };
}
