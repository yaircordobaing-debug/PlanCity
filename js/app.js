/**
 * PlanCity - Controlador Principal de la Aplicación
 * Enfoque en presentación comercial: Inicio, Explorar y CityFeed Visual.
 */

import { loadData, getData } from './dataLoader.js';
import { state } from './state.js';
import {
  renderItemCard,
  renderReelItem,
  renderDetailModal,
  showToast
} from './components.js';

class PlanCityApp {
  constructor() {
    this.modalEl = document.getElementById('app-modal');
    this.views = {
      home: document.getElementById('view-home'),
      explore: document.getElementById('view-explore'),
      feed: document.getElementById('view-feed')
    };

    this.init();
  }

  async init() {
    await loadData();

    // Sincronizar selectores de ciudad
    const citySelect = document.getElementById('city-select');
    const sidebarCitySelect = document.getElementById('sidebar-city-select');
    if (citySelect) citySelect.value = state.currentCity;
    if (sidebarCitySelect) sidebarCitySelect.value = state.currentCity;

    this.setupListeners();
    this.setupSubscriptions();

    this.updateNavigationUI();
    this.renderCurrentView();
  }

  setupListeners() {
    // Selectores de Ciudad
    const handleCityChange = (e) => {
      state.setCity(e.target.value);
      showToast(`Ciudad: ${e.target.options[e.target.selectedIndex].text}`, 'fa-map-pin');
    };

    const citySelect = document.getElementById('city-select');
    const sidebarCitySelect = document.getElementById('sidebar-city-select');
    if (citySelect) citySelect.addEventListener('change', handleCityChange);
    if (sidebarCitySelect) sidebarCitySelect.addEventListener('change', handleCityChange);

    // Buscador
    const searchInputs = document.querySelectorAll('.mvp-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        state.setSearchQuery(e.target.value);
      });
    });

    // Delegación global de clics
    document.addEventListener('click', (e) => {
      // 1. Cambio de vista
      const navBtn = e.target.closest('[data-view-target]');
      if (navBtn) {
        const targetView = navBtn.dataset.viewTarget;
        if (this.views[targetView]) {
          state.setView(targetView);
        }
        return;
      }

      // 2. Acciones interactivas
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;

      const action = actionEl.dataset.action;

      if (action === 'open-detail') {
        const id = actionEl.dataset.id;
        this.openModal(id);
      }

      if (action === 'close-modal') {
        this.closeModal();
      }

      if (action === 'book-item') {
        const id = actionEl.dataset.id;
        state.bookItem(id);
        showToast('¡Asistencia confirmada con éxito!', 'fa-circle-check');
        this.openModal(id);
      }

      if (action === 'toggle-like') {
        const id = actionEl.dataset.id;
        const liked = state.toggleLike(id);
        showToast(liked ? '¡Te gusta este lugar!' : 'Me gusta retirado', 'fa-heart');
      }

      if (action === 'share-item') {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast('Enlace copiado al portapapeles 📋', 'fa-share-nodes');
        } else {
          showToast('Compartiendo experiencia...', 'fa-share-nodes');
        }
      }

      if (action === 'select-category') {
        const cat = actionEl.dataset.category;
        state.setCategory(cat);
      }
    });

    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  setupSubscriptions() {
    state.addEventListener('viewChanged', () => {
      this.updateNavigationUI();
      this.renderCurrentView();
      const scrollArea = document.querySelector('.scroll-view-area');
      if (scrollArea) scrollArea.scrollTop = 0;
    });

    state.addEventListener('filterChanged', () => {
      this.renderCurrentView();
    });

    state.addEventListener('cityChanged', () => {
      const citySelect = document.getElementById('city-select');
      const sidebarCitySelect = document.getElementById('sidebar-city-select');
      if (citySelect) citySelect.value = state.currentCity;
      if (sidebarCitySelect) sidebarCitySelect.value = state.currentCity;
      this.renderCurrentView();
    });

    state.addEventListener('likeToggled', () => {
      if (state.currentView === 'feed') {
        this.renderFeedView();
      }
    });
  }

  updateNavigationUI() {
    const current = state.currentView;

    document.querySelectorAll('.desktop-sidebar .sidebar-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewTarget === current);
    });

    document.querySelectorAll('.mobile-bottom-bar .bottom-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewTarget === current);
    });

    Object.keys(this.views).forEach(key => {
      if (this.views[key]) {
        this.views[key].classList.toggle('active', key === current);
      }
    });
  }

  renderCategoryPills(activeCat) {
    const data = getData();
    return (data.categories || []).map(cat => `
      <button class="pill-filter-btn ${activeCat === cat.id ? 'active' : ''}" 
              data-action="select-category" 
              data-category="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
      </button>
    `).join('');
  }

  renderCurrentView() {
    switch (state.currentView) {
      case 'home': this.renderHomeView(); break;
      case 'explore': this.renderExploreView(); break;
      case 'feed': this.renderFeedView(); break;
    }
  }

  renderHomeView() {
    const container = this.views.home;
    if (!container) return;

    const filtered = state.getFilteredItems();
    const eventsOnly = filtered.filter(i => i.type === 'evento' || i.type === 'tours');
    const spotsOnly = filtered.filter(i => i.type !== 'evento' && i.type !== 'tours');

    container.innerHTML = `
      <!-- Buscador Global Estilo Insightlancer -->
      <div class="search-input-pill">
        <i class="fa-solid fa-search" style="color:var(--pc-purple); font-size:1.05rem;"></i>
        <input type="text" class="mvp-search-input" placeholder="Buscar parches, eventos, restaurantes, bares..." value="${state.searchQuery}" />
      </div>

      <!-- Banner Destacado / Live Concert (Insightlancer Style) -->
      <div class="featured-hero-card" style="background-image: url('https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1100&h=450&fit=crop');">
        <div class="featured-overlay"></div>
        <div class="featured-content">
          <span class="featured-pill-top">
            <i class="fa-solid fa-circle" style="color:#22C55E; font-size:0.55rem;"></i> Evento Destacado
          </span>
          <h2 class="featured-title">Noche de Jazz & Coctelería en Provenza</h2>
          <div class="featured-meta">
            <span><i class="fa-regular fa-calendar-check" style="color:var(--pc-orange);"></i> Viernes &bull; 8:00 PM</span>
            <span><i class="fa-solid fa-location-dot" style="color:var(--pc-orange);"></i> El Poblado</span>
          </div>
          <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <button class="btn-pc-primary" data-action="open-detail" data-id="item-01">
              Reservar Entrada <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button class="btn-pc-secondary" style="background:rgba(255,255,255,0.2); color:#fff; border-color:rgba(255,255,255,0.3); backdrop-filter:blur(8px);" data-view-target="feed">
              <i class="fa-solid fa-play"></i> Ver CityFeed
            </button>
          </div>
        </div>
      </div>

      <!-- Píldoras de Categorías -->
      <div class="category-pills-row hide-scroll">
        ${this.renderCategoryPills(state.currentCategory)}
      </div>

      <!-- Sección: Próximos Eventos -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="font-size:1.35rem; font-weight:800; color:var(--pc-text-dark);">Próximos Eventos & Conciertos</h3>
        <span style="font-size:0.85rem; font-weight:700; color:var(--pc-purple); cursor:pointer;" data-view-target="explore">Ver todos &rarr;</span>
      </div>

      <div class="events-cards-grid">
        ${eventsOnly.length > 0
          ? eventsOnly.slice(0, 4).map(item => renderItemCard(item)).join('')
          : `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--pc-text-muted);">No hay eventos en esta categoría.</div>`
        }
      </div>

      <!-- Sección: Restaurantes, Bares & Sitios -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; margin-top:10px;">
        <h3 style="font-size:1.35rem; font-weight:800; color:var(--pc-text-dark);">Restaurantes, Rooftops & Parques</h3>
        <span style="font-size:0.85rem; font-weight:700; color:var(--pc-purple); cursor:pointer;" data-view-target="explore">Ver catálogo &rarr;</span>
      </div>

      <div class="events-cards-grid">
        ${spotsOnly.length > 0
          ? spotsOnly.slice(0, 6).map(item => renderItemCard(item)).join('')
          : `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--pc-text-muted);">No hay sitios disponibles para este filtro.</div>`
        }
      </div>
    `;
  }

  renderExploreView() {
    const container = this.views.explore;
    if (!container) return;

    const filtered = state.getFilteredItems();

    container.innerHTML = `
      <div style="margin-bottom:20px;">
        <h2 style="font-size:1.8rem; font-weight:900; color:var(--pc-text-dark); margin-bottom:4px;">Explorar Catálogo</h2>
        <p style="font-size:0.92rem; color:var(--pc-text-muted);">Encuentra experiencias activas y lugares emblemáticos en ${state.currentCity.toUpperCase()}.</p>
      </div>

      <div class="search-input-pill">
        <i class="fa-solid fa-search" style="color:var(--pc-purple); font-size:1.05rem;"></i>
        <input type="text" class="mvp-search-input" placeholder="Buscar por nombre, zona o categoría..." value="${state.searchQuery}" />
      </div>

      <div class="category-pills-row hide-scroll">
        ${this.renderCategoryPills(state.currentCategory)}
      </div>

      <div style="margin-bottom:18px; font-size:0.88rem; font-weight:700; color:var(--pc-text-muted);">
        Mostrando <span style="color:var(--pc-purple);">${filtered.length}</span> experiencias disponibles
      </div>

      <div class="events-cards-grid">
        ${filtered.length > 0
          ? filtered.map(item => renderItemCard(item)).join('')
          : `<div style="grid-column:1/-1; background:#ffffff; border-radius:var(--radius-lg); padding:50px; text-align:center; color:var(--pc-text-muted); border:1px solid var(--pc-border);">
               <i class="fa-solid fa-compass" style="font-size:2.5rem; margin-bottom:12px; color:var(--pc-purple);"></i>
               <h4 style="font-size:1.2rem; color:var(--pc-text-dark); margin-bottom:6px;">No se encontraron resultados</h4>
               <p>Prueba buscando con otros términos o selecciona "Todos los Planes".</p>
             </div>`
        }
      </div>
    `;
  }

  renderFeedView() {
    const container = this.views.feed;
    if (!container) return;

    const data = getData();
    const items = data.places_and_events || [];

    container.innerHTML = `
      <div style="text-align:center; margin-bottom:16px;">
        <span style="font-size:0.75rem; font-weight:800; background:rgba(107, 17, 244, 0.08); border:1px solid rgba(107, 17, 244, 0.2); padding:4px 14px; border-radius:var(--radius-full); text-transform:uppercase; color:var(--pc-purple);">
          <i class="fa-solid fa-sparkles" style="color:var(--pc-orange);"></i> CityFeed Visual
        </span>
        <h2 style="font-size:1.45rem; font-weight:800; margin-top:6px; color:var(--pc-text-dark);">Descubre la Ciudad en Pantalla Completa</h2>
        <p style="font-size:0.88rem; color:var(--pc-text-muted);">Desliza hacia arriba para descubrir restaurantes, bares, parques y eventos urbanos.</p>
      </div>

      <div class="cityfeed-reel-container">
        <div class="cityfeed-reel-scroller hide-scroll">
          ${items.map(item => renderReelItem(item, state.isLiked(item.id))).join('')}
        </div>
      </div>
    `;
  }

  openModal(id) {
    const item = state.getItemById(id);
    if (!item || !this.modalEl) return;

    this.modalEl.innerHTML = renderDetailModal(item, state.isBooked(item.id));
    this.modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('open');
    this.modalEl.innerHTML = '';
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PlanCityApp();
});
