export interface EditorialPlace {
  id: string;
  name: string;
  description: string;
  cityId: string;
  category: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image?: string;
  price?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  features?: string[];
  schedule?: string;
  source: 'plancity';
  status: 'published';
  lastVerifiedAt?: string;
  distanceMeters?: number;
}

export interface GooglePlaceResult {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  primaryType: string;
  googleMapsUri: string;
  rating: number | null;
  userRatingCount: number | null;
  source: 'google';
  distanceMeters?: number;
}

export type PlaceItem = EditorialPlace | GooglePlaceResult;

export interface NearbySearchInput {
  lat: number;
  lng: number;
  radiusMeters?: number;
  categoryId?: string;
}

export interface NearbySearchResponse {
  places: PlaceItem[];
  isGoogleConfigured: boolean;
  message?: string;
}
