'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Custom transition settings based on route depth
  const isDeepRoute = pathname.includes('/event/') || pathname.includes('/create-event');
  
  return (
    <motion.div
      key={pathname}
      initial={isDeepRoute ? { opacity: 0, x: 20 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={isDeepRoute ? { opacity: 0, x: -20 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
