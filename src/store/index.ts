import { create } from 'zustand';

type Role = 'user' | 'organizer' | 'admin';

interface AppState {
    role: Role;
    setRole: (role: Role) => void;
    
    // City states
    currentCityId: string;
    setCityId: (cityId: string) => void;

    // UI states
    isBottomNavVisible: boolean;
    setBottomNavVisible: (visible: boolean) => void;

    // Favorites (simple local state)
    savedEvents: string[];
    toggleSaveEvent: (eventId: string) => void;

    // UI Error Toast
    errorToast: string | null;
    showError: (msg: string) => void;
    clearError: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    role: 'user', // Default
    setRole: (role) => set({ role }),

    currentCityId: 'c1', // Default to Medellín (c1)
    setCityId: (cityId) => set({ currentCityId: cityId }),

    isBottomNavVisible: true,
    setBottomNavVisible: (visible) => set({ isBottomNavVisible: visible }),

    errorToast: null,
    showError: (msg) => {
        set({ errorToast: msg });
        setTimeout(() => set({ errorToast: null }), 4000);
    },
    clearError: () => set({ errorToast: null }),

    savedEvents: [],
    toggleSaveEvent: (eventId) => set((state) => {
        const isSaved = state.savedEvents.includes(eventId);
        if (isSaved) {
            return { savedEvents: state.savedEvents.filter(id => id !== eventId) };
        }
        return { savedEvents: [...state.savedEvents, eventId] };
    }),
}));
