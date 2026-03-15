'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRestaurantById, getMenuItems } from '@/lib/api';
import { BusinessProfile, MenuItem } from '@/lib/db';
import { motion } from 'framer-motion';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<BusinessProfile | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  useEffect(() => {
    const fetchData = async () => {
        const data = await getRestaurantById(id as string);
        if (data) {
            setRestaurant(data);
            const items = await getMenuItems(data.id);
            setMenuItems(items);
        }
        setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full w-full bg-gray-50 animate-pulse flex flex-col">
        <div className="h-72 bg-gray-200"></div>
        <div className="p-6 space-y-4">
           <div className="h-8 bg-gray-200 rounded-full w-3/4"></div>
           <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
           <div className="h-20 bg-gray-200 rounded-[2rem] w-full mt-8"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4 text-2xl"><i className="fa-solid fa-utensils"></i></div>
        <h2 className="text-xl font-bold text-primary mb-2">Restaurante no encontrado</h2>
        <p className="text-gray-500 mb-6">El restaurante que buscas no existe o ha sido retirado.</p>
        <button onClick={() => router.back()} className="text-primary font-bold">Volver</button>
      </div>
    );
  }

  const ratingValue = typeof restaurant.rating === 'string' ? parseFloat(restaurant.rating) : restaurant.rating;
  const categories = ['Todas', ...Array.from(new Set(menuItems.map(item => item.category)))];
  const filteredItems = activeCategory === 'Todas' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pb-24 bg-gray-50 min-h-full font-sans">
      {/* Header Image */}
      <div className="relative h-72 w-full bg-black rounded-b-[3rem] overflow-hidden shadow-sm">
        <img 
           src={'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'} 
           alt={restaurant.name} 
           className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
        
        <button 
           onClick={() => router.back()}
           className="absolute top-6 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition z-10">
           <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="absolute bottom-6 left-6 right-6">
           <div className="inline-block bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              {restaurant.type}
           </div>
           <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md leading-tight">{restaurant.name}</h1>
           <p className="text-gray-200 text-sm mt-1 drop-shadow-sm"><i className="fa-solid fa-location-dot text-red-400 mr-2"></i>{restaurant.address}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-8">
         {/* Stats */}
         <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex justify-around items-center">
             <div className="text-center">
                 <p className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                     <i className="fa-solid fa-star text-yellow-500 text-lg"></i> {ratingValue.toFixed(1)}
                 </p>
                 <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Calificación</p>
             </div>
             <div className="w-px h-10 bg-gray-200"></div>
             <div className="text-center">
                 <p className="text-2xl font-bold text-primary">{menuItems.length}</p>
                 <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">Platos</p>
             </div>
         </div>

         {/* Info Sections */}
         <div>
             <h3 className="text-lg font-bold text-primary mb-3">Descripción</h3>
             <p className="text-sm text-gray-600 leading-relaxed italic">
                 {restaurant.description || "Un espacio increíble para disfrutar de la mejor gastronomía en la ciudad. Ideal para citas, reuniones de negocios o disfrutar con amigos."}
             </p>
         </div>

         {/* Menu Section */}
         <div>
             <h3 className="text-xl font-serif font-bold text-primary mb-4">Carta / Menú</h3>
             
             {/* Menu Categories */}
             <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide snap-x">
                 {categories.map((cat, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className={`snap-start whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        {cat}
                    </button>
                 ))}
             </div>

             {/* Menu Items Grid */}
             {filteredItems.length === 0 ? (
                 <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-300">
                     <p className="text-gray-400 text-sm">Próximamente estaremos añadiendo más platos.</p>
                 </div>
             ) : (
                <div className="space-y-4">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition group">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                                <img src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'} className="w-full h-full object-cover transition group-hover:scale-110" alt={item.name} />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-primary">{item.name}</h4>
                                    <span className="text-accent font-bold">${item.price}</span>
                                </div>
                                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
             )}
         </div>

         {/* Reservations CTA */}
         <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-3">
             <i className="fa-solid fa-utensils"></i> HACER UNA RESERVA
         </button>
      </div>
    </div>
  );
}
