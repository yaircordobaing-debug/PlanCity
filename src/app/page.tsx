'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import RestaurantCard from '@/components/events/RestaurantCard';
import { getEvents, getRestaurants } from '@/lib/api';
import { EventType, BusinessProfile, mockDb } from '@/lib/db';
import { useAppStore } from '@/store';
import Link from 'next/link';

export default function Home() {
  const { currentCityId } = useAppStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<BusinessProfile[]>([]);

  const currentCity = mockDb.cities.find(c => c.id === currentCityId);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const [eventsData, restaurantsData] = await Promise.all([
            getEvents(currentCityId),
            getRestaurants(currentCityId)
        ]);
        
        setEvents(eventsData.slice(0, 4));
        setRestaurants(restaurantsData);
        
        const uniqueCats = Array.from(new Set(eventsData.map(e => e.category)));
        setCategories(uniqueCats);
        setLoading(false);
    };
    
    fetchData();
  }, [currentCityId]);

  return (
    <div className="pb-24">

      <div className="px-4">
        {/* Search Bar */}
        <div className="bg-accent/80 rounded-full px-4 py-3 flex items-center mb-6 shadow-sm mt-2">
            <i className="fa-solid fa-search text-white mr-3"></i>
            <input type="text" placeholder="Buscar experiencias o lugares..." className="bg-transparent outline-none text-white placeholder-gray-200 w-full text-sm" />
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide snap-x">
          {categories.map((cat, idx) => (
            <Link href={`/explore?category=${encodeURIComponent(cat)}`} key={idx} className="snap-start whitespace-nowrap px-5 py-2 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm text-sm font-bold text-primary hover:bg-gray-100 transition">
              {cat}
            </Link>
          ))}
        </div>

        {/* Hero Section Banner */}
        <div className="bg-primary text-white rounded-3xl p-6 mb-8 text-center bg-cover bg-center shadow-md relative overflow-hidden" style={{ backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.8)), url('https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80')` }}>
            <h2 className="text-2xl font-serif font-bold mb-2">Descubre {currentCity?.name}</h2>
            <p className="text-sm mb-4 opacity-90">Explora lo mejor de tu ciudad en un solo lugar.</p>
            <Link href="/explore">
               <button className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm shadow-sm hover:scale-105 transition">Explorar ahora</button>
            </Link>
        </div>

        {/* Events */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
               <h3 className="text-xl font-serif font-bold text-primary">Próximos eventos</h3>
               <Link href="/explore" className="text-xs text-accent font-bold mb-1">Ver todos</Link>
            </div>
            
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1,2].map(i => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-[2rem]"></div>) }
                </div>
            ) : events.length === 0 ? (
                <div className="p-10 text-center bg-gray-100 rounded-[2rem]">
                    <p className="text-gray-500 font-bold">No hay eventos próximos en esta ciudad.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>

        {/* Restaurants (Horizontal Scroll) */}
        <div className="mb-6">
            <h3 className="text-xl font-serif font-bold mb-4 text-primary">Lugares recomendados</h3>
            {loading ? (
                 <div className="flex gap-4 overflow-hidden">
                     {[1,2,3].map(i => <div key={i} className="min-w-[160px] h-40 bg-gray-200 animate-pulse rounded-3xl"></div>)}
                 </div>
            ) : restaurants.length === 0 ? (
                <div className="p-10 text-center bg-gray-100 rounded-[2rem]">
                    <p className="text-gray-500 font-bold">No hay restaurantes registrados en esta ciudad.</p>
                </div>
            ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
                    {restaurants.map(rest => (
                        <RestaurantCard key={rest.id} restaurant={rest} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
