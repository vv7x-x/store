"use client";

import { motion } from "framer-motion";
import { BookMarked, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import NovelCard, { Novel } from "./NovelCard";

const FALLBACK: Novel[] = [
  // minimal fallback (kept small) - frontend already contains full data
];

export default function NovelsGrid({ searchQuery }: { searchQuery: string }) {
  const [novels, setNovels] = useState<Novel[] | null>(null);
  const [activeGenre, setActiveGenre] = useState("الكل");
  const [sortBy, setSortBy] = useState<"rating" | "title">("rating");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/novels?limit=1000`);
        if (!res.ok) return;
        const json = await res.json();
        if (mounted && json?.items) setNovels(json.items as Novel[]);
      } catch (e) {
        // ignore - keep fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const data = novels ?? FALLBACK;

  const GENRES = useMemo(() => ["الكل", ...Array.from(new Set(data.map((n) => n.genre)))], [data]);

  const filtered = useMemo(() => {
    let list = data;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q) ||
          n.genre.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q)
      );
    }
    if (activeGenre !== "الكل") list = list.filter((n) => n.genre === activeGenre);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title, "ar"));
    return list;
  }, [data, searchQuery, activeGenre, sortBy]);

  return (
    <section id="library" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-24 opacity-40" style={{ background: "var(--violet-glow)" }} />
          <BookMarked size={20} style={{ color: "var(--violet-glow)" }} />
          <div className="h-px w-24 opacity-40" style={{ background: "var(--violet-glow)" }} />
        </div>
        <h2 className="font-arabic-display font-bold mb-3 text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          مجموعة الروايات
        </h2>
        <p className="font-arabic-body text-base" style={{ color: "var(--silver-dim)" }}>
          اكتشف أجمل روايات الأدب العربي والعالمي المترجمة
        </p>
      </motion.div>

      <motion.div className="mb-10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-3 flex-wrap justify-center mb-4" dir="rtl">
          {GENRES.slice(0, 8).map((genre) => (
            <motion.button key={genre} onClick={() => setActiveGenre(genre)} className="px-4 py-2 rounded-full font-arabic-body text-xs font-medium transition-all duration-300" style={{ background: activeGenre === genre ? "linear-gradient(135deg, #4c1d95, #7c3aed)" : "rgba(13,16,53,0.6)", border: `1px solid ${activeGenre === genre ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.2)"}`, color: activeGenre === genre ? "#fff" : "var(--silver-dim)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {genre}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3" dir="rtl">
          <p className="font-arabic-body text-sm" style={{ color: "var(--silver-dim)" }}>
            يتم عرض <span style={{ color: "var(--nebula-pink)" }}>{filtered.length}</span> رواية
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} style={{ color: "var(--silver-dim)" }} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="font-arabic-body text-xs rounded-lg px-3 py-2 outline-none cursor-pointer" style={{ background: "rgba(13,16,53,0.8)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--silver)" }} dir="rtl">
              <option value="rating">ترتيب حسب: التقييم</option>
              <option value="title">ترتيب حسب: الاسم</option>
            </select>
          </div>
        </div>
      </motion.div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((novel, index) => (
            <NovelCard key={novel.id} novel={novel} index={index} />
          ))}
        </div>
      ) : (
        <motion.div className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(76,29,149,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <BookMarked size={32} style={{ color: "var(--violet-glow)" }} />
          </div>
          <p className="font-arabic-display text-xl font-bold text-white mb-2">لا توجد نتائج</p>
          <p className="font-arabic-body text-sm" style={{ color: "var(--silver-dim)" }}>جرّب البحث بكلمات مختلفة</p>
        </motion.div>
      )}
    </section>
  );
}
