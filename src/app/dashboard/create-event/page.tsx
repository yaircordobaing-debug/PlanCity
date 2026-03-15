'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/api';
import { useAppStore } from '@/store';

const PREDEFINED_IMAGES = [
    'https://images.unsplash.com/photo-1540039155733-d710d0cce3a5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
];

export default function CreateEventPage() {
  const router = useRouter();
  const { currentCityId } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      title: '',
      category: 'Arte',
      location: '',
      date: '',
      price: '',
      description: '',
      images: [PREDEFINED_IMAGES[0]]
  });

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
          // Prepare data with all required EventType fields
          const newEventData = {
              title: formData.title,
              category: formData.category,
              location: formData.location,
              city_id: currentCityId,
              lat: 6.2442, // Default Medellín coords for demo
              lng: -75.5812,
              organizer_id: 'u1', // Mock current user
              start_date: new Date(formData.date).toISOString(),
              end_date: new Date(new Date(formData.date).getTime() + 3 * 60 * 60 * 1000).toISOString(), // +3 hours
              price: Number(formData.price) || 0,
              capacity: 100,
              description: formData.description,
              image_url: formData.images[0],
              type: 'public',
              status: 'published'
          };

          await createEvent(newEventData);
          router.push('/dashboard');
      } catch (error) {
          console.error('Error creating event', error);
          setLoading(false);
      }
  };

  return (
    <div className="px-4 py-6 md:px-8 pb-32 relative bg-gray-50 min-h-full">
      <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} type="button" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-primary text-lg hover:scale-105 transition">
             <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="text-2xl font-serif font-bold text-primary">Crear Evento</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200">
          
          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Título del Evento</label>
              <input 
                 type="text" 
                 required
                 value={formData.title}
                 onChange={e => setFormData({...formData, title: e.target.value})}
                 placeholder="Ej. Concierto al Aire Libre" 
                 className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" 
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                  <select 
                     value={formData.category}
                     onChange={e => setFormData({...formData, category: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  >
                      <option>Arte</option>
                      <option>Música</option>
                      <option>Gastronomía</option>
                      <option>Turismo</option>
                      <option>Fiesta</option>
                  </select>
              </div>
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ubicación</label>
                  <input 
                     type="text" 
                     required
                     value={formData.location}
                     onChange={e => setFormData({...formData, location: e.target.value})}
                     placeholder="Ej. Provenza" 
                     className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary transition" 
                  />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fecha y Hora</label>
                  <input 
                     type="datetime-local" 
                     required
                     value={formData.date}
                     onChange={e => setFormData({...formData, date: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary transition text-sm" 
                  />
              </div>
              <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Precio (COP)</label>
                  <input 
                     type="number" 
                     value={formData.price}
                     onChange={e => setFormData({...formData, price: e.target.value})}
                     placeholder="0 = Gratis" 
                     className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary transition" 
                  />
              </div>
          </div>

          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
              <textarea 
                 rows={3} 
                 required
                 value={formData.description}
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 placeholder="Describe la experiencia para los asistentes..." 
                 className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-primary transition resize-none"
              ></textarea>
          </div>

          <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Imagen de Portada</label>
              
              {/* Image Preview Selector for Demo */}
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x mb-2">
                 {PREDEFINED_IMAGES.map((img, idx) => (
                    <img 
                       key={idx}
                       src={img}
                       onClick={() => setFormData({...formData, images: [img]})}
                       className={`w-24 h-24 object-cover rounded-xl shrink-0 snap-start cursor-pointer border-2 transition-all ${formData.images[0] === img ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    />
                 ))}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-[2rem] p-6 text-center bg-gray-50 mt-2">
                  <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mb-2 shadow-sm mx-auto">
                      <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Selecciona una imagen arriba</p>
                  <p className="text-xs text-gray-400 mt-1">Para el prototipo usamos imágenes predefinidas</p>
              </div>
          </div>

          <button 
             type="submit" 
             disabled={loading}
             className="w-full bg-primary text-white font-bold rounded-2xl py-4 mt-4 hover:bg-secondary transition shadow-[0_10px_20px_-10px_rgba(30,41,59,0.5)] text-lg flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
              {loading ? (
                  <><i className="fa-solid fa-spinner animate-spin"></i> Publicando...</>
              ) : 'Publicar Evento'}
          </button>
      </form>
    </div>
  );
}
