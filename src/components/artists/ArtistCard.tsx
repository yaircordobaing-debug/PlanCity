'use client';

import { ArtistProfile, User } from '@/lib/db';
import Link from 'next/link';

interface ArtistWithUser extends ArtistProfile {
    user: User;
}

export default function ArtistCard({ artist }: { artist: ArtistWithUser }) {
  return (
    <Link href={`/artist/${artist.id}`} className="block bg-white/60 backdrop-blur-md border border-gray-300 rounded-3xl p-4 flex flex-col shadow-sm hover:-translate-y-1 transition snap-start">
      <div className="relative mb-4">
        <img 
            src={artist.user.avatar_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'} 
            className="w-full h-40 rounded-2xl object-cover shadow-sm bg-gray-200" 
            alt={artist.stage_name} 
        />
        <div className="absolute top-2 right-2 bg-accent text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {artist.genre}
        </div>
      </div>
      
      <h4 className="font-serif font-bold text-lg text-primary leading-tight">{artist.stage_name}</h4>
      <p className="text-[11px] text-secondary mt-1 line-clamp-2">{artist.bio}</p>
      
      <div className="flex justify-between items-center mt-auto pt-3">
          <div className="text-[11px] text-gray-600 font-medium whitespace-nowrap">
              <i className="fa-solid fa-users text-accent mr-1"></i> {artist.followers_count || Math.floor(Math.random() * 500) + 50} Seguidores
          </div>
          <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full bg-secondary text-white shadow-sm flex items-center justify-center hover:bg-primary transition text-xs">
                  <i className="fa-solid fa-plus"></i>
              </button>
          </div>
      </div>
    </Link>
  );
}
