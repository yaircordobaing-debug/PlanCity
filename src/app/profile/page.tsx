'use client';

import { useAppStore } from '@/store';
import { mockDb } from '@/lib/db';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { role, setRole, savedEvents } = useAppStore();
  const router = useRouter();

  // Get current mock user based on role
  const currentUser = mockDb.users.find(u => {
      const userRoles = mockDb.user_roles.filter(ur => ur.user_id === u.id);
      return userRoles.some(ur => ur.role === role);
  }) || mockDb.users[0];

  const handleRoleChange = (newRole: 'user' | 'organizer' | 'admin') => {
      setRole(newRole);
      if (newRole === 'organizer') {
          router.push('/dashboard');
      } else if (newRole === 'admin') {
          router.push('/admin');
      } else {
          router.push('/profile');
      }
  };

  return (
    <div className="pb-24 bg-primary text-white min-h-full font-sans overflow-y-auto relative isolate">
        
       {/* Decorative Background Shapes */}
       <div className="absolute top-0 left-0 w-full h-48 bg-secondary/50 rounded-b-[50%] transform -translate-y-10 -z-10"></div>
       <div className="absolute bottom-60 right-0 w-64 h-64 bg-accent/30 rounded-t-[100%] rounded-l-[100%] transform translate-x-10 translate-y-20 -z-10 blur-3xl"></div>

       <div className="px-6 pt-12 text-center">
            {/* Avatar Profile */}
            <div className="relative inline-block mb-4 hover:scale-105 transition">
               <img src={currentUser?.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'} className="w-32 h-32 rounded-full border-4 border-accent object-cover mx-auto bg-gray-300 shadow-xl" alt="Profile" />
               <div className="absolute bottom-0 right-2 w-8 h-8 rounded-full bg-blue-500 border-2 border-primary flex items-center justify-center text-xs shadow-md">
                   <i className="fa-solid fa-check text-white"></i>
               </div>
            </div>

            <h1 className="text-3xl font-serif font-bold tracking-wide drop-shadow-md">{currentUser?.name || 'Invitado'}</h1>
            <p className="text-sm text-gray-300 mb-2">{currentUser?.email || 'invitado@plancity.com'}</p>
            
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm mb-8 border border-white/10">
                Rol: {role}
            </div>

            {/* Simulated Settings / Activity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-left mb-8 border border-white/20 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><i className="fa-solid fa-clock-rotate-left text-accent"></i> Actividad Reciente</h3>
                
                <div className="space-y-4">
                    <Link href="/favorites">
                        <div className="flex justify-between items-center group cursor-pointer hover:bg-white/10 p-2 -mx-2 rounded-xl transition">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition"><i className="fa-solid fa-heart"></i></div>
                                <span>Eventos Guardados</span>
                            </div>
                            <span className="font-bold text-lg">{savedEvents.length}</span>
                        </div>
                    </Link>
                    <div className="flex justify-between items-center group cursor-pointer hover:bg-white/10 p-2 -mx-2 rounded-xl transition">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition"><i className="fa-solid fa-ticket"></i></div>
                            <span>Entradas Compradas</span>
                        </div>
                        <span className="font-bold text-lg">2</span>
                    </div>
                </div>
            </div>

            {/* Artist / Organizer Specific Quick Actions */}
            {role === 'organizer' && (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-left mb-8 shadow-lg border border-white/20">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-white"><i className="fa-solid fa-microphone-lines"></i> Funciones Especiales</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex flex-col items-center gap-2 transition border border-white/10">
                            <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                            <span className="text-[10px] font-bold uppercase">Subir Video</span>
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-2xl flex flex-col items-center gap-2 transition border border-white/10">
                            <i className="fa-solid fa-calendar-plus text-xl"></i>
                            <span className="text-[10px] font-bold uppercase">Agendar Show</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Role Switcher Sandbox for PROTOTYPE ONLY */}
            <div className="border-t border-white/20 pt-8 mt-4 text-left">
                <p className="text-xs text-center mb-4 text-gray-300 font-bold uppercase tracking-wider">Cambiar Rol (Demo)</p>
                <div className="space-y-3">
                    <button onClick={() => handleRoleChange('user')} className={`w-full font-bold rounded-2xl py-3.5 transition shadow-lg text-sm flex justify-center items-center gap-2 active:scale-95 ${role === 'user' ? 'bg-white text-primary ring-2 ring-white/50' : 'bg-white/10 hover:bg-white/20'}`}>
                        <i className="fa-solid fa-user"></i> Entrar como Usuario
                    </button>
                    <button onClick={() => handleRoleChange('organizer')} className={`w-full font-bold rounded-2xl py-3.5 transition shadow-lg text-sm flex justify-center items-center gap-2 active:scale-95 ${role === 'organizer' ? 'bg-orange-500 text-white ring-2 ring-orange-500/50' : 'bg-white/10 hover:bg-white/20'}`}>
                        <i className="fa-solid fa-briefcase"></i> Entrar como Organizador (Inlc. Artista)
                    </button>
                    <button onClick={() => handleRoleChange('admin')} className={`w-full font-bold rounded-2xl py-3.5 transition shadow-lg text-sm flex justify-center items-center gap-2 active:scale-95 ${role === 'admin' ? 'bg-red-600 text-white ring-2 ring-red-600/50' : 'bg-white/10 hover:bg-white/20'}`}>
                        <i className="fa-solid fa-shield-halved"></i> Entrar como Admin
                    </button>
                </div>
            </div>
       </div>
    </div>
  );
}
