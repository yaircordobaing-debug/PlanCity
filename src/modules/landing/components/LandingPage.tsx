import React from 'react';
import { Header, Footer } from '../../navigation';
import { HeroSection } from '../sections/HeroSection';
import { WhatIsSection } from '../sections/WhatIsSection';
import { CategoriesSection } from '../sections/CategoriesSection';
import { DiscoverySection } from '../../discovery';
import { FeaturedEventsSection } from '../sections/FeaturedEventsSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { AboutSection } from '../sections/AboutSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <WhatIsSection />
        <CategoriesSection />
        <DiscoverySection />
        <FeaturedEventsSection />
        <HowItWorksSection />
        <AboutSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};
