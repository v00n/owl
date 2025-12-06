"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Music2, Users } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Events", value: "500+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Award, label: "Awards", value: "15+" },
  { icon: Music2, label: "Hours Mixed", value: "10,000+" },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            About <span className="gold-gradient">DJ Golden Bling</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                With over a decade of experience in the music industry,{" "}
                <span className="text-gold font-semibold">DJ Golden Bling</span>{" "}
                has become synonymous with luxury entertainment and
                unforgettable experiences.
              </p>
              <p className="text-lg leading-relaxed">
                Specializing in weddings, corporate events, and exclusive
                parties, I bring a unique blend of musical expertise and
                professional showmanship that transforms every event into a
                spectacular celebration.
              </p>
              <p className="text-lg leading-relaxed">
                My mission is simple: to create the perfect soundtrack for your
                special moments, reading the crowd and delivering an
                unparalleled entertainment experience that keeps everyone on the
                dance floor.
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "Weddings",
                "Corporate Events",
                "Private Parties",
                "Club Events",
                "Music Production",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-black/50 border border-gold/20 rounded-lg p-6 text-center hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/20"
                >
                  <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
