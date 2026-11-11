import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Columna 1: Marca */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src="/assets/plancity-isotype.svg"
              alt="PlanCity Isotipo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-extrabold text-white">
              Plan<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">City</span>
            </span>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm mb-4">
            Plataforma digital de descubrimiento urbano. Conectamos personas con eventos, restaurantes, parches culturales y espacios que hacen vibrar la ciudad.
          </p>
          <div className="text-xs text-zinc-500">
            Diseñado para Medellín, Bogotá, Cali y las principales ciudades de Colombia.
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#que-es" className="hover:text-purple-400 transition-colors">
                ¿Qué es PlanCity?
              </a>
            </li>
            <li>
              <a href="#categorias" className="hover:text-purple-400 transition-colors">
                Categorías
              </a>
            </li>
            <li>
              <a href="#cercanos" className="hover:text-purple-400 transition-colors">
                Lugares Cercanos
              </a>
            </li>
            <li>
              <a href="#eventos" className="hover:text-purple-400 transition-colors">
                Eventos Editoriales
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-purple-400 transition-colors">
                Cómo Funciona
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Plataforma y Legal */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">Plataforma</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/explore" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                <i className="fa-solid fa-compass mr-1.5 text-xs"></i>
                Explorar App (/explore)
              </Link>
            </li>
            <li>
              <Link href="/app.html" className="hover:text-zinc-200 transition-colors">
                Prototipo Ligero (/app.html)
              </Link>
            </li>
            <li>
              <a href="#sobre-nosotros" className="hover:text-zinc-200 transition-colors">
                Aviso de Privacidad
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra de Atribución y Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          &copy; {currentYear} PlanCity. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-2 text-center sm:text-right">
          <span>Integración de mapas provista por</span>
          <span className="font-semibold text-zinc-400 flex items-center gap-1">
            <i className="fa-brands fa-google text-zinc-400"></i> Google Maps Platform
          </span>
        </div>
      </div>
    </footer>
  );
};
