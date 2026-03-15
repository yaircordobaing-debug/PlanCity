'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import { mockDb } from '@/lib/db';

export default function CitySwitcher() {
  const { currentCityId, setCityId } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentCity = mockDb.cities.find(c => c.id === currentCityId);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-white transition shadow-sm"
      >
        <i className="fa-solid fa-location-dot text-red-500 text-xs"></i>
        <span className="text-xs font-bold text-primary truncate max-w-[80px]">
            {currentCity?.name || 'Seleccionar...'}
        </span>
        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/5" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full mt-2 left-0 min-w-[160px] bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Cambiar ciudad</p>
            {mockDb.cities.map(city => (
              <button
                key={city.id}
                onClick={() => {
                  setCityId(city.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center justify-between ${currentCityId === city.id ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-gray-50 text-gray-600'}`}
              >
                <span>{city.name}</span>
                {currentCityId === city.id && <i className="fa-solid fa-check text-[10px]"></i>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
