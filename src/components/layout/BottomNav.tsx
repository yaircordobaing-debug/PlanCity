'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store';

export default function BottomNav() {
  const pathname = usePathname();
  const { isBottomNavVisible } = useAppStore();

  if (!isBottomNavVisible) return null;

  const tabs = [
    { name: 'Inicio', icon: 'fa-solid fa-house', path: '/' },
    { name: 'Explorar', icon: 'fa-solid fa-map-location-dot', path: '/explore' },
    { name: 'CityFeed', icon: 'fa-regular fa-circle-play', path: '/feed' },
    { name: 'Favoritos', icon: 'fa-solid fa-bookmark', path: '/favorites' },
    { name: 'Perfil', icon: 'fa-solid fa-user', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full left-0 bg-primary text-white rounded-t-3xl px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 lg:hidden md:w-[600px] md:rounded-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:py-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== '/');
        // Exception: Feed path always matches exactly
        const isFeedActive = pathname === '/feed';
        const active = tab.path === '/feed' ? isFeedActive : isActive;

        return (
          <Link href={tab.path} key={tab.name}>
            <div className={`flex flex-col items-center gap-1 transition-opacity duration-200 ${active ? 'opacity-100 text-white' : 'opacity-50 hover:opacity-100'}`}>
              <i className={`${tab.icon} text-2xl md:text-xl`}></i>
              <span className="text-[10px] md:font-bold hidden md:block">{tab.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
