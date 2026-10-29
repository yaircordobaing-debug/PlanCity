/**
 * PlanCity - Componentes de Interfaz Oficiales
 * Inspirado en el UI Kit de Insightlancer & Paya.
 * Enfoque en presentación comercial (sin favoritos ni perfil).
 */

/**
 * Renderiza la tarjeta de un evento, restaurante, bar, parque o sitio
 */
export function renderItemCard(item) {
  const priceDisplay = item.is_free
    ? `<span class="event-price-tag free">Entrada Libre</span>`
    : `<span class="event-price-tag">${item.price}</span>`;

  return `
    <article class="event-box-card" data-item-id="${item.id}">
      <div class="event-card-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <span class="event-badge-tag">${item.badge || item.category.toUpperCase()}</span>
      </div>

      <div class="event-card-body">
        <div>
          <div class="event-card-date">
            <i class="fa-regular fa-calendar-check"></i>
            <span>${item.schedule}</span>
          </div>

          <h3 class="event-card-title">${item.title}</h3>
          
          <div class="event-card-location">
            <i class="fa-solid fa-location-dot" style="color:var(--pc-orange);"></i>
            <span>${item.address} &bull; <strong>${item.zone}</strong></span>
          </div>
        </div>

        <div class="event-card-bottom">
          <!-- Avatares de asistentes estilo Insightlancer -->
          <div class="avatar-stack-joined">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop" alt="Asistente" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" alt="Asistente" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" alt="Asistente" />
            <span class="avatar-joined-text">+${item.reviews_count || 120} van</span>
          </div>

          <div>
            ${priceDisplay}
          </div>
        </div>

        <button class="btn-pc-primary" style="width:100%; margin-top:14px; padding:8px 16px; font-size:0.85rem;" data-action="open-detail" data-id="${item.id}">
          Ver Detalle &bull; Reservar <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
        </button>
      </div>
    </article>
  `;
}

/**
 * Renderiza una tarjeta de pantalla completa para el CityFeed Visual
 * (Formato Reels para explorar restaurantes, bares, parques y eventos sin videos)
 */
export function renderReelItem(item, isLiked = false) {
  return `
    <div class="cityfeed-reel-item" style="background-image: url('${item.image}');" data-item-id="${item.id}">
      <div class="reel-gradient-overlay"></div>

      <div class="reel-info-content">
        <div class="reel-category-pill">
          <i class="fa-solid fa-sparkles" style="color:var(--pc-orange);"></i>
          <span>${item.badge || item.category.toUpperCase()}</span>
        </div>

        <h3 class="reel-title">${item.title}</h3>

        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:#f1f5f9; margin-bottom:8px;">
          <i class="fa-solid fa-location-dot" style="color:var(--pc-orange);"></i>
          <span>${item.address} (${item.zone})</span>
        </div>

        <p class="reel-desc">${item.description}</p>

        <div style="display:flex; gap:12px; align-items:center; margin-top:12px;">
          <button class="btn-pc-primary" style="padding:10px 22px; font-size:0.88rem;" data-action="open-detail" data-id="${item.id}">
            <i class="fa-solid fa-ticket"></i> Ver Experiencia Completa
          </button>
          <span style="font-size:0.88rem; font-weight:800; color:#ffffff;">${item.price}</span>
        </div>
      </div>

      <!-- Acciones de Interacción Lateral -->
      <div class="reel-actions-column">
        <button class="reel-action-btn ${isLiked ? 'liked' : ''}" data-action="toggle-like" data-id="${item.id}" title="Me gusta">
          <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          <span>${isLiked ? item.likes + 1 : item.likes}</span>
        </button>

        <button class="reel-action-btn" data-action="share-item" data-id="${item.id}" title="Compartir">
          <i class="fa-solid fa-share-nodes"></i>
          <span>Compartir</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Renderiza el modal de detalle completo inspirado en Insightlancer Detail Screen
 */
export function renderDetailModal(item, isBooked = false) {
  const featuresList = (item.features || [])
    .map(f => `<span style="display:inline-flex; align-items:center; gap:6px; background:var(--pc-bg-light); border:1px solid var(--pc-border); padding:6px 14px; border-radius:var(--radius-full); font-size:0.82rem; font-weight:700;"><i class="fa-solid fa-check" style="color:var(--pc-purple);"></i> ${f}</span>`)
    .join(' ');

  return `
    <div class="mvp-modal-sheet">
      <button class="modal-close-icon" data-action="close-modal" aria-label="Cerrar">
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <img class="modal-header-image" src="${item.image}" alt="${item.title}" />

      <div class="modal-inner-content">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="background:rgba(107, 17, 244, 0.1); color:var(--pc-purple); font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:var(--radius-full); text-transform:uppercase;">
            ${item.category}
          </span>
          <span style="font-size:0.88rem; font-weight:700; color:var(--pc-text-muted);">
            <i class="fa-solid fa-star" style="color:var(--pc-orange);"></i> ${item.rating} (${item.reviews_count} reseñas)
          </span>
        </div>

        <h2 style="font-size:1.65rem; font-weight:800; margin-bottom:12px; color:var(--pc-text-dark); line-height:1.2;">
          ${item.title}
        </h2>

        <!-- Fecha, Horario y Ubicación -->
        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:18px; font-size:0.92rem; color:var(--pc-text-muted);">
          <div style="display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-location-dot" style="color:var(--pc-orange); width:18px;"></i>
            <span><strong>${item.address}</strong> &bull; ${item.zone}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <i class="fa-regular fa-clock" style="color:var(--pc-purple); width:18px;"></i>
            <span>${item.schedule}</span>
          </div>
        </div>

        <!-- Asistentes confirmados -->
        <div style="display:flex; align-items:center; gap:12px; background:var(--pc-bg-light); padding:12px 16px; border-radius:var(--radius-md); margin-bottom:20px;">
          <div class="avatar-stack-joined">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop" alt="Asistente" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" alt="Asistente" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" alt="Asistente" />
          </div>
          <span style="font-size:0.85rem; font-weight:700; color:var(--pc-purple);">
            +${item.reviews_count || 120} personas confirmadas
          </span>
        </div>

        <!-- Acerca de -->
        <div style="margin-bottom:20px;">
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--pc-text-dark); margin-bottom:8px;">Acerca de este plan</h4>
          <p style="font-size:0.92rem; color:var(--pc-text-muted); line-height:1.6;">${item.description}</p>
        </div>

        <!-- Servicios / Comodidades -->
        <div style="margin-bottom:24px;">
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--pc-text-dark); margin-bottom:8px;">Servicios y Comodidades</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${featuresList}
          </div>
        </div>

        <!-- Tarjeta de Organizador / Contacto -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding:14px; border:1px solid var(--pc-border); border-radius:var(--radius-md); margin-bottom:20px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" style="width:40px; height:40px; border-radius:var(--radius-full); object-fit:cover;" alt="Organizador" />
            <div>
              <div style="font-weight:800; font-size:0.92rem;">${item.organizer || 'Organizador Aliado'}</div>
              <div style="font-size:0.75rem; color:var(--pc-text-muted);">Anfitrión Verificado &bull; PlanCity</div>
            </div>
          </div>
          <button style="width:36px; height:36px; border-radius:var(--radius-full); background:rgba(107, 17, 244, 0.1); color:var(--pc-purple); display:flex; align-items:center; justify-content:center;" onclick="alert('Contactando con ${item.organizer || 'el anfitrión'}...');">
            <i class="fa-solid fa-comment-dots"></i>
          </button>
        </div>

        <!-- Sticky Bottom Bar -->
        <div class="modal-sticky-bottom">
          <div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--pc-text-muted); text-transform:uppercase;">Tarifa</div>
            <div style="font-size:1.25rem; font-weight:900; color:var(--pc-purple);">${item.price}</div>
          </div>

          <button class="btn-pc-primary" style="padding:12px 30px; font-size:0.95rem;" data-action="book-item" data-id="${item.id}">
            <i class="fa-solid ${isBooked ? 'fa-circle-check' : 'fa-ticket'}"></i>
            ${isBooked ? '¡Confirmado!' : 'Reservar / Me Apunto'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Toast flotante
 */
export function showToast(msg, icon = 'fa-check') {
  const existing = document.querySelector('.toast-msg-box');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg-box';
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--pc-orange);"></i> <span>${msg}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}
