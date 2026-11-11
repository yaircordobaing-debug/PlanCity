'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Marca / Logo Oficial */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/assets/plancity-isotype.svg"
            alt="PlanCity Isotipo"
            className="h-9 w-auto transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-extrabold tracking-tight text-white">
            Plan<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">City</span>
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a href="#que-es" className="hover:text-white transition-colors">
            Qué es
          </a>
          <a href="#categorias" className="hover:text-white transition-colors">
            Categorías
          </a>
          <a href="#cercanos" className="hover:text-white transition-colors">
            Lugares Cerca
          </a>
          <a href="#eventos" className="hover:text-white transition-colors">
            Eventos
          </a>
          <a href="#como-funciona" className="hover:text-white transition-colors">
            Cómo Funciona
          </a>
          <a href="#sobre-nosotros" className="hover:text-white transition-colors">
            Sobre PlanCity
          </a>
        </nav>

        {/* Botón Principal a la Plataforma */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/app.html"
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 px-3 py-2 transition-colors hidden lg:inline-block"
          >
            Prototipo Ligero
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/30 hover:opacity-95 transition-all hover:scale-105"
          >
            <i className="fa-solid fa-compass"></i>
            <span>Explorar PlanCity</span>
          </Link>
        </div>

        {/* Botón Hamburguesa Móvil */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 flex flex-col gap-3">
          <a
            href="#que-es"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Qué es
          </a>
          <a
            href="#categorias"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Categorías
          </a>
          <a
            href="#cercanos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Lugares Cerca
          </a>
          <a
            href="#eventos"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Eventos
          </a>
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Cómo Funciona
          </a>
          <a
            href="#sobre-nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-zinc-300 py-1.5 hover:text-white"
          >
            Sobre PlanCity
          </a>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-md"
            >
              <i className="fa-solid fa-compass"></i>
              <span>Explorar PlanCity</span>
            </Link>
            <Link
              href="/app.html"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-zinc-400 py-2"
            >
              Abrir Prototipo Web Ligero (/app.html)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
