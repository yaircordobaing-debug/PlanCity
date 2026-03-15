'use client';

import Link from 'next/link';
import UserMenu from './UserMenu';
import CitySwitcher from './CitySwitcher';

export default function TopHeader() {
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 md:px-6 lg:hidden flex justify-between items-center z-40 sticky top-0 min-h-[60px]">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-primary">
            <i className="fa-solid fa-building text-xl"></i>
            <h1 className="text-lg font-serif font-bold tracking-wide hidden sm:block">PlanCity</h1>
        </Link>
        <CitySwitcher />
      </div>

      <div className="flex gap-4 items-center">
         <UserMenu />
      </div>
    </header>
  );
}
