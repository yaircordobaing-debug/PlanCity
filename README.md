# PlanCity MVP (Versión 2.0)

**PlanCity** es una plataforma social hiperlocal y motor de descubrimiento de ciudades. Este MVP 2.0 ha sido reconstruido bajo una arquitectura moderna sin servidor físico tradicional pero operando 100% como una plataforma funcional a través de un **JSON Mock Masivo (`plan_city_data.json`)**. Esto permite a los desarrolladores de Frontend y Backend construir flujos y pantallas reales con la máxima fidelidad y experiencia de usuario asíncrona antes de conectar a una base de datos real.

![PlanCity Splash](https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&h=400&fit=crop)

---

## 🚀 Objetivos del Proyecto

- Reemplazar mockups estáticos por código funcional y componentes escalables.
- Simular interacciones de red complejas (likes, compras de entradas, creación de eventos) usando solo JSON como estado global.
- Dar soporte absoluto a **Múltiples Roles por Usuario** (Un usuario puede ser Administrador, Organizador y Turista simultáneamente).
- Experimentar flujos complejos como un feed infinito (estilo TikTok), módulos de pagos simulados y validación de QR.

---

## 🛠️ Stack Tecnológico

1. **Framework Principal**: [Next.js 16](https://nextjs.org/) (App Router)
2. **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) para modelado estricto de las entidades de dominio provenientes del JSON.
3. **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) configurado con estilos unificados y variables (`primary`, `accent`).
4. **Manejo de Estado**: [Zustand](https://zustand-demo.pmnd.rs/) para sincronización del usuario en sesión, notificaciones persistentes y UI stores.
5. **Animaciones Fluidas**: [Framer Motion](https://www.framer.com/motion/) simulando navegación y transiciones de Apps iOS/Android.

---

## 📂 Estructura de Módulos del Sistema y Vistas Implementadas

La estructura base está dentro de `src/`:

- `app/` (Next.js Routes): Contiene divisiones claras por dominio de la aplicación:
  - `home/`: Pantalla de inicio con geolocalización simulada y categorización rápida.
  - `explore/`: Visualización en catálogo y mapa de eventos.
  - `feed/`: **Módulo Clave** (CityFeed). Scroll vertical infinito bloqueando la interfaz para visualización inmersiva de videos.
  - `event/[id]`, `restaurant/[id]`, `profile/[id]`: Páginas dinámicas detalladas renderizadas mediante el ID del JSON local.
  - `dashboard/`: Entorno de Organizadores.
  - `admin/`: Entorno de Administrador Global.

- `components/`:
  - `ui/`: Botones, inputs, modales, alertas (Toasts).
  - `events/`: \`EventCard\`, \`RestaurantCard\`.
  - `feed/`: \`VideoCard\` (Para las interacciones de los videos).
  - `layout/`: Navigations, \`Sidebar\` y \`Header\`.

---

## 👥 Flujos y Roles de Usuario 

El sistema incluye tres perfiles de usuarios. **Un usuario puede poseer uno o varios roles simultáneamente**, los cuales se gestionan mediante el arreglo relacional \`user_roles\` en el JSON.

### 1️⃣ Usuario (Local/Turista)
- **Casos de uso**: Inicia sesión, interactúa con su "Home" local basado en su ciudad configurada (e.g. "Medellín"). Puede buscar eventos por GPS o catálogo, ver restaurantes y comprar **Tickets** virtuales.
- **Acciones Core**:
  - Dar Me Gusta a videos, comentar y guardarlos en Favoritos.
  - Seguir Artistas (`artist_profiles`) u organizaciones.
  - Generación de Tickets con "QR Simulated" después del checkout.

### 2️⃣ Organizador
- **Casos de uso**: Accede al `/dashboard`. Revisa estadísticas avanzadas (ingresos, vistas de evento `event_views`).
- **Acciones Core**:
  - Crea `business_profiles` (ej. un Restaurante o Discoteca).
  - Crea `events` relacionándoles `artist_profiles`.
  - Configura `menus` vinculados al negocio.
  - Invierte en pautas (`promotions`).

### 3️⃣ Artista
- **Casos de uso**: Se asocia un ID a un `artist_profile`.
- **Acciones Core**: 
  - Comparte videos al CityFeed taggeados como `artist_live`.
  - Puede visualizar seguimiento (`followers`) masivo.

### 4️⃣ Administrador
- **Casos de uso**: Accede a `/admin`.
- **Acciones Core**: Modera contenido (`reports`), bloquea usuarios abusivos o eventos falsos, y supervisa volumetrías de la plataforma.

---

## 📦 Explicación del Dataset Mock (`plan_city_data.json`)

Se creó en la raíz del proyecto el archivo masivo `plan_city_data.json` que contiene **una estructura relacional funcional con más de 20 registros por entidad**. Esta es la base central que toda la App en Next.js consulta como "base de datos".

### ¿Qué entidades maneja el JSON?
*   `cities`, `users`, `user_roles` (Base).
*   `artist_profiles`, `business_profiles` (Extendidos).
*   `events`, `event_artists`, `tickets`, `event_attendees` (Módulo Eventos).
*   `menus`, `menu_items` (Módulo Restaurantes/Comidas).
*   `videos`, `video_likes`, `comments`, `video_views`, `event_views` (Módulo Social & Feed "TikTok").
*   `favorites`, `follows`, `reviews` (Interacciones de fidelidad).
*   `notifications` (Campanas y alertas).
*   `payments`, `reports`, `promotions`, `tags`, `user_interests` (Módulos Backend).

### 💡 Cómo consumirlo localmente

Para simular latencias, el Frontend debe incluir una capa (ej. `lib/api.ts`) que importe el JSON en runtime y simule llamadas asincrónicas:

\`\`\`typescript
import MockData from '../../plan_city_data.json';

// Ejemplo simulación Fetch de base de datos
export const fetchCityFeed = async (cityId: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const videos = MockData.videos.filter(v => v.city_id === cityId);
            resolve(videos);
        }, 500); // Simulamos 500ms de latencia de red
    });
}
\`\`\`

---

## 🏃 Próximos Pasos (Hacia Producción)

1.  **Migrar Dataset a PostgreSQL / MongoDB**: El JSON provisto ya modela cómo deben unirse las tablas. La refactorización será lineal, cambiando el import genérico por queries en Prisma u ORM Drizzle.
2.  **WebSockets reales para el Feed**: Transformar los likes en el JSON a mutaciones via sockets (Socket.io/Pusher) para la funcionalidad en tiempo real cuando los usuarios miran un directo de un artista.
3.  **Integrar Pasarelas de Pago Reales**: Conectar los \`payments\` que ahora simulan "Credit Card" a una pasarela local en Colombia (PayU, Wompi, o Stripe).

---
*Fin del MVP Documentation (Generado para PlanCity)*
