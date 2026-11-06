/**
 * PlanCity MVP - Script de Interacciones para la Landing Page
 */

import { loadData } from './dataLoader.js';
import { renderItemCard } from './components.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadData();
  const demoContainer = document.getElementById('landing-demo-grid');
  const filterBtns = document.querySelectorAll('.landing-demo-filter');

  function renderDemo(category = 'all') {
    if (!demoContainer) return;
    const items = data.places_and_events || [];
    const filtered = category === 'all'
      ? items.slice(0, 3)
      : items.filter(i => i.category === category).slice(0, 3);

    demoContainer.innerHTML = filtered.map(item => renderItemCard(item, false)).join('');
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDemo(btn.dataset.category);
      });
    });

    renderDemo('all');
  }

  // Delegación para botón de ver detalle desde el demo -> lleva a app.html
  document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('[data-action="open-detail"]');
    if (detailBtn && !window.location.pathname.includes('app.html')) {
      const id = detailBtn.dataset.id;
      window.location.href = `app.html?item=${id}`;
    }
  });
});
