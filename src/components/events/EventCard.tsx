'use client';

import { EventType } from '@/lib/db';
import Link from 'next/link';
import { useAppStore } from '@/store';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EventCard({ event }: { event: EventType }) {
  const { savedEvents, toggleSaveEvent } = useAppStore();
  const isSaved = savedEvents.includes(event.id);

  const priceFormatted = event.price === 0 ? 'Gratis' : new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(event.price);
  const dateFormatted = new Date(event.start_date || '').toLocaleDateString('es-CO', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white/60 backdrop-blur-md border border-gray-300 rounded-[2rem] p-3 flex shadow-sm hover:shadow-md transition cursor-pointer mb-4">
      <Link href={`/event/${event.id}`} className="flex-shrink-0">
         <img src={event.image_url} className="w-24 h-24 rounded-3xl object-cover shadow-sm bg-gray-200" alt={event.title} />
      </Link>
      
      <div className="ml-4 flex-1 flex flex-col justify-center">
        <Link href={`/event/${event.id}`}>
          <h4 className="font-serif font-bold text-lg text-primary leading-tight line-clamp-2">{event.title}</h4>
          <p className="text-xs text-secondary mt-1 line-clamp-1"><i className="fa-solid fa-location-dot text-red-500 mr-1"></i>{event.location}</p>
          <div className="flex gap-2 items-center mt-1">
             <p className="text-xs font-semibold text-orange-500">🔥 {event.category}</p>
             <p className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{dateFormatted}</p>
          </div>
          <div className="text-xs text-gray-800 mt-2 font-bold flex items-center">
             <i className="fa-solid fa-ticket text-green-500 mr-1"></i> {priceFormatted}
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-between items-end ml-2">
        <button aria-label="Añadir al calendario" className="w-8 h-8 rounded-full bg-secondary text-white shadow-sm flex items-center justify-center hover:bg-primary transition">
           <i className="fa-solid fa-plus"></i>
        </button>
        <button 
           aria-label={isSaved ? "Quitar de favoritos" : "Añadir a favoritos"}
           onClick={() => toggleSaveEvent(event.id)}
           className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition ${isSaved ? 'bg-red-50 text-red-500' : 'bg-secondary text-white hover:bg-primary'}`}>
           <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>
    </div>
  );
}
