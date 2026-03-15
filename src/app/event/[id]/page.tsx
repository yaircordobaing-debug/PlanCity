'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEventById } from '@/lib/api';
import { EventType } from '@/lib/db';
import { useAppStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { savedEvents, toggleSaveEvent, setBottomNavVisible } = useAppStore();
  const isSaved = event ? savedEvents.includes(event.id) : false;

  useEffect(() => {
    // Hide global bottom nav on detail pages
    setBottomNavVisible(false);
    
    getEventById(id as string).then(data => {
      if(data) setEvent(data);
      setLoading(false);
    });

    return () => setBottomNavVisible(true);
  }, [id, setBottomNavVisible]);

  if (loading) return <div className="h-full w-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>;
  if (!event) return <div className="p-8 text-center mt-20">Evento no encontrado</div>;

  const handleBookTicket = () => {
    setShowModal(true);
    // Simulate API call and auto-close
    setTimeout(() => {
        setShowModal(false);
        router.push('/');
    }, 2500);
  };

  return (
    <div className="relative pb-24 bg-[#475569] text-white min-h-full font-sans overflow-y-auto">
      {/* Back Button */}
      <button onClick={() => router.back()} className="absolute top-6 left-6 z-20 text-white text-xl drop-shadow-lg bg-black/30 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-105 transition">
          <i className="fa-solid fa-arrow-left"></i>
      </button>

      {/* Hero Image */}
      <div className="h-64 w-full relative">
        <img src={event.image_url} className="w-full h-full object-cover rounded-b-[3rem] shadow-lg" alt={event.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#475569] via-[#475569]/20 to-transparent rounded-b-[3rem]"></div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="flex justify-between items-start">
            <span className="border border-white/50 text-white px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-md bg-black/20 shadow-sm">{event.category}</span>
            <div className="flex gap-3">
                <div className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition">
                    <i className="fa-solid fa-share-nodes"></i>
                </div>
                <div onClick={() => toggleSaveEvent(event.id)} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition ${isSaved ? 'bg-red-500 text-white' : 'bg-black/20 hover:bg-white/40'}`}>
                    <i className={`fa-${isSaved ? 'solid' : 'regular'} fa-heart`}></i>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-serif font-bold mt-5 mb-4 drop-shadow-md leading-tight">{event.title}</h2>
        
        {/* Quick Info Grid */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-sm border border-white/20 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-red-300"><i className="fa-regular fa-calendar"></i></div>
                <div>
                   <p className="font-bold text-sm">Fecha y Hora</p>
                   <p className="text-xs text-gray-200">{new Date(event.start_date).toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' })}</p>
                </div>
            </div>
            <div className="w-full h-px bg-white/10"></div>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-blue-300"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                   <p className="font-bold text-sm">Ubicación</p>
                   <p className="text-xs text-gray-200">{event.location}</p>
                </div>
            </div>
        </div>

        <h3 className="font-bold text-xl mb-3">Descripción</h3>
        <p className="text-sm text-gray-200 leading-relaxed mb-6 font-light">
            {event.description}
        </p>

        {/* Organizer Preview */}
        <div className="flex items-center gap-4 mb-6 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-sm">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" className="w-12 h-12 rounded-full object-cover border-2 border-white/20" alt="Organizer" />
            <div>
                <p className="text-xs text-gray-300 font-medium">Organizador</p>
                <p className="font-bold">Yair Cordoba</p>
            </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 h-32 rounded-3xl w-full mb-8 bg-cover bg-center relative overflow-hidden shadow-inner border border-white/10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')" }}>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                <span className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full text-primary font-bold text-sm shadow cursor-pointer hover:scale-105 transition">Ver Mapa</span>
            </div>
        </div>
      </div>

      {/* Fixed Bottom Booking Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-[#1E293B]/95 backdrop-blur-xl rounded-t-[2.5rem] p-6 flex justify-between items-center z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10">
          <div>
              <p className="text-xs text-gray-300 font-medium mb-1">Precio por persona</p>
              <p className="text-2xl font-bold">{event.price === 0 ? 'Gratis' : `$${event.price.toLocaleString('es-CO')}`}</p>
          </div>
          <button onClick={handleBookTicket} className="bg-white text-primary px-8 py-3.5 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-gray-100 transition active:scale-95">
              Confirmar
          </button>
      </div>

      {/* Success Modal Simulation using Framer Motion */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white text-primary p-8 rounded-[2rem] shadow-2xl w-full max-w-sm text-center flex flex-col items-center"
            >
               <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
                  <i className="fa-solid fa-check"></i>
               </div>
               <h3 className="text-2xl font-serif font-bold mb-2">¡Asistencia Confirmada!</h3>
               <p className="text-sm text-gray-500 mb-6">Tus entradas al evento "{event.title}" han sido guardadas en tu perfil.</p>
               <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                    className="h-full bg-green-500"
                  />
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
