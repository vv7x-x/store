"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Stars, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "المكتبة", href: "#library" },
  { label: "الأكثر قراءة", href: "#popular" },
  { label: "التصنيفات", href: "#categories" },
  { label: "عن المكتبة", href: "#about" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50"
      style={{}}
    >
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          opacity: bgOpacity,
          backgroundColor: "rgba(5,7,26,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(124,58,237,0.2)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}>
              <BookOpen size={18} className="text-white" />
            </div>
            <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(124,58,237,0.3)", filter: "blur(6px)" }} />
          </div>
          <div className="text-right">
            <span className="font-arabic-display block text-lg font-bold leading-tight text-white"
              style={{ textShadow: "0 0 20px rgba(124,58,237,0.8)" }}>
              مكتبة النجوم
            </span>
            <span className="text-xs font-arabic-body" style={{ color: "var(--silver-dim)" }}>
              روايات عربية فاخرة
            </span>
          </div>
        </motion.a>

        {/* Desktop nav */}
        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="font-arabic-body text-sm transition-colors duration-300 relative group"
              style={{ color: "var(--silver-dim)" }}
              whileHover={{ color: "#fff" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 right-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "var(--violet-glow)" }}
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.button
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-arabic-body text-white font-medium transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
            border: "1px solid rgba(124,58,237,0.5)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(124,58,237,0.5)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Stars size={15} />
          انضم مجاناً
        </motion.button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            background: "rgba(5,7,26,0.95)",
            borderColor: "rgba(124,58,237,0.2)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-arabic-body text-sm py-2 border-b"
              style={{ color: "var(--silver)", borderColor: "rgba(124,58,237,0.15)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-arabic-body text-white font-medium"
            style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}
          >
            انضم مجاناً
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
