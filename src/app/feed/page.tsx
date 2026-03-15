'use client';

import { useEffect, useState, useRef } from 'react';
import { getFeedVideos } from '@/lib/api';
import VideoCard from '@/components/feed/VideoCard';
import { useAppStore } from '@/store';

export default function FeedPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getFeedVideos().then(setVideos);
  }, []);

  // Use IntersectionObserver to determine which video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find index of the intersecting video
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.7, // Trigger when 70% of the video is visible
      }
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, [videos]);

  if (videos.length === 0) {
    return (
      <div className="h-[100dvh] w-full bg-black relative overflow-hidden flex flex-col justify-end pb-24 px-4">
          <div className="absolute top-0 right-4 h-full flex flex-col justify-center gap-6 z-10">
              {[1,2,3].map(i => <div key={i} className="w-12 h-12 bg-white/10 animate-pulse rounded-full"></div>)}
          </div>
          <div className="w-3/4 h-24 bg-white/10 animate-pulse rounded-2xl mb-4 z-10"></div>
          <div className="w-full h-12 bg-white/10 animate-pulse rounded-xl z-10"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide pb-20"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Top Floating Header for Feed */}
      <div className="fixed top-0 w-full max-w-md p-6 z-50 flex justify-center pointer-events-none">
         <div className="flex gap-4 drop-shadow-md font-bold text-white text-lg">
            <span className="opacity-60">Siguiendo</span>
            <span className="border-b-2 border-white pb-1">Para ti</span>
         </div>
      </div>

      {videos.map((video, idx) => (
        <div key={video.id} data-index={idx} className="snap-start h-[100dvh]">
          <VideoCard video={video} isActive={idx === activeIndex} />
        </div>
      ))}
    </div>
  );
}
