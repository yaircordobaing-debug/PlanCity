import data from '../../plan_city_data.json';

// Extraer los tipos inferidos de los arreglos del JSON
export type City = typeof data.cities[0];
export type User = typeof data.users[0];
export type UserRole = typeof data.user_roles[0];
export type ArtistProfile = typeof data.artist_profiles[0];
export type BusinessProfile = typeof data.business_profiles[0];
export type Menu = typeof data.menus[0];
export type MenuItem = typeof data.menu_items[0];
export type EventType = typeof data.events[0];
export type EventArtist = typeof data.event_artists[0];
export type Ticket = typeof data.tickets[0];
export type EventAttendee = typeof data.event_attendees[0];
export type Payment = typeof data.payments[0];
export type VideoType = typeof data.videos[0];
export type VideoLike = typeof data.video_likes[0];
export type Comment = typeof data.comments[0];
export type Favorite = typeof data.favorites[0];
export type Follow = typeof data.follows[0];
export type Review = typeof data.reviews[0];
export type Notification = typeof data.notifications[0];
export type EventView = typeof data.event_views[0];
export type VideoView = typeof data.video_views[0];
export type Report = typeof data.reports[0];
export type Tag = typeof data.tags[0];
export type Promotion = typeof data.promotions[0];
export type UserInterest = typeof data.user_interests[0];

export const mockDb = data;
