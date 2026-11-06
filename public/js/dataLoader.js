/**
 * PlanCity MVP - Módulo Cargador de Datos desde JSON
 * Lee de forma asíncrona el archivo 'data/places_and_events.json'
 * y ofrece un fallback seguro si se abre sin servidor local.
 */

let cachedData = null;

// Fallback embebido para garantizar funcionamiento incluso si fetch local falla
const fallbackData = {
  cities: [
    { id: "medellin", name: "Medellín", country: "Colombia" },
    { id: "bogota", name: "Bogotá", country: "Colombia" },
    { id: "cali", name: "Cali", country: "Colombia" }
  ],
  categories: [
    { id: "all", name: "Todos los Planes", icon: "fa-compass" },
    { id: "eventos", name: "Eventos & Fiestas", icon: "fa-calendar-days" },
    { id: "restaurantes", name: "Restaurantes", icon: "fa-utensils" },
    { id: "bares", name: "Bares & Rooftops", icon: "fa-martini-glass-citrus" },
    { id: "parques", name: "Parques & Naturaleza", icon: "fa-tree" },
    { id: "sitios", name: "Sitios & Cultura", icon: "fa-landmark" },
    { id: "tours", name: "Tours Urbanos", icon: "fa-route" }
  ],
  places_and_events: []
};

export async function loadData() {
  if (cachedData) return cachedData;

  try {
    const response = await fetch('data/places_and_events.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    cachedData = await response.json();
    console.log('✅ Datos cargados exitosamente desde data/places_and_events.json:', cachedData.places_and_events.length, 'ítems');
    return cachedData;
  } catch (err) {
    console.warn('⚠️ No se pudo cargar el archivo data/places_and_events.json via fetch, usando respaldo interno:', err);
    cachedData = fallbackData;
    return cachedData;
  }
}

export function getData() {
  return cachedData || fallbackData;
}
