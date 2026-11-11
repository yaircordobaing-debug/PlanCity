export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
  googlePlacesTypes?: string[];
  isEditorialOnly?: boolean;
}
