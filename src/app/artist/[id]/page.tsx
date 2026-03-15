'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getArtistById, getEvents } from '@/lib/api';
import { ArtistProfile, User, EventType } from '@/lib/db';
import EventCard from '@/components/events/EventCard';

type ArtistWithUser = ArtistProfile & { user: User };

export default function ArtistDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [artist, setArtist] = useState<ArtistWithUser | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const artistData = await getArtistById(id as string);
        if (artistData) {
            setArtist(artistData);
            const allEvents = await getEvents();
            // In a real app we'd filter by artist_id in event_artists
            setEvents(allEvents.slice(0, 3)); 
        }
        setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full w-full bg-primary animate-pulse flex flex-col items-center justify-center p-10">
        <div className="w-32 h-32 bg-white/10 rounded-full mb-4"></div>
        <div className="h-8 bg-white/10 rounded-full w-1/2 mb-2"></div>
        <div className="h-4 bg-white/10 rounded-full w-1/3"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-primary text-white">
        <h2 className="text-xl font-bold mb-2">Artista no encontrado</h2>
        <button onClick={() => router.back()} className="text-accent font-bold underline">Volver</button>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-primary text-white min-h-full font-sans overflow-y-auto">
      {/* Profile Header */}
      <div className="relative h-64 w-full">
          <img src={artist.user.avatar_url} className="w-full h-full object-cover opacity-60 grayscale-[50%]" alt={artist.stage_name} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30"></div>
          <button 
             onClick={() => router.back()}
             className="absolute top-6 left-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition z-10">
             <i className="fa-solid fa-arrow-left"></i>
          </button>
      </div>

      <div className="px-6 -mt-20 relative z-10 text-center">
          <img src={artist.user.avatar_url} className="w-32 h-32 rounded-full border-4 border-accent object-cover mx-auto shadow-2xl bg-gray-300" alt={artist.stage_name} />
          <h1 className="text-3xl font-serif font-bold mt-4 tracking-wide">{artist.stage_name}</h1>
          <div className="inline-block bg-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-2 mb-4">
              {artist.genre}
          </div>
          
          <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                  <p className="font-bold text-xl">{artist.followers_count || '12k'}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Seguidores</p>
              </div>
              <div className="text-center">
                  <p className="font-bold text-xl">45</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Shows</p>
              </div>
              <div className="text-center">
                  <p className="font-bold text-xl">4.9</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Rating</p>
              </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-6 text-left border border-white/10 shadow-lg">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-accent">
                  <i className="fa-solid fa-quote-left opacity-30"></i> Biografía
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed italic">
                  {artist.bio}
              </p>
          </div>

          <div className="mt-8 text-left">
              <h3 className="font-bold text-lg mb-4 px-2">Próximos Eventos</h3>
              <div className="space-y-4">
                  {events.map(event => (
                      <EventCard key={event.id} event={event} />
                  ))}
              </div>
          </div>

          <button className="w-full mt-10 bg-white text-primary font-bold py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-3">
              <i className="fa-solid fa-plus"></i> SEGUIR ARTISTA
          </button>
      </div>
    </div>
  );
}
