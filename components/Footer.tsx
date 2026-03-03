"use client";

import { motion } from "framer-motion";
import { BookOpen, Stars, Heart } from "lucide-react";

const categories = [
  "أدب كلاسيكي",
  "روايات حديثة",
  "تاريخية",
  "خيال علمي",
  "بوليسية",
  "رومانسية",
];

const links = [
  { label: "عن المكتبة", href: "#" },
  { label: "أضف رواية", href: "#" },
  { label: "تواصل معنا", href: "#" },
  { label: "سياسة الخصوصية", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t mt-20"
      style={{ borderColor: "rgba(124,58,237,0.2)" }}
    >
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="max-w-7xl mx-auto px-6 py-16"
        style={{ background: "rgba(5,7,26,0.8)", backdropFilter: "blur(20px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12" dir="rtl">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}
              >
                <BookOpen size={18} className="text-white" />
              </div>
              <span
                className="font-arabic-display text-xl font-bold text-white"
                style={{ textShadow: "0 0 20px rgba(124,58,237,0.6)" }}
              >
                مكتبة النجوم
              </span>
            </div>
            <p
              className="font-arabic-body text-sm leading-relaxed"
              style={{ color: "var(--silver-dim)" }}
            >
              مكتبة رقمية فاخرة تجمع أجمل الروايات العربية والعالمية في مكان واحد، لأن القراءة رحلة لا تنتهي.
            </p>

            {/* Social links placeholder */}
            <div className="flex items-center gap-3 mt-6">
              {["𝕏", "in", "f"].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(76,29,149,0.3)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "var(--silver-dim)",
                  }}
                  aria-label={`تابعنا على ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3
              className="font-arabic-display font-bold text-white mb-5"
              style={{ fontSize: "1.1rem" }}
            >
              التصنيفات
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="font-arabic-body text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "var(--silver-dim)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform"
                      style={{ background: "var(--violet-glow)" }}
                    />
                    <span className="group-hover:text-white transition-colors">{cat}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick links + newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3
              className="font-arabic-display font-bold text-white mb-5"
              style={{ fontSize: "1.1rem" }}
            >
              روابط سريعة
            </h3>
            <ul className="space-y-3 mb-8">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-arabic-body text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "var(--silver-dim)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "var(--violet-glow)" }}
                    />
                    <span className="group-hover:text-white transition-colors">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mini newsletter */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(76,29,149,0.15)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <p className="font-arabic-body text-xs mb-3" style={{ color: "var(--silver-dim)" }}>
                <Stars size={12} className="inline ml-1" style={{ color: "var(--nebula-pink)" }} />
                اشترك ليصلك آخر الإضافات
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 text-xs px-3 py-2 rounded-lg bg-transparent outline-none font-arabic-body text-right"
                  style={{
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "var(--silver)",
                  }}
                  dir="rtl"
                />
                <button
                  className="px-3 py-2 rounded-lg text-xs font-arabic-body text-white font-medium transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}
                >
                  اشترك
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(124,58,237,0.15)" }}
          dir="rtl"
        >
          <p className="font-arabic-body text-xs" style={{ color: "var(--silver-dim)" }}>
            © ٢٠٢٥ مكتبة النجوم — جميع الحقوق محفوظة
          </p>
          <p className="font-arabic-body text-xs flex items-center gap-1" style={{ color: "var(--silver-dim)" }}>
            صُنع بـ
            <Heart size={10} className="fill-current" style={{ color: "#f43f5e" }} />
            للقراء العرب في كل مكان
          </p>
        </div>
      </div>
    </footer>
  );
}
