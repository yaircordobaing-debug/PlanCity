'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store';
import RoleMenu from './RoleMenu';
import CitySwitcher from './CitySwitcher';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAppStore();

  const tabs = [
    { name: 'Inicio', icon: 'fa-solid fa-house', path: '/' },
    { name: 'Explorar', icon: 'fa-solid fa-map-location-dot', path: '/explore' },
    { name: 'CityFeed', icon: 'fa-regular fa-circle-play', path: '/feed' },
    { name: 'Favoritos', icon: 'fa-solid fa-bookmark', path: '/favorites' },
    { name: 'Perfil', icon: 'fa-solid fa-user', path: '/profile' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-gray-100 z-50 fixed left-0 top-0 pt-8 pb-6 px-4">
      <Link href="/" className="flex items-center gap-3 text-primary mb-12 px-2 xl:px-4 transition-transform hover:scale-105">
        <i className="fa-solid fa-building text-3xl xl:text-4xl text-red-600"></i>
        <h1 className="text-2xl xl:text-3xl font-serif font-bold tracking-wide">PlanCity</h1>
      </Link>
      
      <div className="mb-8 px-2 xl:px-4">
          <p className="text-xs xl:text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Tu ubicación</p>
          <div className="scale-110 origin-left ml-2">
            <CitySwitcher />
          </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 xl:gap-3 overflow-y-auto scrollbar-hide">
        <p className="text-xs xl:text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 xl:px-4">Menú de Navegación</p>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== '/');
          const isFeedActive = pathname === '/feed';
          const active = tab.path === '/feed' ? isFeedActive : isActive;

          return (
            <Link href={tab.path} key={tab.name}>
              <div className={`flex items-center gap-4 px-4 py-3 xl:py-4 rounded-2xl transition-all duration-200 ${active ? 'bg-primary text-white shadow-md font-bold' : 'text-gray-500 font-medium hover:bg-gray-100 hover:text-primary'}`}>
                <i className={`${tab.icon} text-xl xl:text-2xl w-6 text-center`}></i>
                <span className="text-[15px] xl:text-[17px]">{tab.name}</span>
              </div>
            </Link>
          );
        })}

        {(role === 'organizer' || role === 'admin') && (
            <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs xl:text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 xl:px-4">Herramientas</p>
                <div className="flex flex-col gap-1 xl:gap-2 px-0">
                    <RoleMenu />
                </div>
            </div>
        )}
      </nav>

      <div className="mt-8 border-t border-gray-200 pt-6 px-2 xl:px-4">
         <Link href="/profile" className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition cursor-pointer group">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" className="w-10 h-10 xl:w-12 xl:h-12 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition" alt="User" />
             <div className="flex-1">
                 <p className="text-sm xl:text-base font-bold text-primary leading-tight group-hover:text-red-600 transition">Laura Gómez</p>
                 <p className="text-xs xl:text-sm text-gray-500 capitalize">{role}</p>
             </div>
             <i className="fa-solid fa-gear text-gray-400 group-hover:text-primary transition xl:text-lg"></i>
         </Link>
      </div>
    </aside>
  );
}
