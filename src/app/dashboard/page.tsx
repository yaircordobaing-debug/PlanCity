'use client';

import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/api';
import { EventType, BusinessProfile } from '@/lib/db';
import Link from 'next/link';

export default function DashboardPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [businesses, setBusinesses] = useState<BusinessProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch events created by this organizer (simulated with ID 'u1')
    getEvents().then(data => {
      setEvents(data.filter(e => e.organizer_id === 'u1'));
    });

    import('@/lib/api').then(({ getRestaurants }) => {
        getRestaurants().then(data => {
            setBusinesses(data.filter(b => b.user_id === 'u1'));
            setLoading(false);
        });
    });
  }, []);

  return (
    <div className="pb-24 px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary">Panel Organizador</h2>
          <p className="text-sm text-secondary">Gestiona tus eventos e ingresos.</p>
        </div>
        <Link href="/dashboard/create-event">
            <button className="bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-secondary transition flex items-center gap-2 text-sm hover:scale-105 active:scale-95">
                <i className="fa-solid fa-plus"></i> Crear
            </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 hover:-translate-y-1 transition">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2"><i className="fa-solid fa-calendar-check"></i></div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Eventos</p>
            <p className="text-3xl font-bold text-primary">{loading ? '-' : events.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 hover:-translate-y-1 transition">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2"><i className="fa-solid fa-utensils"></i></div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Restaurantes</p>
            <p className="text-3xl font-bold text-primary">{loading ? '-' : businesses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 hover:-translate-y-1 transition">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2"><i className="fa-solid fa-users"></i></div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Asistentes</p>
            <p className="text-3xl font-bold text-primary">1,450</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 hover:-translate-y-1 transition">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2"><i className="fa-solid fa-video"></i></div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Vistas Videos</p>
            <p className="text-3xl font-bold text-primary">45.2K</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-green-200 hover:-translate-y-1 transition bg-gradient-to-br from-white to-green-50">
            <div className="w-10 h-10 bg-green-500 text-white shadow-md rounded-full flex items-center justify-center mb-2"><i className="fa-solid fa-money-bill-wave"></i></div>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Ingresos (Mes)</p>
            <p className="text-2xl font-bold text-green-600">$4.2M</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary mb-4">Tus Eventos Creados</h3>
      
      {loading ? (
        <div className="space-y-4">
             {[1,2].map(i => <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-[1.5rem]"></div>)}
        </div>
      ) : events.length === 0 ? (
         <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
            <p className="text-gray-500 mb-4">Aún no tienes eventos activos.</p>
            <Link href="/dashboard/create-event">
               <button className="text-primary font-bold hover:underline">¡Crea tu primer evento!</button>
            </Link>
         </div>
      ) : (
        <div className="space-y-4">
          {events.map(e => (
            <Link href={`/event/${e.id}`} key={e.id}>
              <div className="bg-white p-3 rounded-3xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-primary transition group mb-3">
                  <div className="flex items-center gap-4">
                      <img src={e.image_url} className="w-16 h-16 rounded-2xl object-cover bg-gray-200" alt={e.title} />
                      <div>
                          <h4 className="font-bold text-primary leading-tight text-sm line-clamp-1">{e.title}</h4>
                          <p className="text-xs text-gray-500 mt-1"><i className="fa-solid fa-users mr-1"></i> {Math.floor(Math.random() * 500) + 10} confirmados</p>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition shadow-sm">
                          <i className="fa-solid fa-chevron-right"></i>
                      </div>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <h3 className="text-xl font-bold text-primary mt-8 mb-4">Mis Restaurantes</h3>
      
      {loading ? (
        <div className="space-y-4">
             {[1].map(i => <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-[1.5rem]"></div>)}
        </div>
      ) : businesses.length === 0 ? (
         <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
            <p className="text-gray-500 mb-4">Aún no gestionas restaurantes.</p>
         </div>
      ) : (
        <div className="space-y-4">
          {businesses.map(b => (
            <Link href={`/dashboard/manage-menu/${b.id}`} key={b.id}>
              <div className="bg-white p-3 rounded-3xl shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-primary transition group mb-3">
                  <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-primary text-2xl font-bold">
                          {b.name[0]}
                      </div>
                      <div>
                          <h4 className="font-bold text-primary leading-tight text-sm line-clamp-1">{b.name}</h4>
                          <p className="text-xs text-gray-500 mt-1"><i className="fa-solid fa-location-dot mr-1"></i> {b.address}</p>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase">Gestionar Menú</div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition shadow-sm">
                          <i className="fa-solid fa-chevron-right"></i>
                      </div>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
