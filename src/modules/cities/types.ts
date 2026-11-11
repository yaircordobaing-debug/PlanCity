export interface CityCoordinates {
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  coordinates: CityCoordinates;
  status: 'active' | 'inactive';
}
