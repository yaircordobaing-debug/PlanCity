# 🌆 PlanCity MVP (Versión 2.0) - Documentación Técnica y Arquitectura Integral

Documento de referencia técnica que detalla todos los componentes, módulos, rutas, modelos de datos, arquitectura y scripts que componen el repositorio **PlanCity**.

---

## 1. 📌 Visión General del Proyecto

**PlanCity** es una plataforma social hiperlocal y motor de descubrimiento de experiencias urbanas, eventos culturales y gastronomía enfocado inicialmente en ciudades de Colombia (Medellín, Bogotá, Cali, Cartagena, etc.).

El proyecto combina dos enfoques complementarios:
1. **Prototipo Web Rápido (Vanilla JS)**: Una versión ligera y accesible directamente en HTML/CSS/JS con servidor nativo en Node.js, ideal para demostraciones inmediatas y pruebas de concepto sin compilación.
2. **Plataforma Moderna SPA/SSR (Next.js 16 + React 19)**: Una aplicación web progresiva y escalable construida con el App Router de Next.js, diseñada para simular una experiencia nativa móvil (estilo TikTok y Airbnb/Eventbrite) con soporte multirrol y base de datos relacional simulada.

---

## 2. 🏗️ Arquitectura del Sistema

El repositorio presenta una arquitectura dual sincronizada:

```
+-------------------------------------------------------------------------+
|                              PLANCITY                                   |
+-------------------------------------------------------------------------+
       |                                                    |
       v                                                    v
[ Capa 1: Prototipo Vanilla ]               [ Capa 2: Next.js 16 MVP 2.0 ]
  - index.html (Landing)                      - src/app/ (App Router)
  - app.html (Web App)                        - src/components/ (React 19)
  - js/ & css/                                - src/store/ (Zustand)
  - data/places_and_events.json               - src/lib/ (API & DB Simulator)
  - server.js (HTTP nativo)                   - plan_city_data.json (25 entidades)
       |                                                    |
       +-------------------> [ sync-public.js ] <-----------+
                                    |
                                    v
                             public/ (Vercel)
```

- **`sync-public.js`**: Script de sincronización automática ejecutado antes de `dev` y `build` (`predev` y `prebuild`), que copia los recursos estáticos del prototipo (`index.html`, `app.html`, `css/`, `js/`, `assets/`, `data/`) a la carpeta `public/` de Next.js. De este modo, ambos entornos coexisten en despliegues sobre Vercel o servidores Node.

---

## 3. 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `16.1.6` | App Router, Server/Client Components, enrutamiento dinámico |
| **Librería UI** | React & React DOM | `19.2.3` | Renderizado declarativo y concurrente |
| **Lenguaje** | TypeScript | `^5` | Tipado estricto e inferencia de tipos desde JSON |
| **Estilos** | Tailwind CSS & PostCSS | `^4.0` | Diseño atómico, temas y diseño adaptativo (Glassmorphism) |
| **Iconos** | FontAwesome Free | `^7.2.0` | Iconografía para categorías, eventos y acciones |
| **Gestión de Estado** | Zustand | `^5.0.11` | Estado reactivo para ciudad activa, roles, guardados y toasts |
| **Animaciones** | Framer Motion | `^12.35.2` | Transiciones de página fluidas y micro-interacciones móviles |
| **Compilación React** | Babel Plugin React Compiler | `1.0.0` | Optimización automática de re-renders |
| **Linter** | ESLint | `^9` | Análisis estático de código |
| **Entorno Backend** | Node.js nativo | `>= 18` | Servidor HTTP liviano sin dependencias externas (`server.js`) |

---

## 4. 📂 Estructura Detallada de Archivos y Carpetas

```text
PlanCity/
├── .git/                      # Control de versiones Git (rama activa: mvp)
├── assets/                    # Identidad de marca, logos y capturas de diseño
│   ├── insightlancer-mockup.png
│   ├── paya-landing-ref.png
│   ├── plancity-isotype.svg   # Isotipo vectorial de PlanCity
│   └── plancity-logo.jpg      # Logotipo principal
├── css/                       # Hojas de estilo del prototipo Vanilla
│   ├── app.css                # Estilos de la aplicación web ligera
│   ├── landing.css            # Estilos de la landing page promocional
│   └── tokens.css             # Tokens de diseño (colores, espaciado, fuentes)
├── data/                      # Dataset para el prototipo Vanilla
│   └── places_and_events.json # Planes, lugares, categorías y ciudades iniciales
├── js/                        # Lógica Vanilla JS del prototipo
│   ├── app.js                 # Inicialización y controladores de eventos
│   ├── components.js          # Generación dinámica de tarjetas y modales
│   ├── dataLoader.js          # Fetch y filtrado del JSON local
│   ├── landing.js             # Lógica interactiva de la página de aterrizaje
│   └── state.js               # Gestor de estado local del prototipo
├── public/                    # Directorio estático servido por Next.js
│   ├── assets/                # Copia sincronizada de assets
│   ├── css/                   # Copia sincronizada de css
│   ├── data/                  # Copia sincronizada de data
│   ├── js/                    # Copia sincronizada de js
│   ├── app.html               # Web app vanilla accesible en /app.html
│   └── index.html             # Landing accesible en /index.html
├── src/                       # Código fuente de Next.js 16 (App Router)
│   ├── app/                   # Módulos y rutas del sistema
│   │   ├── admin/             # Panel administrativo
│   │   │   └── page.tsx       # Moderación, métricas globales y reportes
│   │   ├── artist/[id]/       # Perfil público de artistas
│   │   │   └── page.tsx       # Bio, seguidores, shows programados y feed
│   │   ├── dashboard/         # Panel de organizadores
│   │   │   ├── create-event/  # Formulario de alta de eventos
│   │   │   │   └── page.tsx
│   │   │   ├── manage-menu/[id]/ # Gestión de cartas/menús gastronómicos
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx       # Métricas de ventas, ingresos y vistas
│   │   ├── event/[id]/        # Vista de detalle de evento
│   │   │   └── page.tsx       # Compra de tickets, geolocalización, QR simulado
│   │   ├── explore/           # Catálogo y exploración
│   │   │   └── page.tsx       # Filtro por categorías, buscador y mapa
│   │   ├── favorites/         # Favoritos del usuario
│   │   │   └── page.tsx       # Lista de eventos y lugares guardados
│   │   ├── feed/              # CityFeed (Formato vertical TikTok)
│   │   │   └── page.tsx       # Scroll infinito de videos con interacciones
│   │   ├── profile/           # Perfil del usuario autenticado
│   │   │   └── page.tsx       # Configuración, rol activo y tickets comprados
│   │   ├── restaurant/[id]/   # Detalle de negocio gastronómico
│   │   │   └── page.tsx       # Información, carta de platos y precios
│   │   ├── favicon.ico
│   │   ├── globals.css        # Configuración Tailwind v4 y estilos base
│   │   ├── layout.tsx         # Layout raíz con Sidebars, Headers y Navs
│   │   ├── page.tsx           # Redirige automáticamente a /index.html
│   │   └── template.tsx       # Animaciones de transición con Framer Motion
│   ├── components/            # Componentes modulares en React
│   │   ├── artists/
│   │   │   └── ArtistCard.tsx # Tarjeta de presentación de artista
│   │   ├── events/
│   │   │   ├── EventCard.tsx  # Tarjeta de evento con fecha, precio y tags
│   │   │   └── RestaurantCard.tsx # Tarjeta de restaurante con rating y badges
│   │   ├── feed/
│   │   │   └── VideoCard.tsx  # Reproductor/tarjeta de video con likes y comentarios
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx  # Barra inferior fija para dispositivos móviles
│   │   │   ├── CitySwitcher.tsx # Selector desplegable de ciudad activa
│   │   │   ├── RoleMenu.tsx   # Menú para alternar entre roles (User, Org, Admin)
│   │   │   ├── Sidebar.tsx    # Menú lateral para versión escritorio
│   │   │   ├── TopHeader.tsx  # Barra superior con buscador y notificaciones
│   │   │   └── UserMenu.tsx   # Menú de usuario con accesos directos
│   │   └── ui/
│   │       ├── OnboardingTooltip.tsx # Tooltips instructivos para nuevos usuarios
│   │       └── Toast.tsx      # Notificaciones emergentes de éxito/error
│   ├── lib/                   # Servicios y utilidades
│   │   ├── api.ts             # Cliente API mock con simulación de latencia y LocalStorage
│   │   └── db.ts              # Inferencia de tipos TypeScript sobre el dataset JSON
│   └── store/                 # Almacén de estado reactivo
│       └── index.ts           # Store principal con Zustand (roles, ciudad, UI)
├── .gitignore                 # Exclusiones de Git (node_modules, .next, etc.)
├── app.html                   # Entrada directa a la aplicación web ligera
├── eslint.config.mjs          # Configuración de ESLint 9
├── fix.js                     # Script auxiliar para resolver escapes en TS/TSX
├── generateMockData.js        # Generador masivo del dataset relacional
├── index.html                 # Landing page principal
├── next.config.mjs            # Configuración de Next.js (ESM)
├── next.config.ts             # Tipado para la configuración de Next.js
├── package.json               # Dependencias y scripts NPM
├── package-lock.json          # Árbol de dependencias bloqueado
├── plan_city_data.json        # Base de datos relacional simulada (235 KB)
├── postcss.config.mjs         # Configuración del pipeline PostCSS con Tailwind v4
├── README.md                  # Documentación oficial del MVP 2.0
├── README_2.0.md              # Resumen técnico para GitHub
├── server.js                  # Servidor HTTP estático nativo en Node.js (puerto 3000)
├── sync-public.js             # Sincronizador de estáticos hacia public/
└── tsconfig.json              # Configuración de TypeScript y paths (@/*)
```

---

## 5. 🗺️ Rutas y Módulos de la Aplicación (Next.js)

| Ruta | Descripción | Componentes Clave |
| :--- | :--- | :--- |
| `/` | Redirección inmediata a `/index.html` (Landing) | `redirect('/index.html')` |
| `/feed` | **CityFeed**: Feed vertical inmersivo estilo TikTok con reproducción de videos, botón de seguir a artistas, likes interactivos y tags vinculados a eventos. | `VideoCard`, `CitySwitcher` |
| `/explore` | **Explorador Urbano**: Catálogo interactivo con filtrado por categorías (Música, Gastro, Cultura), búsqueda por texto y listado de eventos y restaurantes. | `EventCard`, `RestaurantCard`, `CitySwitcher` |
| `/event/[id]` | **Detalle de Evento**: Información completa, precios, organizador, artistas invitados, simulador de compra y generación de entrada virtual con código QR. | `EventCard`, `Toast` |
| `/restaurant/[id]` | **Detalle de Restaurante**: Información del local, horarios, ubicación, carta gastronómica dividida por categorías de platos con precios. | `MenuItem`, `RestaurantCard` |
| `/artist/[id]` | **Perfil de Artista**: Biografía, métricas de seguidores, videos publicados y próximos shows programados en la ciudad. | `ArtistCard`, `VideoCard` |
| `/dashboard` | **Panel de Organizadores**: Dashboard con métricas de ventas, visualizaciones de eventos, accesos directos a crear eventos y gestionar cartas de restaurantes. | `Sidebar`, `RoleMenu` |
| `/dashboard/create-event` | **Creación de Eventos**: Formulario interactivo para registrar eventos con fechas, precios, categorías y artistas asociados. | `Toast` |
| `/dashboard/manage-menu/[id]` | **Gestor de Menús**: Panel para agregar, editar y eliminar platos y bebidas para un restaurante específico. | `MenuItem` |
| `/admin` | **Panel Administrativo**: Monitoreo de volumetría del sistema, estado de las ciudades y tabla de resolución de reportes de contenido. | `Toast` |
| `/favorites` | **Favoritos**: Colección personalizada de eventos guardados por el usuario mediante Zustand. | `EventCard` |
| `/profile` | **Perfil de Usuario**: Resumen del usuario actual, selector de roles, preferencias y tickets activos adquiridos. | `RoleMenu`, `UserMenu` |

---

## 6. 💾 Base de Datos Simulada (`plan_city_data.json`)

El proyecto cuenta con un archivo JSON masivo relacional con más de 20 registros por entidad, generado mediante `generateMockData.js`. Este archivo contiene **25 entidades normalizadas**:

1. **`cities`**: Catálogo de 25 ciudades colombianas con coordenadas de geolocalización (lat, lng).
2. **`users`**: Perfiles de usuarios con nombre, avatar, email, teléfono y ciudad principal.
3. **`user_roles`**: Tabla relacional que permite asociar múltiples roles (`user`, `organizer`, `admin`) a un mismo usuario.
4. **`artist_profiles`**: Perfiles artísticos con biografía, géneros musicales y métricas de seguidores.
5. **`business_profiles`**: Restaurantes, discotecas, teatros y bares con dirección, horarios y categoría.
6. **`menus`**: Catálogo de cartas vinculadas a los negocios.
7. **`menu_items`**: Platos individuales con descripción, precio, categoría y estado de disponibilidad.
8. **`events`**: Eventos programados con fechas, precios, aforos, estado (`published`, `draft`) y descripción.
9. **`event_artists`**: Relación n-a-n entre eventos y artistas.
10. **`tickets`**: Tipos de boletos (General, VIP, Early Bird) con precios y cupos disponibles.
11. **`event_attendees`**: Registro de asistentes con códigos de ticket y validación de QR.
12. **`payments`**: Transacciones simuladas con métodos de pago (Tarjeta de Crédito, PSE, etc.) y montos.
13. **`videos`**: Publicaciones de video vertical asociadas a ciudades, negocios o eventos.
14. **`video_likes`**: Registro de "Me Gusta" por usuario sobre cada video.
15. **`comments`**: Comentarios e hilos de conversación en videos y eventos.
16. **`favorites`**: Relaciones de eventos o restaurantes guardados por los usuarios.
17. **`follows`**: Sistema de seguimiento entre usuarios y perfiles de artistas u organizadores.
18. **`reviews`**: Reseñas con calificación numérica (estrellas) y comentarios de texto.
19. **`notifications`**: Centro de notificaciones para alertas de eventos, nuevos seguidores y promociones.
20. **`event_views`**: Telemetría de impresiones y visitas en las páginas de eventos.
21. **`video_views`**: Telemetría de reproducciones completadas en el CityFeed.
22. **`reports`**: Sistema de denuncias para moderación en `/admin` (spam, contenido inapropiado).
23. **`tags`**: Etiquetas transversales para categorización rápida (#Rooftop, #Salsa, #Vegano).
24. **`promotions`**: Pautas publicitarias contratadas por organizadores para destacar contenido.
25. **`user_interests`**: Tags de preferencia por usuario para recomendaciones personalizadas.

---

## 7. ⚙️ Capa de Datos y Estado Global

### Zustand (`src/store/index.ts`)
Controla el estado global de la aplicación sin dependencias de Redux:
- **`role`**: Controla el rol activo actual (`user` \| `organizer` \| `admin`).
- **`currentCityId`**: Ciudad activa seleccionada (por defecto `'c1'` = Medellín). Toda la información mostrada se filtra según esta ciudad.
- **`savedEvents`**: IDs de los eventos marcados como favoritos.
- **`isBottomNavVisible`**: Visibilidad condicional de la barra de navegación inferior.
- **`errorToast`**: Notificación toast para errores y avisos informativos temporales.

### Cliente API Mock (`src/lib/api.ts`)
- Simula latencias de red con `setTimeout` (300ms a 800ms) para probar spinners y estados asíncronos reales.
- Utiliza **hibridación con `localStorage`**: si el usuario crea un evento nuevo o agrega un plato al menú, este se persiste en el almacenamiento local del navegador y se une al dataset base de `plan_city_data.json`.

---

## 8. ⚡ Comandos y Scripts Disponibles

En el archivo `package.json` se encuentran los comandos estándar:

```bash
# Iniciar en modo desarrollo Next.js (ejecuta automáticamente sync-public.js antes)
npm run dev

# Compilar para producción (ejecuta sync-public.js antes)
npm run build

# Iniciar el servidor Next.js compilado
npm start

# Ejecutar el linter de código
npm run lint

# Levantar el prototipo Vanilla ligero con servidor Node nativo (sin dependencias)
node server.js

# Regenerar el dataset masivo de 25 entidades si se desea reiniciar datos de prueba
node generateMockData.js

# Reparar caracteres de escape en archivos TSX si fuera necesario
node fix.js
```

---

## 9. 🎯 Aspectos Destacados de Diseño y UX

- **Mobile-First**: Toda la interfaz está adaptada ergonómicamente para su uso en pantallas táctiles con `BottomNav` fija.
- **Diseño Glassmorphism**: Fondos semitransparentes con desenfoque de fondo (`backdrop-blur-md`) y bordes sutiles.
- **Paleta de Colores**: Tonos oscuros premium con acentos vibrantes inspirados en la vida nocturna y cultural de la ciudad.
- **Micro-interacciones**: Animaciones de entrada y respuesta háptica visual mediante `framer-motion`.