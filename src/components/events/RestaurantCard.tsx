'use client';

import { BusinessProfile } from '@/lib/db';
import Link from 'next/link';

export default function RestaurantCard({ restaurant }: { restaurant: BusinessProfile }) {
  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block min-w-[160px] bg-white/60 backdrop-blur-md border border-gray-300 rounded-3xl p-3 flex flex-col shadow-sm hover:-translate-y-1 transition snap-start">
      <img src={'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop'} className="w-full h-32 rounded-2xl object-cover shadow-sm mb-3 bg-gray-200" alt={restaurant.name} />
      <h4 className="font-serif font-bold text-lg text-primary leading-tight">{restaurant.name}</h4>
      <p className="text-[11px] text-secondary mt-1 truncate"><i className="fa-solid fa-location-dot text-red-500 mr-1"></i>{restaurant.address}</p>
      
      <div className="flex justify-between items-center mt-3">
          <div className="text-[11px] text-gray-600 font-medium whitespace-nowrap">
              <i className="fa-solid fa-star text-yellow-500 mr-1"></i>{restaurant.rating} <i className="fa-regular fa-comment-dots ml-1 mr-1"></i>0
          </div>
          <div className="flex gap-1">
              <button className="w-7 h-7 rounded-full bg-secondary text-white shadow-sm flex items-center justify-center hover:bg-primary transition text-xs"><i className="fa-regular fa-heart"></i></button>
          </div>
      </div>
    </Link>
  );
}
