"use client";

import { HeroSection } from "@/components/dj/hero-section";
import { AboutSection } from "@/components/dj/about-section";
import { PortfolioSection } from "@/components/dj/portfolio-section";
import { GallerySection } from "@/components/dj/gallery-section";
import { BookingSection } from "@/components/dj/booking-section";
import { Footer } from "@/components/dj/footer";
import { Navigation } from "@/components/dj/navigation";

export default function DJGoldenBlingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <GallerySection />
      <BookingSection />
      <Footer />
    </div>
  );
}
