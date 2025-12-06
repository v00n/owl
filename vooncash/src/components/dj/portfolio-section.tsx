"use client";

import { motion } from "framer-motion";
import { Play, Music } from "lucide-react";
import { useState } from "react";

const mixes = [
  {
    id: 1,
    title: "Summer Vibes Mix 2024",
    type: "Club Mix",
    duration: "60 min",
    description: "High-energy summer anthems perfect for any party",
  },
  {
    id: 2,
    title: "Wedding Elegance",
    type: "Wedding Mix",
    duration: "45 min",
    description: "Romantic and sophisticated tracks for your special day",
  },
  {
    id: 3,
    title: "Corporate Groove",
    type: "Corporate Event",
    duration: "90 min",
    description: "Professional and upbeat mix for networking events",
  },
  {
    id: 4,
    title: "Golden Classics",
    type: "Throwback Mix",
    duration: "75 min",
    description: "Timeless hits that get everyone on the dance floor",
  },
];

export function PortfolioSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            <span className="gold-gradient">Portfolio</span> & Mixes
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my latest mixes and productions. Each set is carefully
            crafted to create the perfect atmosphere.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {mixes.map((mix, index) => (
            <motion.div
              key={mix.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveId(mix.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gold/20 rounded-lg p-6 sm:p-8 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
              </div>

              <div className="relative">
                {/* Play Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-all">
                    <Music className="w-6 h-6 text-gold" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gold hover:bg-gold/90 rounded-full transition-all shadow-lg shadow-gold/30"
                    aria-label={`Play ${mix.title}`}
                  >
                    <Play className="w-5 h-5 text-black fill-black" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                      {mix.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="px-3 py-1 bg-gold/10 rounded-full text-gold">
                        {mix.type}
                      </span>
                      <span>{mix.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {mix.description}
                  </p>
                </div>

                {/* Waveform Visual */}
                <div className="mt-6 flex items-center gap-1 h-12">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gold/30 rounded-full"
                      animate={{
                        height:
                          activeId === mix.id
                            ? `${Math.random() * 100}%`
                            : "20%",
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: activeId === mix.id ? Infinity : 0,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about embedding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            * Audio players can be integrated with SoundCloud, Spotify, or
            custom audio files
          </p>
        </motion.div>
      </div>
    </section>
  );
}
