'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingTooltip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('plancity_demo_seen');
    if (!seen) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem('plancity_demo_seen', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.9 }}
           className="fixed bottom-24 left-4 right-4 md:left-[55%] md:-translate-x-1/2 md:w-[400px] z-[100] bg-primary text-white p-5 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10"
        >
           <h3 className="font-serif font-bold text-lg mb-2">👋 ¡Bienvenido al Demo!</h3>
           <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Explora en <b>Inicio</b>, sumérgete en el formato inmersivo del <b>CityFeed</b>, y visita tu <b>Perfil</b> para cambiar al rol de Organizador y publicar eventos en tiempo real.
           </p>
           <button onClick={close} className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-md transition hover:scale-[1.02] active:scale-95 text-sm">
              ¡Entendido, a explorar!
           </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
