"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

const floatingBooks = [
  { title: "ألف ليلة وليلة", angle: -15, delay: 0, x: -280 },
  { title: "البخلاء", angle: 8, delay: 0.3, x: 300 },
  { title: "كليلة ودمنة", angle: -8, delay: 0.6, x: -180 },
];

export default function HeroSection({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    const target = document.getElementById("library");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">

      {/* Cosmic gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,29,149,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,58,237,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 70%, rgba(45,27,105,0.2) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Shooting star lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[
          { top: "15%", left: "10%", w: 120, delay: 0 },
          { top: "35%", left: "70%", w: 80, delay: 1.5 },
          { top: "60%", left: "30%", w: 100, delay: 3 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: s.top,
              left: s.left,
              width: s.w,
              background: "linear-gradient(90deg, transparent, rgba(200,205,216,0.7), transparent)",
              transform: "rotate(-30deg)",
            }}
            animate={{ opacity: [0, 1, 0], x: [0, 60, 120] }}
            transition={{
              duration: 2,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-arabic-body text-sm"
          style={{
            background: "rgba(76,29,149,0.3)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "var(--nebula-pink)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles size={14} />
          أكثر من ٥٠٠ رواية عربية في انتظارك
          <Sparkles size={14} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-arabic-display font-bold text-center leading-tight mb-6"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            lineHeight: 1.3,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="shimmer-text">
            سافر بين النجوم
          </span>
          <br />
          <span
            className="text-white"
            style={{ textShadow: "0 0 40px rgba(124,58,237,0.6)" }}
          >
            مع أجمل الروايات العربية
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-arabic-body text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: "var(--silver-dim)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          اكتشف عوالم لا حدود لها من خلال مجموعتنا المختارة بعناية من الروايات الكلاسيكية والحديثة
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 focus-within:shadow-lg"
            style={{
              background: "rgba(13,16,53,0.8)",
              border: "1px solid rgba(124,58,237,0.35)",
              backdropFilter: "blur(20px)",
            }}
            onFocus={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(124,58,237,0.8)";
              el.style.boxShadow = "0 0 30px rgba(124,58,237,0.2)";
            }}
            onBlur={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(124,58,237,0.35)";
              el.style.boxShadow = "none";
            }}
          >
            <button
              type="submit"
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "linear-gradient(135deg, #4c1d95, #7c3aed)" }}
              aria-label="بحث"
            >
              <Search size={16} className="text-white" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن رواية، كاتب، أو تصنيف..."
              className="flex-1 bg-transparent outline-none font-arabic-body text-sm text-right"
              style={{ color: "var(--silver)", caretColor: "var(--violet-glow)" }}
              dir="rtl"
            />
          </div>

          {/* Search hints */}
          <div className="flex gap-3 justify-center mt-3 flex-wrap">
            {["نجيب محفوظ", "الخيال العلمي", "روايات كلاسيكية"].map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={() => { setQuery(hint); onSearch(hint); }}
                className="text-xs px-3 py-1 rounded-full font-arabic-body transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(76,29,149,0.2)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  color: "var(--silver-dim)",
                }}
              >
                {hint}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[
            { value: "٥٠٠+", label: "رواية" },
            { value: "١٢٠+", label: "كاتب" },
            { value: "٢٥+", label: "تصنيف" },
            { value: "مجاني", label: "للجميع" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-arabic-display font-bold text-2xl text-glow"
                style={{ color: "var(--nebula-pink)" }}
              >
                {stat.value}
              </div>
              <div className="font-arabic-body text-xs mt-1" style={{ color: "var(--silver-dim)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#library"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-arabic-body text-xs" style={{ color: "var(--silver-dim)" }}>
          اكتشف المجموعة
        </span>
        <ChevronDown
          size={20}
          style={{ color: "var(--violet-glow)" }}
          className="group-hover:scale-125 transition-transform"
        />
      </motion.a>
    </section>
  );
}
