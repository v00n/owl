"use client";

import { motion } from "framer-motion";
import {
  Music,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/djgoldenbling",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/djgoldenbling",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/djgoldenbling",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@djgoldenbling",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 border-t border-gold/20">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group"
            >
              <Music className="w-8 h-8 text-gold" />
              <span className="text-xl font-bold gold-gradient font-display">
                DJ GOLDEN BLING
              </span>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium DJ services for unforgettable events. Where luxury meets
              music.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Gallery", href: "#gallery" },
                { label: "Book Now", href: "#booking" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element)
                        element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 text-gold mt-0.5" />
                <a
                  href="mailto:booking@djgoldenbling.com"
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  booking@djgoldenbling.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-gold mt-0.5" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span className="text-gray-400">Available Worldwide</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Me</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 rounded-lg transition-all group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gold" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Stay updated with my latest mixes and events
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} DJ Golden Bling. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <button className="hover:text-gold transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-gold transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-gold hover:bg-gold/90 rounded-full shadow-lg shadow-gold/30 transition-all z-40 hidden sm:block"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
}
