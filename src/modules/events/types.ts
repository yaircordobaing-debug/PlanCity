export interface PlanCityEvent {
  id: string;
  title: string;
  description: string;
  cityId: string;
  cityName?: string;
  category: string;
  startDate: string;
  endDate?: string;
  scheduleText?: string;
  venueName: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  image: string;
  price: string;
  isFree: boolean;
  source: 'plancity';
  status: 'published' | 'draft' | 'archived';
  organizer?: string;
  lastVerifiedAt?: string;
}

export interface EventFilterOptions {
  cityId?: string;
  category?: string;
  upcomingOnly?: boolean;
  limit?: number;
}
