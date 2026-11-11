import placesAndEventsData from '../../../data/places_and_events.json';
import planCityRawData from '../../../plan_city_data.json';
import { PlanCityEvent, EventFilterOptions } from './types';

// Normaliza los eventos desde los dos datasets editoriales de PlanCity
function loadAllEvents(): PlanCityEvent[] {
  const events: PlanCityEvent[] = [];

  // 1. Cargar desde places_and_events.json (Contenido altamente curado)
  if (placesAndEventsData && Array.isArray(placesAndEventsData.places_and_events)) {
    const rawEvents = placesAndEventsData.places_and_events.filter(
      (item) => item.type === 'evento'
    );

    for (const item of rawEvents) {
      events.push({
        id: item.id,
        title: item.title,
        description: item.description,
        cityId: item.city === 'medellin' ? 'c1' : item.city === 'bogota' ? 'c2' : 'c3',
        cityName: item.city.charAt(0).toUpperCase() + item.city.slice(1),
        category: 'Eventos & Fiestas',
        startDate: new Date().toISOString(),
        scheduleText: item.schedule ? item.schedule.replace('&bull;', '•') : undefined,
        venueName: item.zone || 'Lugar por confirmar',
        address: item.address,
        image: item.image,
        price: item.price || (item.is_free ? 'Entrada Libre' : '$35.000'),
        isFree: Boolean(item.is_free),
        source: 'plancity',
        status: 'published',
        organizer: item.organizer,
        lastVerifiedAt: '2026-11-10',
      });
    }
  }

  // 2. Cargar eventos válidos desde plan_city_data.json
  if (planCityRawData && Array.isArray(planCityRawData.events)) {
    for (const raw of planCityRawData.events) {
      if (raw.status !== 'published') continue;
      // Evitar duplicados si ya existe el ID
      if (events.some((e) => e.id === raw.id)) continue;

      const isFree = Number(raw.price) === 0;
      events.push({
        id: raw.id,
        title: raw.title,
        description: raw.description,
        cityId: raw.city_id,
        category: raw.category || 'Música & Cultura',
        startDate: raw.start_date,
        endDate: raw.end_date,
        venueName: raw.location,
        address: raw.location,
        coordinates: { lat: raw.lat, lng: raw.lng },
        image: raw.image_url,
        price: isFree ? 'Entrada Libre' : `$${Number(raw.price).toLocaleString('es-CO')}`,
        isFree,
        source: 'plancity',
        status: 'published',
        lastVerifiedAt: '2026-11-01',
      });
    }
  }

  return events;
}

export function getPublishedEvents(options?: EventFilterOptions): PlanCityEvent[] {
  let list = loadAllEvents();

  if (options?.cityId && options.cityId !== 'todos') {
    list = list.filter((e) => e.cityId === options.cityId);
  }

  if (options?.category && options.category !== 'todos') {
    const catNorm = options.category.toLowerCase();
    list = list.filter((e) => e.category.toLowerCase().includes(catNorm));
  }

  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export function getEventById(id: string): PlanCityEvent | undefined {
  return loadAllEvents().find((e) => e.id === id);
}

export function getFeaturedEvents(limit = 6): PlanCityEvent[] {
  return getPublishedEvents({ limit });
}
