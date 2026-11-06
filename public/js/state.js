/**
 * PlanCity - Gestor de Estado Modular
 * Enfoque en descubrimiento: Inicio, Explorar y CityFeed Visual.
 */

import { getData } from './dataLoader.js';

class StateStore extends EventTarget {
  constructor() {
    super();
    this.currentCity = localStorage.getItem('mvp_plancity_city') || 'medellin';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentView = 'home';
    
    this.likes = new Set(this.loadSet('mvp_likes', ['item-05']));
    this.bookings = new Set(this.loadSet('mvp_bookings', []));
  }

  loadSet(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  saveSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }

  emit(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  setCity(cityId) {
    this.currentCity = cityId;
    localStorage.setItem('mvp_plancity_city', cityId);
    this.emit('cityChanged', { city: cityId });
  }

  setCategory(catId) {
    this.currentCategory = catId;
    this.emit('filterChanged', { category: catId });
  }

  setSearchQuery(q) {
    this.searchQuery = q.trim().toLowerCase();
    this.emit('filterChanged', { query: this.searchQuery });
  }

  setView(viewName) {
    this.currentView = viewName;
    this.emit('viewChanged', { view: viewName });
  }

  toggleLike(id) {
    let liked = false;
    if (this.likes.has(id)) {
      this.likes.delete(id);
      liked = false;
    } else {
      this.likes.add(id);
      liked = true;
    }
    this.saveSet('mvp_likes', this.likes);
    this.emit('likeToggled', { id, liked });
    return liked;
  }

  isLiked(id) {
    return this.likes.has(id);
  }

  bookItem(id) {
    this.bookings.add(id);
    this.saveSet('mvp_bookings', this.bookings);
    this.emit('itemBooked', { id });
    return true;
  }

  isBooked(id) {
    return this.bookings.has(id);
  }

  getFilteredItems() {
    const data = getData();
    const items = data.places_and_events || [];

    return items.filter(item => {
      const matchCity = !item.city || item.city === this.currentCity;
      const matchCat = this.currentCategory === 'all' || item.category === this.currentCategory;
      const q = this.searchQuery;
      const matchQuery = !q ||
        item.title.toLowerCase().includes(q) ||
        (item.zone && item.zone.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.organizer && item.organizer.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      return matchCity && matchCat && matchQuery;
    });
  }

  getItemById(id) {
    const data = getData();
    return (data.places_and_events || []).find(item => item.id === id) || null;
  }
}

export const state = new StateStore();
