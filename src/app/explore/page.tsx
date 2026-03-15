'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from '@/components/events/EventCard';
import ArtistCard from '@/components/artists/ArtistCard';
import { getEvents, getArtists } from '@/lib/api';
import { EventType, ArtistProfile, User } from '@/lib/db';
import { useAppStore } from '@/store';

type ArtistWithUser = ArtistProfile & { user: User };

function ExploreContent() {
  const { currentCityId } = useAppStore();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get('category') || 'Eventos';
  
  const [events, setEvents] = useState<EventType[]>([]);
  const [artists, setArtists] = useState<ArtistWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Eventos' | 'Artistas'>(defaultCategory === 'Artistas' ? 'Artistas' : 'Eventos');
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'Eventos') {
            const data = await getEvents(currentCityId);
            setEvents(data);
            const uniqueCats = Array.from(new Set(data.map(e => e.category)));
            setCategories(uniqueCats);
        } else {
            const data = await getArtists(currentCityId);
            setArtists(data);
            const uniqueCats = Array.from(new Set(data.map(a => a.genre)));
            setCategories(uniqueCats);
        }
        setLoading(false);
    };
    fetchData();
  }, [activeTab, currentCityId]);

  const filteredEvents = activeFilter === 'Todas' ? events : events.filter(e => e.category === activeFilter);
  const filteredArtists = activeFilter === 'Todas' ? artists : artists.filter(a => a.genre === activeFilter);

  return (
    <div className="px-4 mt-2">
          {/* Filter Header */}
          <div className="flex justify-between items-end mb-4">
              <div>
                 <h2 className="text-2xl font-serif font-bold text-primary">Explorar</h2>
                 <p className="text-sm text-secondary">Descubre experiencias únicas</p>
              </div>
              <div className="flex bg-gray-200 p-1 rounded-2xl shadow-inner">
                  <button 
                    onClick={() => { setActiveTab('Eventos'); setActiveFilter('Todas'); }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === 'Eventos' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                  >
                    Eventos
                  </button>
                  <button 
                    onClick={() => { setActiveTab('Artistas'); setActiveFilter('Todas'); }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === 'Artistas' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                  >
                    Artistas
                  </button>
              </div>
          </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide snap-x">
          <button 
             onClick={() => setActiveFilter('Todas')}
             className={`snap-start whitespace-nowrap px-5 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-bold transition ${activeFilter === 'Todas' ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
             Todas
          </button>
          {categories.map((cat, idx) => (
             <button 
                key={idx} 
                onClick={() => setActiveFilter(cat)}
                className={`snap-start whitespace-nowrap px-5 py-2 rounded-full border border-gray-300 shadow-sm text-sm font-bold transition ${activeFilter === cat ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-gray-100'}`}>
                {cat}
             </button>
          ))}
        </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-[2rem]"></div>)}
           </div>
        ) : activeTab === 'Eventos' ? (
           filteredEvents.length === 0 ? (
               <div className="text-center py-10 w-full col-span-full">
                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                       <i className="fa-solid fa-calendar-xmark"></i>
                   </div>
                   <p className="font-bold text-gray-500">No hay eventos en esta categoría</p>
               </div>
           ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {filteredEvents.map(event => (
                       <EventCard key={event.id} event={event} />
                   ))}
               </div>
           )
        ) : (
           filteredArtists.length === 0 ? (
               <div className="text-center py-10 w-full col-span-full">
                   <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                       <i className="fa-solid fa-microphone-slash"></i>
                   </div>
                   <p className="font-bold text-gray-500">No hay artistas en esta ciudad</p>
               </div>
           ) : (
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                   {filteredArtists.map(artist => (
                       <ArtistCard key={artist.id} artist={artist} />
                   ))}
               </div>
           )
        )}
      </div>
  );
}

export default function ExplorePage() {
    return (
        <div className="pb-24 bg-gray-50 min-h-full">
            <Suspense fallback={<div className="p-10 text-center text-primary font-bold">Cargando exploración...</div>}>
                <ExploreContent />
            </Suspense>
        </div>
    )
}
