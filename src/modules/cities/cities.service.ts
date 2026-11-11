import { City } from './types';

// Coordenadas geográficas reales verificadas para ciudades de Colombia
export const VERIFIED_CITIES: City[] = [
  {
    id: 'c1',
    name: 'Medellín',
    country: 'Colombia',
    coordinates: { lat: 6.244203, lng: -75.581211 },
    status: 'active',
  },
  {
    id: 'c2',
    name: 'Bogotá',
    country: 'Colombia',
    coordinates: { lat: 4.710989, lng: -74.072092 },
    status: 'active',
  },
  {
    id: 'c3',
    name: 'Cali',
    country: 'Colombia',
    coordinates: { lat: 3.451647, lng: -76.531985 },
    status: 'active',
  },
  {
    id: 'c4',
    name: 'Cartagena',
    country: 'Colombia',
    coordinates: { lat: 10.391049, lng: -75.479426 },
    status: 'active',
  },
  {
    id: 'c5',
    name: 'Barranquilla',
    country: 'Colombia',
    coordinates: { lat: 10.968540, lng: -74.781320 },
    status: 'active',
  },
  {
    id: 'c6',
    name: 'Santa Marta',
    country: 'Colombia',
    coordinates: { lat: 11.240790, lng: -74.199040 },
    status: 'active',
  },
  {
    id: 'c7',
    name: 'Bucaramanga',
    country: 'Colombia',
    coordinates: { lat: 7.125390, lng: -73.119800 },
    status: 'active',
  },
  {
    id: 'c8',
    name: 'Pereira',
    country: 'Colombia',
    coordinates: { lat: 4.813330, lng: -75.696110 },
    status: 'active',
  },
];

export function getCities(): City[] {
  return VERIFIED_CITIES.filter((city) => city.status === 'active');
}

export function getCityById(id: string): City | undefined {
  return VERIFIED_CITIES.find((city) => city.id === id);
}

export function getCityByName(name: string): City | undefined {
  const norm = name.toLowerCase().trim();
  return VERIFIED_CITIES.find((city) => city.name.toLowerCase() === norm);
}

export function getDefaultCity(): City {
  return VERIFIED_CITIES[0]; // Medellín por defecto
}
