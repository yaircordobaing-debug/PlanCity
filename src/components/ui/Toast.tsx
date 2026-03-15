'use client';

import { useAppStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
  const { errorToast, clearError } = useAppStore();

  return (
    <AnimatePresence>
      {errorToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-3 whitespace-nowrap text-sm"
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{errorToast}</span>
          <button onClick={clearError} className="ml-2 hover:scale-110 transition opacity-80 hover:opacity-100">
             <i className="fa-solid fa-xmark"></i>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
