"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "الكتاب مرآة الإنسانية، وفي كل صفحة منه وجه لم تعرفه من قبل.",
    author: "نجيب محفوظ",
  },
  {
    text: "القراءة تمنحك الحياة مرتين: مرة حين تعيشها، ومرة حين تقرأ عنها.",
    author: "حكمة عربية",
  },
  {
    text: "في كل كتاب نجمة تنتظر من يحرر ضوءها.",
    author: "مكتبة النجوم",
  },
];

export default function QuoteSection() {
  return (
    <section className="relative z-10 py-24 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(76,29,149,0.12) 0%, transparent 70%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Decorative lines */}
      <div className="absolute inset-y-0 right-0 w-px opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, var(--violet-glow), transparent)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-0 w-px opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, var(--violet-glow), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
          >
            <Quote size={20} style={{ color: "var(--violet-glow)" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
          {quotes.map((quote, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-2xl text-center"
              style={{
                background: "rgba(13,16,53,0.5)",
                border: "1px solid rgba(124,58,237,0.2)",
                backdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{
                borderColor: "rgba(124,58,237,0.5)",
                boxShadow: "0 10px 40px rgba(124,58,237,0.15)",
              }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 right-6 font-arabic-display text-5xl leading-none opacity-20"
                style={{ color: "var(--violet-glow)" }}
                aria-hidden="true"
              >
                "
              </span>

              <p
                className="font-arabic-display text-lg leading-relaxed mb-6 relative z-10"
                style={{ color: "var(--silver)", lineHeight: 1.8 }}
              >
                {quote.text}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 opacity-30" style={{ background: "var(--violet-glow)" }} />
                <span
                  className="font-arabic-body text-sm font-medium"
                  style={{ color: "var(--nebula-pink)" }}
                >
                  — {quote.author}
                </span>
                <div className="h-px flex-1 opacity-30" style={{ background: "var(--violet-glow)" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
