'use client';

import { useState, useEffect } from 'react';
import { mockDb } from '@/lib/db';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    organizers: 0,
    events: 0,
    videos: 0,
    reports: 0
  });

  useEffect(() => {
    // Simular conteo real del JSON
    setStats({
      users: mockDb.users.length,
      organizers: mockDb.users.filter(u => mockDb.user_roles.some(ur => ur.user_id === u.id && ur.role === 'organizer')).length,
      events: mockDb.events.length,
      videos: mockDb.videos.length,
      reports: mockDb.reports.length
    });
  }, []);

  return (
    <div className="pb-32 px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary">Admin Control</h2>
          <p className="text-sm text-secondary font-medium uppercase tracking-widest mt-1 opacity-60 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Sistema en línea
          </p>
        </div>
        <div className="flex gap-3">
             <button className="w-10 h-10 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-primary"><i className="fa-solid fa-bell"></i></button>
             <button className="w-10 h-10 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-primary"><i className="fa-solid fa-gear"></i></button>
        </div>
      </div>

      {/* Global Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
              { label: 'Usuarios', val: stats.users, icon: 'fa-users', color: 'blue' },
              { label: 'Eventos', val: stats.events, icon: 'fa-calendar-days', color: 'purple' },
              { label: 'Videos', val: stats.videos, icon: 'fa-clapperboard', color: 'pink' },
              { label: 'Reportes', val: stats.reports, icon: 'fa-triangle-exclamation', color: 'red' }
          ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition cursor-default">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 bg-${item.color}-100 text-${item.color}-600`}>
                      <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{item.val}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase mt-1">{item.label}</p>
                  </div>
              </div>
          ))}
      </div>

      {/* Moderation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Recent Reports */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-primary flex items-center gap-2 px-2">
                       <span className="w-2 h-6 bg-red-500 rounded-full"></span> Moderación Pendiente
                  </h3>
                  <button className="text-xs font-bold text-red-500 hover:underline">Ver todos los reportes</button>
              </div>
              <div className="space-y-4">
                  {mockDb.reports.slice(0, 4).map(report => (
                      <div key={report.id} className="p-4 bg-gray-50 rounded-3xl border border-gray-100 border-l-4 border-l-red-400 flex justify-between items-center group cursor-pointer hover:bg-red-50 transition">
                          <div>
                              <p className="text-sm font-bold text-primary">Reporte: {report.reason}</p>
                              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">TIPO: {report.target_type} • ID: {report.target_id}</p>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-full text-green-500 shadow-sm hover:bg-green-50"><i className="fa-solid fa-check"></i></button>
                             <button className="w-8 h-8 bg-white border border-gray-200 rounded-full text-red-500 shadow-sm hover:bg-red-50"><i className="fa-solid fa-trash"></i></button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* User Management Quick View */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-primary flex items-center gap-2 px-2">
                       <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Usuarios Recientes
                  </h3>
                  <button className="text-xs font-bold text-blue-500 hover:underline">Gestionar Usuarios</button>
              </div>
              <div className="space-y-4">
                  {mockDb.users.slice(0, 5).map(user => (
                      <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-2xl transition">
                          <img src={user.avatar_url} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                          <div className="flex-1">
                              <p className="text-xs font-bold text-primary leading-tight">{user.name}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{user.main_city_id}</p>
                          </div>
                          <div className="flex gap-2">
                              <button className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full hover:bg-red-50 hover:text-red-500 transition">Bloquear</button>
                              <button className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-full hover:opacity-80 transition">Ver</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Global Stats Chart Simulation */}
      <div className="mt-8 bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-[3rem] shadow-xl overflow-hidden relative">
          <div className="relative z-10">
              <h3 className="text-xl font-bold mb-1">Crecimiento de la Plataforma</h3>
              <p className="text-sm opacity-70 mb-8">Conversión de usuarios a organizadores y ventas de tickets.</p>
              
              <div className="flex items-end gap-2 h-32">
                 {[40, 65, 50, 85, 70, 95, 120, 110, 140].map((h, i) => (
                     <div key={i} className="flex-1 bg-white/20 rounded-t-lg hover:bg-white/40 transition relative group" style={{ height: `${h}px` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                            +{Math.floor(h*2.5)}%
                        </div>
                     </div>
                 ))}
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest mt-4 opacity-50">
                  <span>Ene</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Set</span>
                  <span>Nov</span>
              </div>
          </div>
          {/* Abstract BG Decorations */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
