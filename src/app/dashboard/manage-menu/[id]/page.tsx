'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getRestaurantById } from '@/lib/api';
import { BusinessProfile, MenuItem, mockDb } from '@/lib/db';

export default function ManageMenuPage() {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id as string;
  
  const [restaurant, setRestaurant] = useState<BusinessProfile | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    getRestaurantById(restaurantId).then(res => {
        if (res) {
            setRestaurant(res);
            // Simular búsqueda de items de menú vinculados
            const items = mockDb.menu_items.filter(item => {
                const menu = mockDb.menus.find(m => m.business_profile_id === res.id);
                return menu ? item.menu_id === menu.id : false;
            });
            setMenuItems(items);
        }
        setLoading(false);
    });
  }, [restaurantId]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item: MenuItem = {
        id: `mi${Date.now()}`,
        menu_id: 'm1', // mock
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
        category: 'Nuevo'
    };

    setMenuItems([item, ...menuItems]);
    setNewItem({ name: '', description: '', price: '' });
    setShowAddForm(false);
  };

  if (loading) return <div className="p-10 text-center">Cargando gestión de menú...</div>;
  if (!restaurant) return <div className="p-10 text-center">Restaurante no encontrado.</div>;

  return (
    <div className="px-4 py-6 pb-32">
      <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
             <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-2xl font-serif font-bold text-primary">Gestionar Menú</h2>
      </div>

      <div className="bg-primary text-white p-6 rounded-[2rem] mb-8 shadow-lg">
          <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
          <p className="text-xs opacity-80 mb-4">{restaurant.address}</p>
          <button 
             onClick={() => setShowAddForm(true)}
             className="bg-white text-primary px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2">
              <i className="fa-solid fa-plus"></i> Añadir plato / producto
          </button>
      </div>

      {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl scale-in">
                  <h3 className="text-xl font-bold mb-6 text-primary">Nuevo Ítem del Menú</h3>
                  <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nombre</label>
                          <input 
                             type="text" 
                             required
                             value={newItem.name}
                             onChange={e => setNewItem({...newItem, name: e.target.value})}
                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-primary"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Precio (COP)</label>
                          <input 
                             type="number" 
                             required
                             value={newItem.price}
                             onChange={e => setNewItem({...newItem, price: e.target.value})}
                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-primary"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Descripción</label>
                          <textarea 
                             value={newItem.description}
                             onChange={e => setNewItem({...newItem, description: e.target.value})}
                             className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-primary resize-none"
                             rows={2}
                          />
                      </div>
                      <div className="flex gap-3 pt-4">
                          <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3 font-bold text-gray-400">Cancelar</button>
                          <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-2xl font-bold shadow-md">Guardar</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      <div className="grid grid-cols-1 gap-4">
          {menuItems.map(item => (
              <div key={item.id} className="bg-white p-3 border border-gray-200 rounded-3xl flex gap-4 items-center">
                  <img src={item.image_url} className="w-20 h-20 rounded-2xl object-cover bg-gray-100" />
                  <div className="flex-1">
                      <h4 className="font-bold text-primary">{item.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                      <p className="text-sm font-bold text-green-600 mt-1">${item.price.toLocaleString()}</p>
                  </div>
                  <button className="text-gray-400 px-3 hover:text-red-500 transition">
                      <i className="fa-solid fa-trash-can"></i>
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
}
