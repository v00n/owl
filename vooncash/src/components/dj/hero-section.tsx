"use client";

import { motion } from "framer-motion";
import { Music, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative">
              <Music className="w-16 h-16 sm:w-20 sm:h-20 text-gold" />
              <Sparkles className="w-8 h-8 text-gold absolute -top-2 -right-2 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display">
            <span className="gold-gradient">DJ GOLDEN BLING</span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto"
          >
            Where Luxury Meets <span className="text-gold">Music</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Premium DJ services for weddings, corporate events, and exclusive
            parties. Experience the perfect blend of entertainment and elegance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              onClick={scrollToBooking}
              className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-6 text-lg gold-glow"
              size="lg"
            >
              Book Now
            </Button>
            <Button
              onClick={() => {
                const element = document.querySelector("#portfolio");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10 px-8 py-6 text-lg"
              size="lg"
            >
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
