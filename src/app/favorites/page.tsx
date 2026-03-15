'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/events/EventCard';
import { getEvents } from '@/lib/api';
import { EventType } from '@/lib/db';
import { useAppStore } from '@/store';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const { savedEvents } = useAppStore();

  useEffect(() => {
    getEvents().then((data) => {
      // Filter only saved events
      setEvents(data.filter(e => savedEvents.includes(e.id)));
      setLoading(false);
    });
  }, [savedEvents]);

  return (
    <div className="pb-24 bg-gray-50 min-h-full">
      <div className="px-4 mt-2">
         <div className="mb-6">
             <h2 className="text-2xl font-serif font-bold text-primary">Tus Favoritos</h2>
             <p className="text-sm text-secondary">Eventos que has guardado</p>
         </div>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1,2].map(i => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-[2rem]"></div>)}
           </div>
        ) : events.length === 0 ? (
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-200 shadow-sm mt-8"
           >
               <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                   <i className="fa-regular fa-heart"></i>
               </div>
               <h3 className="font-bold text-lg text-primary mb-2">No tienes favoritos aún</h3>
               <p className="text-gray-500 text-sm mb-6">Explora y guarda los eventos que más te interesen para verlos aquí.</p>
               <Link href="/explore">
                  <button className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-md hover:scale-105 transition">
                      Explorar Eventos
                  </button>
               </Link>
           </motion.div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {events.map(event => (
                   <EventCard key={event.id} event={event} />
               ))}
           </div>
        )}
      </div>
    </div>
  );
}
