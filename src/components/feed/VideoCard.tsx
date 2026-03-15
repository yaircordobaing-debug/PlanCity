'use client';

import { useEffect, useRef, useState } from 'react';
import { VideoType, User, EventType, BusinessProfile } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface VideoCardProps {
  video: VideoType & { creator: User; event?: EventType; business?: BusinessProfile };
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      if (videoRef.current) {
          videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black snap-start shrink-0 overflow-hidden text-white" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={video.video_url}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted // Muted to allow autoplay without user gesture
        poster={video.thumbnail_url}
      />

      {/* Play/Pause Overlay indicator */}
      {!isPlaying && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <i className="fa-solid fa-play text-6xl text-white/70 drop-shadow-md"></i>
         </div>
      )}

      {/* Dark Gradient at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none z-10"></div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-24 left-4 right-16 z-20 pointer-events-auto">
        <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <img src={video.creator?.avatar_url || 'https://i.pravatar.cc/150'} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-gray-200" alt={`Avatar de ${video.creator?.name || 'Usuario'}`} />
            <div>
              <h4 className="font-bold text-sm drop-shadow-md flex items-center gap-1">{video.creator?.name || 'Cargando...'} <i className="fa-solid fa-circle-check text-blue-400 text-[10px]"></i></h4>
            </div>
          </div>
          <p className="text-sm font-medium drop-shadow-md mb-1">{video.description}</p>
          <p className="text-xs font-bold text-blue-300 drop-shadow-md mb-2">{video.hashtags}</p>
          
          {video.event && (
             <Link href={`/event/${video.event.id}`}>
                <button onClick={(e) => e.stopPropagation()} className="mt-3 w-full bg-primary/90 text-white rounded-xl py-2 text-xs font-bold hover:bg-primary transition shadow-md flex justify-between items-center px-4">
                   <span><i className="fa-solid fa-ticket mr-2 text-orange-400"></i>Ver Evento: {video.event.title}</span>
                   <i className="fa-solid fa-chevron-right"></i>
                </button>
             </Link>
          )}

          {video.business && (
             <Link href={`/restaurant/${video.business.id}`}>
                <button onClick={(e) => e.stopPropagation()} className="mt-3 w-full bg-white/90 text-primary rounded-xl py-2 text-xs font-bold hover:bg-white transition shadow-md flex justify-between items-center px-4">
                   <span><i className="fa-solid fa-utensils mr-2 text-red-500"></i>Ver Lugar: {video.business.name}</span>
                   <i className="fa-solid fa-chevron-right"></i>
                </button>
             </Link>
          )}
        </div>
      </div>

      {/* Right side Action Buttons */}
      <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center z-20 pointer-events-auto">
        <button 
           aria-label="Dar me gusta al video"
           onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} 
           className="flex flex-col items-center gap-1 hover:scale-110 transition drop-shadow-lg">
          <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center border border-white/30 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/20'}`}>
            <i className="fa-solid fa-heart text-xl"></i>
          </div>
          <span className="text-xs font-bold">{12500 + (+isLiked)}</span>
        </button>

        <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 hover:scale-110 transition drop-shadow-lg">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <i className="fa-solid fa-comment-dots text-xl"></i>
          </div>
          <span className="text-xs font-bold">120</span>
        </button>

        <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1 hover:scale-110 transition drop-shadow-lg">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <i className="fa-solid fa-share-nodes text-xl"></i>
          </div>
        </button>
      </div>
    </div>
  );
}
