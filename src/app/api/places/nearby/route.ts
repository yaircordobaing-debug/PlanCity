import { NextRequest, NextResponse } from 'next/server';
import { ALLOWED_GOOGLE_TYPES } from '@/modules/categories/categories.service';

interface NearbyRequestBody {
  lat: number;
  lng: number;
  radius?: number; // 500 a 5000 metros
  includedTypes?: string[];
  maxResultCount?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: NearbyRequestBody = await request.json();
    const { lat, lng, radius = 2500, includedTypes = ['restaurant', 'cafe', 'bar'], maxResultCount = 10 } = body;

    // 1. Validación de coordenadas
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json(
        { error: 'Las coordenadas latitud y longitud son requeridas y deben ser numéricas.' },
        { status: 400 }
      );
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: 'Las coordenadas provistas están fuera del rango geográfico válido.' },
        { status: 400 }
      );
    }

    // 2. Validación de radio y cantidad
    const validRadius = Math.max(500, Math.min(5000, Number(radius) || 2500));
    const validCount = Math.max(1, Math.min(20, Number(maxResultCount) || 10));

    // 3. Validación y sanitización estricta de tipos de Google
    const sanitizedTypes = Array.isArray(includedTypes)
      ? includedTypes.filter((t) => ALLOWED_GOOGLE_TYPES.has(t))
      : ['restaurant', 'bar'];

    const safeTypes = sanitizedTypes.length > 0 ? sanitizedTypes : ['restaurant', 'bar'];

    // 4. Lectura segura de la clave del servidor
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      // Estado informativo seguro si no está configurada la credencial en el servidor
      return NextResponse.json({
        places: [],
        source: 'google',
        isConfigured: false,
        message: 'Google Places API no está configurada aún en variables de entorno. Puedes agregar GOOGLE_PLACES_API_KEY para activar búsqueda en vivo.',
      });
    }

    // 5. Llamada a Places API (New) con FieldMask mínimo y estricto
    const googleEndpoint = 'https://places.googleapis.com/v1/places:searchNearby';
    const fieldMask = [
      'places.id',
      'places.displayName',
      'places.formattedAddress',
      'places.location',
      'places.primaryType',
      'places.types',
      'places.googleMapsUri',
      'places.rating',
      'places.userRatingCount',
    ].join(',');

    const googlePayload = {
      includedTypes: safeTypes,
      maxResultCount: validCount,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: validRadius,
        },
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const response = await fetch(googleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: JSON.stringify(googlePayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Google Places API Error]:', response.status, errorText);
      return NextResponse.json(
        {
          places: [],
          source: 'google',
          isConfigured: true,
          error: 'No se pudo consultar Google Places temporalmente.',
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawPlaces = data.places || [];

    // 6. Normalización sin exponer campos internos ni claves
    const normalizedPlaces = rawPlaces.map((p: any) => ({
      id: p.id,
      name: p.displayName?.text || 'Lugar sin nombre',
      address: p.formattedAddress || 'Dirección no disponible',
      coordinates: {
        lat: p.location?.latitude ?? 0,
        lng: p.location?.longitude ?? 0,
      },
      primaryType: p.primaryType || 'punto_de_interes',
      googleMapsUri: p.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName?.text || '')}`,
      rating: p.rating ?? null,
      userRatingCount: p.userRatingCount ?? null,
      source: 'google',
    }));

    return NextResponse.json({
      places: normalizedPlaces,
      source: 'google',
      isConfigured: true,
      count: normalizedPlaces.length,
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Tiempo de espera agotado al consultar el servicio de lugares.' },
        { status: 504 }
      );
    }
    console.error('[Nearby Places Route Error]:', error);
    return NextResponse.json(
      { error: 'Error interno al procesar la solicitud de lugares cercanos.' },
      { status: 500 }
    );
  }
}
