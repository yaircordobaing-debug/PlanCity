import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'todos',
    name: 'Todos',
    slug: 'todos',
    description: 'Explora toda la oferta de la ciudad sin filtros.',
    icon: 'fa-solid fa-compass',
    googlePlacesTypes: ['restaurant', 'cafe', 'bar', 'tourist_attraction', 'museum', 'park'],
  },
  {
    id: 'eventos',
    name: 'Eventos & Fiestas',
    slug: 'eventos',
    description: 'Festivales, conciertos en vivo y fiestas exclusivas.',
    icon: 'fa-solid fa-calendar-star',
    badge: 'Editorial',
    isEditorialOnly: true,
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    slug: 'gastronomia',
    description: 'Restaurantes de autor, cocina local y cafés gourmet.',
    icon: 'fa-solid fa-utensils',
    googlePlacesTypes: ['restaurant', 'cafe'],
  },
  {
    id: 'bares',
    name: 'Bares & Rooftops',
    slug: 'bares',
    description: 'Terrazas con vista panorámica, coctelería y vida nocturna.',
    icon: 'fa-solid fa-martini-glass-citrus',
    googlePlacesTypes: ['bar', 'night_club'],
  },
  {
    id: 'cultura',
    name: 'Cultura & Museos',
    slug: 'cultura',
    description: 'Galerías de arte, teatros, museos y centros históricos.',
    icon: 'fa-solid fa-landmark',
    googlePlacesTypes: ['museum', 'art_gallery'],
  },
  {
    id: 'musica',
    name: 'Música en Vivo',
    slug: 'musica',
    description: 'Ensambles de jazz, acústicos y escenarios independientes.',
    icon: 'fa-solid fa-music',
    isEditorialOnly: true,
  },
  {
    id: 'turismo',
    name: 'Turismo & Sitios',
    slug: 'turismo',
    description: 'Monumentos emblemáticos, miradores y tours urbanos.',
    icon: 'fa-solid fa-route',
    googlePlacesTypes: ['tourist_attraction', 'point_of_interest'],
  },
  {
    id: 'parques',
    name: 'Naturaleza & Parques',
    slug: 'parques',
    description: 'Senderos ecológicos, jardines botánicos y parques al aire libre.',
    icon: 'fa-solid fa-tree',
    googlePlacesTypes: ['park'],
  },
  {
    id: 'entretenimiento',
    name: 'Entretenimiento',
    slug: 'entretenimiento',
    description: 'Cines independientes, boleras, salas de escape y juegos.',
    icon: 'fa-solid fa-ticket',
    googlePlacesTypes: ['movie_theater', 'bowling_alley'],
  },
];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id === id || cat.slug === id);
}

// Tipos permitidos estrictamente por Google Places (New) para la validación del servidor
export const ALLOWED_GOOGLE_TYPES = new Set<string>([
  'restaurant',
  'cafe',
  'bar',
  'night_club',
  'tourist_attraction',
  'museum',
  'art_gallery',
  'park',
  'movie_theater',
  'bowling_alley',
  'point_of_interest',
]);

export function getGoogleTypesForCategory(categoryId: string): string[] {
  const category = getCategoryById(categoryId);
  if (!category || !category.googlePlacesTypes) {
    return ['restaurant', 'cafe', 'bar', 'tourist_attraction'];
  }
  return category.googlePlacesTypes.filter((t) => ALLOWED_GOOGLE_TYPES.has(t));
}
