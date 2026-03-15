'use client';

import { useState } from 'react';
import { useAppStore } from '@/store';
import RoleMenu from './RoleMenu';
import Link from 'next/link';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useAppStore();

  return (
    <div className="relative">
      <button 
         onClick={() => setIsOpen(!isOpen)} 
         className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:scale-105 transition"
      >
         <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
           <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
               <div>
                   <p className="font-bold text-sm text-primary">Laura Gómez</p>
                   <p className="text-xs text-gray-500 capitalize">{role}</p>
               </div>
           </div>
           
           <div className="flex flex-col py-2">
               <RoleMenu onClose={() => setIsOpen(false)} />
               
               <div className="border-t border-gray-100 my-1"></div>
               
               <Link href="/profile" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition flex items-center gap-3">
                  <i className="fa-solid fa-gear w-5 text-center"></i> Configuración
               </Link>
               <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-50 transition w-full text-left flex items-center gap-3">
                  <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i> Cerrar Sesión
               </button>
           </div>
        </div>
      )}
    </div>
  );
}
