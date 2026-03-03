"use client";

import { motion } from "framer-motion";
import { Star, Download, BookOpen, User } from "lucide-react";
import Image from "next/image";

export interface Novel {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviewCount: number;
  genre: string;
  coverColor: string;
  coverGradient: string;
  pdfUrl?: string;
  coverImage?: string;
  year: string;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= Math.floor(rating) ? "fill-current" : ""}
            style={{
              color: star <= Math.floor(rating) ? "var(--star-gold)" : "var(--silver-dim)",
              opacity: star <= Math.floor(rating) ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      <span
        className="font-arabic-body text-xs"
        style={{ color: "var(--silver-dim)" }}
        dir="rtl"
      >
        ({count})
      </span>
    </div>
  );
}

export default function NovelCard({ novel, index }: { novel: Novel; index: number }) {
  return (
    <motion.article
      className="novel-card group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "var(--card-glass)",
        border: "1px solid var(--card-border)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      whileHover={{
        boxShadow: "0 20px 60px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.4)",
      }}
    >
      {/* Cover image area */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <div
          className="novel-card-cover absolute inset-0"
          style={{
            background: novel.coverGradient,
          }}
        />

        {/* Cinematic cover overlay with geometric pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                transparent 1px,
                transparent 20px
              )
            `,
          }}
        />

        {/* Book icon / title on cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 opacity-70"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <BookOpen size={24} className="text-white" />
          </div>
          <p
            className="font-arabic-display text-white text-center font-bold leading-snug"
            style={{ fontSize: "1.1rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {novel.title}
          </p>
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 end-3">
          <span
            className="px-2.5 py-1 rounded-full font-arabic-body text-xs font-medium"
            style={{
              background: "rgba(76,29,149,0.7)",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "var(--nebula-pink)",
              backdropFilter: "blur(8px)",
            }}
          >
            {novel.genre}
          </span>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 start-3">
          <span
            className="px-2 py-1 rounded-md font-arabic-body text-xs"
            style={{
              background: "rgba(5,7,26,0.7)",
              color: "var(--silver-dim)",
              backdropFilter: "blur(8px)",
            }}
          >
            {novel.year}
          </span>
        </div>

        {/* Hover overlay with shimmer */}
        <div
          className="novel-card-overlay absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(76,29,149,0.25) 100%)",
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: "linear-gradient(to top, var(--card) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1" dir="rtl">
        {/* Title & Author */}
        <div>
          <h3
            className="font-arabic-display font-bold text-lg leading-snug mb-1 text-white group-hover:text-glow transition-all duration-300"
            style={{ color: "#fff" }}
          >
            {novel.title}
          </h3>
          <div className="flex items-center gap-2">
            <User size={12} style={{ color: "var(--silver-dim)" }} />
            <span className="font-arabic-body text-sm" style={{ color: "var(--silver-dim)" }}>
              {novel.author}
            </span>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={novel.rating} count={novel.reviewCount} />

        {/* Description */}
        <p
          className="font-arabic-body text-sm leading-relaxed flex-1 line-clamp-3"
          style={{ color: "var(--silver-dim)" }}
        >
          {novel.description}
        </p>

        {/* Download button */}
        <motion.a
          href={novel.pdfUrl || "#"}
          download
          className="mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-arabic-body text-sm font-medium text-white transition-all duration-300 group/btn"
          style={{
            background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
            border: "1px solid rgba(124,58,237,0.4)",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 25px rgba(124,58,237,0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            if (!novel.pdfUrl) e.preventDefault();
          }}
        >
          <Download
            size={15}
            className="group-hover/btn:animate-bounce"
            style={{ color: "var(--nebula-pink)" }}
          />
          تحميل PDF
        </motion.a>
      </div>
    </motion.article>
  );
}
