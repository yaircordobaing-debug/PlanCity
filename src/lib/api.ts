import { mockDb, EventType, BusinessProfile, City, MenuItem, ArtistProfile, User, Menu, VideoType } from './db';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for local storage simulation
const getLocalData = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};

const setLocalData = <T>(key: string, data: T) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

// 1. EVENTS
export const getEvents = async (cityId?: string) => {
    await delay(500);
    const localEvents = getLocalData<EventType[]>('plancity_events', []);
    let all = [...mockDb.events, ...localEvents];
    if (cityId) {
        all = all.filter(e => e.city_id === cityId);
    }
    return all;
};

export const getEventById = async (id: string) => {
    const events = await getEvents();
    return events.find(e => e.id === id);
};

export const createEvent = async (event: Omit<EventType, 'id'>) => {
    await delay(800);
    const localEvents = getLocalData<EventType[]>('plancity_events', []);
    const newEvent: EventType = {
        ...event,
        id: `local-${Date.now()}`,
        status: 'published'
    } as EventType;
    setLocalData('plancity_events', [...localEvents, newEvent]);
    return newEvent;
};

// 2. RESTAURANTS / BUSINESSES
export const getRestaurants = async (cityId?: string) => {
    await delay(500);
    let all = mockDb.business_profiles;
    if (cityId) {
        all = all.filter(b => {
             // Relationship business_profiles -> user -> main_city_id
             const user = mockDb.users.find(u => u.id === b.user_id);
             return user?.main_city_id === cityId;
        });
    }
    return all;
};

export const getRestaurantById = async (id: string) => {
    const res = await getRestaurants();
    return res.find(r => r.id === id);
};

// 3. MENUS
export const getMenuItems = async (businessId: string) => {
    await delay(300);
    // Find menus for this business
    const menus = mockDb.menus.filter(m => m.business_profile_id === businessId);
    const menuIds = menus.map(m => m.id);
    
    const localItems = getLocalData<MenuItem[]>('plancity_menu_items', []);
    const allItems = [...mockDb.menu_items, ...localItems];
    return allItems.filter(item => menuIds.includes(item.menu_id));
};

export const createMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    await delay(500);
    const localItems = getLocalData<MenuItem[]>('plancity_menu_items', []);
    const newItem: MenuItem = {
        ...item,
        id: `item-${Date.now()}`
    } as MenuItem;
    setLocalData('plancity_menu_items', [...localItems, newItem]);
    return newItem;
};

// 4. ARTISTS
export const getArtists = async (cityId?: string): Promise<(ArtistProfile & { user: User })[]> => {
    await delay(500);
    const artists = mockDb.artist_profiles;
    const mapped = artists.map(a => {
        const user = mockDb.users.find(u => u.id === a.user_id);
        return {
            ...a,
            user: user || mockDb.users[0]
        };
    });
    
    if (cityId) {
        return mapped.filter(a => a.user.main_city_id === cityId);
    }
    return mapped;
};

export const getArtistById = async (id: string) => {
    const artists = await getArtists();
    return artists.find(a => a.id === id);
};

// 5. VIDEOS / FEED
export const getFeedVideos = async (cityId?: string) => {
    await delay(600);
    let all = mockDb.videos;
    if (cityId) {
        all = all.filter(v => v.city_id === cityId);
    }
    
    // Enrich videos with creator, event, and business info
    return all.map(v => {
        const creator = mockDb.users.find(u => u.id === v.creator_id) || mockDb.users[0];
        let event = undefined;
        let business = undefined;
        
        if (v.target_type === 'event') {
            event = mockDb.events.find(e => e.id === v.target_id);
        } else if (v.target_type === 'business') {
            business = mockDb.business_profiles.find(b => b.id === v.target_id);
        }
        
        return {
            ...v,
            creator,
            event,
            business
        };
    });
};
