# 🌆 PlanCity - MVP 2.0 (GitHub Edition)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**PlanCity** es una plataforma social avanzada diseñada para el descubrimiento de eventos, gastronomía y cultura urbana. Este MVP 2.0 simula una experiencia completa de usuario final, organizador y administrador utilizando una arquitectura de datos 100% reactiva basada en JSON.

---

## 🔥 Características Principales

### 🎭 Fusión de Roles Inteligente
- **Usuario Final**: Explora, guarda favoritos y descubre lo mejor de la ciudad.
- **Organizador + Artista**: Un solo rol unificado para gestionar eventos, subir videos promocionales y agendar shows en vivo.
- **Administrador**: Panel de control total para supervisar la actividad de la plataforma.

### 📍 Selector de Ciudad Global
Cambia instantáneamente entre ciudades (Medellín, Bogotá, Cali, etc.) y observa cómo toda la interfaz —desde el Home hasta el Feed— se adapta dinámicamente al contenido de tu ubicación.

### 📱 CityFeed (TikTok Style)
Una experiencia inmersiva de video vertical donde los usuarios pueden descubrir experiencias locales, seguir artistas y vincularse directamente a eventos o restaurantes.

### 🍽️ Gastronomía Dinámica
Perfiles de restaurantes enriquecidos con menús detallados, categorías interactivas y vinculación directa con la base de datos de platos y precios.

---

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 16 (App Router), React 19.
- **Estilos**: Tailwind CSS v4 con diseño premium.
- **Estado**: Zustand para una gestión de estado global ligera y eficiente.
- **Animaciones**: Framer Motion para transiciones suaves y micro-interacciones.
- **Base de Datos**: Mock DB basada en un archivo JSON masivo (`plan_city_data.json`).
- **Persistencia**: LocalStorage para simular mutaciones (creación de eventos, platos, likes).

---

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/plancity-mvp.git
   cd plancity-mvp/mvp
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la app**:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```text
mvp/
├── src/
│   ├── app/           # Rutas y páginas (App Router)
│   ├── components/    # Componentes UI (Layout, Events, Feed, etc.)
│   ├── lib/           # Lógica de API simulada y Tipos TS
│   └── store/          # Gestión de estado (Zustand)
├── plan_city_data.json # Base de datos mock masiva
└── tailwind.config.mjs # Configuración de diseño
```

---

## 🎨 Diseño y UX
Este proyecto prioriza una **estética premium**:
- **Glassmorphism**: Efectos de desenfoque y transparencias.
- **Tipografía Curada**: Uso de *Playfair Display* para elegancia y *Nunito* para legibilidad.
- **Mobile First**: Optimizado para una experiencia de aplicación móvil nativa.

---

## ⚖️ Licencia
Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---
*Desarrollado con ❤️ para transformar la forma en que vivimos la ciudad.*
