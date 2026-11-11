import { PlaceItem } from '../places/types';
import { Coordinates } from '../geolocation/types';

export interface DiscoveryState {
  isLoading: boolean;
  places: PlaceItem[];
  selectedPlaceId: string | null;
  activeCategoryId: string;
  radiusMeters: number;
  centerCoordinates: Coordinates;
  isGoogleConfigured: boolean;
  statusMessage?: string;
}
