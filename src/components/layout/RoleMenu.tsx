'use client';

import { useAppStore } from '@/store';
import Link from 'next/link';

export default function RoleMenu({ onClose }: { onClose?: () => void }) {
  const { role } = useAppStore();

  return (
    <>
      {role === 'organizer' && (
        <>
          <Link href="/dashboard" onClick={onClose} className="px-4 py-2 text-sm font-bold text-secondary hover:bg-gray-50 flex items-center gap-3">
              <i className="fa-solid fa-chart-line w-5 text-center"></i> Dashboard Org.
          </Link>
          <Link href="/dashboard/create-event" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <i className="fa-solid fa-plus w-5 text-center"></i> Crear Evento
          </Link>
          <Link href="/dashboard" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <i className="fa-solid fa-calendar-check w-5 text-center"></i> Mis Eventos
          </Link>
        </>
      )}
      
      {role === 'admin' && (
        <>
          <Link href="/admin" onClick={onClose} className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3">
              <i className="fa-solid fa-shield-halved w-5 text-center"></i> Panel Admin
          </Link>
          <Link href="/admin" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <i className="fa-solid fa-users-gear w-5 text-center"></i> Usuarios
          </Link>
          <Link href="/admin" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3">
              <i className="fa-solid fa-video-slash w-5 text-center"></i> Moderación
          </Link>
        </>
      )}
    </>
  );
}
