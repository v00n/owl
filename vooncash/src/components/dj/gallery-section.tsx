"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    title: "Luxury Wedding Reception",
    category: "Wedding",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Corporate Gala Event",
    category: "Corporate",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Exclusive Club Night",
    category: "Club",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 4,
    title: "Private Birthday Celebration",
    category: "Private",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 5,
    title: "Festival Performance",
    category: "Festival",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: 6,
    title: "Rooftop Party",
    category: "Party",
    color: "from-indigo-500/20 to-purple-500/20",
  },
];

export function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Event <span className="gold-gradient">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Capturing unforgettable moments from events around the world
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Background with gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${image.color} transition-all duration-300 group-hover:scale-110`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              </div>

              {/* Camera Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: hoveredId === image.id ? 1.2 : 1,
                    rotate: hoveredId === image.id ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Camera className="w-16 h-16 text-gold/50 group-hover:text-gold transition-colors" />
                </motion.div>
              </div>

              {/* Overlay Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredId === image.id ? 1 : 0,
                  y: hoveredId === image.id ? 0 : 20,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
              >
                <span className="px-4 py-1.5 bg-gold/20 backdrop-blur-sm border border-gold/50 rounded-full text-gold text-sm mb-3">
                  {image.category}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {image.title}
                </h3>
              </motion.div>

              {/* Border Glow Effect */}
              <div
                className={`absolute inset-0 border-2 border-transparent group-hover:border-gold/50 rounded-lg transition-all ${
                  hoveredId === image.id ? "shadow-lg shadow-gold/30" : ""
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            * Gallery images showcase placeholder designs. Real event photos
            will be added here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
