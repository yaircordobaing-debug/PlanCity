export interface Coordinates {
  lat: number;
  lng: number;
}

export type GeolocationStatus =
  | 'idle'
  | 'requesting'
  | 'success'
  | 'denied'
  | 'unavailable'
  | 'timeout'
  | 'error';

export interface GeolocationState {
  status: GeolocationStatus;
  coordinates: Coordinates | null;
  errorMessage: string | null;
  isManualFallback: boolean;
  selectedCityName?: string;
}
