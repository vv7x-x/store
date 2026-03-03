"use client";

import { motion } from "framer-motion";
import { BookMarked, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import NovelCard, { Novel } from "./NovelCard";

const NOVELS: Novel[] = [
  {
    id: 1,
    title: "أولاد حارتنا",
    author: "نجيب محفوظ",
    description:
      "رواية ملحمية تروي تاريخ البشرية من خلال أحداث حارة مصرية، وتتناول صراع الإنسان مع الطبيعة والمجهول في رحلة روحانية عميقة.",
    rating: 5,
    reviewCount: 1847,
    genre: "أدب كلاسيكي",
    coverGradient: "linear-gradient(135deg, #1a0533 0%, #4a1d96 50%, #7c3aed 100%)",
    year: "١٩٥٩",
  },
  {
    id: 2,
    title: "موسم الهجرة إلى الشمال",
    author: "الطيب صالح",
    description:
      "رواية تعدّ من أهم مئة رواية في العالم، تتناول صدام الحضارات والهوية المشتتة بين الشرق والغرب في سرد مشحون بالرمزية.",
    rating: 5,
    reviewCount: 2340,
    genre: "رواية حديثة",
    coverGradient: "linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #3b82f6 100%)",
    year: "١٩٦٦",
  },
  {
    id: 3,
    title: "الخيميائي",
    author: "باولو كويلو (ترجمة)",
    description:
      "رحلة روحية ملهمة يقوم بها راعٍ إسباني عبر الصحراء بحثاً عن كنزه الشخصي، في رواية عالمية ترجمت إلى العربية.",
    rating: 4,
    reviewCount: 3124,
    genre: "روحانيات",
    coverGradient: "linear-gradient(135deg, #451a03 0%, #92400e 50%, #fbbf24 100%)",
    year: "١٩٨٨",
  },
  {
    id: 4,
    title: "اللص والكلاب",
    author: "نجيب محفوظ",
    description:
      "رواية وجودية عميقة تصوّر انهيار إنسان تعرّض للخيانة، في رحلة انتقام محفوفة بالفلسفة وتساؤلات الهوية والعدالة.",
    rating: 5,
    reviewCount: 1203,
    genre: "أدب وجودي",
    coverGradient: "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #78716c 100%)",
    year: "١٩٦١",
  },
  {
    id: 5,
    title: "عزازيل",
    author: "يوسف زيدان",
    description:
      "رواية تاريخية فائزة بجائزة بوكر العربية، تروي قصة راهب مصري في القرن الخامس الميلادي وصراعه مع الشيطان عزازيل.",
    rating: 4,
    reviewCount: 987,
    genre: "تاريخية",
    coverGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #6366f1 100%)",
    year: "٢٠٠٨",
  },
  {
    id: 6,
    title: "مئة عام من العزلة",
    author: "ماركيز (ترجمة)",
    description:
      "ملحمة من الواقعية السحرية تتابع أجيال عائلة بوينديا في ماكوندو الخيالية، في رواية صنّفت كأعظم رواية في القرن العشرين.",
    rating: 5,
    reviewCount: 4501,
    genre: "واقعية سحرية",
    coverGradient: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #4ade80 100%)",
    year: "١٩٦٧",
  },
  {
    id: 7,
    title: "أيام في الحياة",
    author: "طه حسين",
    description:
      "سيرة ذاتية استثنائية لعميد الأدب العربي تحكي قصة طفولته في الريف المصري وكفاحه في طلب العلم رغم فقدان بصره.",
    rating: 4,
    reviewCount: 876,
    genre: "سيرة ذاتية",
    coverGradient: "linear-gradient(135deg, #082f49 0%, #0369a1 50%, #38bdf8 100%)",
    year: "١٩٢٩",
  },
  {
    id: 8,
    title: "زقاق المدق",
    author: "نجيب محفوظ",
    description:
      "جدارية إنسانية تصوّر حياة سكان زقاق شعبي في القاهرة إبان الحرب العالمية الثانية، بشخصياتها المعقدة وأحلامها المكسورة.",
    rating: 4,
    reviewCount: 1102,
    genre: "أدب اجتماعي",
    coverGradient: "linear-gradient(135deg, #431407 0%, #9a3412 50%, #f97316 100%)",
    year: "١٩٤٧",
  },
  {
    id: 9,
    title: "إبراهيم الكاتب",
    author: "إبراهيم المازني",
    description:
      "رواية كوميدية ساخرة من أوائل الروايات العربية الحديثة، تجسّد تجارب كاتبها الشخصية بأسلوب طريف وعقل نقدي حاد.",
    rating: 3,
    reviewCount: 543,
    genre: "ساخرة",
    coverGradient: "linear-gradient(135deg, #2d1b69 0%, #5b21b6 50%, #a78bfa 100%)",
    year: "١٩٣١",
  },
  {
    id: 10,
    title: "ثلاثية القاهرة",
    author: "نجيب محفوظ",
    description:
      "تحفة أدبية فائزة بنوبل تمتد عبر ثلاثة أجزاء تتتبع مصائر عائلة مصرية عبر عقود متعاقبة من التحولات الاجتماعية.",
    rating: 5,
    reviewCount: 5230,
    genre: "ملحمة اجتماعية",
    coverGradient: "linear-gradient(135deg, #3b0764 0%, #7e22ce 50%, #c084fc 100%)",
    year: "١٩٥٦",
  },
  {
    id: 11,
    title: "شطرنج",
    author: "ستيفان تسفايغ (ترجمة)",
    description:
      "رواية قصيرة ومركّزة عن عبقري شطرنج وسجين سابق في مواجهة غريبة على سفينة، في تشريح نفسي مذهل للعزلة والجنون.",
    rating: 4,
    reviewCount: 678,
    genre: "نفسية",
    coverGradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #60a5fa 100%)",
    year: "١٩٤١",
  },
  {
    id: 12,
    title: "رجال في الشمس",
    author: "غسان كنفاني",
    description:
      "رواية قصيرة ذات أثر عميق تحكي مأساة ثلاثة فلسطينيين يسعون للهجرة في شاحنة تحت شمس حارقة في رمزية صارخة.",
    rating: 5,
    reviewCount: 1456,
    genre: "سياسية",
    coverGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #fb923c 100%)",
    year: "١٩٦٣",
  },
];

const GENRES = ["الكل", ...Array.from(new Set(NOVELS.map((n) => n.genre)))];

export default function NovelsGrid({ searchQuery }: { searchQuery: string }) {
  const [activeGenre, setActiveGenre] = useState("الكل");
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");

  const filtered = useMemo(() => {
    let list = NOVELS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.includes(searchQuery) ||
          n.author.includes(searchQuery) ||
          n.genre.includes(searchQuery) ||
          n.description.includes(searchQuery)
      );
    }
    if (activeGenre !== "الكل") {
      list = list.filter((n) => n.genre === activeGenre);
    }
    return [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "title") return a.title.localeCompare(b.title, "ar");
      return 0;
    });
  }, [searchQuery, activeGenre, sortBy]);

  return (
    <section id="library" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-24 opacity-40" style={{ background: "var(--violet-glow)" }} />
          <BookMarked size={20} style={{ color: "var(--violet-glow)" }} />
          <div className="h-px w-24 opacity-40" style={{ background: "var(--violet-glow)" }} />
        </div>
        <h2
          className="font-arabic-display font-bold mb-3 text-white"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          مجموعة الروايات
        </h2>
        <p className="font-arabic-body text-base" style={{ color: "var(--silver-dim)" }}>
          اكتشف أجمل روايات الأدب العربي والعالمي المترجمة
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {/* Genre filter */}
        <div className="flex items-center gap-3 flex-wrap justify-center mb-4" dir="rtl">
          {GENRES.slice(0, 8).map((genre) => (
            <motion.button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className="px-4 py-2 rounded-full font-arabic-body text-xs font-medium transition-all duration-300"
              style={{
                background:
                  activeGenre === genre
                    ? "linear-gradient(135deg, #4c1d95, #7c3aed)"
                    : "rgba(13,16,53,0.6)",
                border: `1px solid ${activeGenre === genre ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.2)"}`,
                color: activeGenre === genre ? "#fff" : "var(--silver-dim)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
            </motion.button>
          ))}
        </div>

        {/* Sort + count row */}
        <div className="flex items-center justify-between flex-wrap gap-3" dir="rtl">
          <p className="font-arabic-body text-sm" style={{ color: "var(--silver-dim)" }}>
            يتم عرض{" "}
            <span style={{ color: "var(--nebula-pink)" }}>{filtered.length}</span> رواية
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} style={{ color: "var(--silver-dim)" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="font-arabic-body text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
              style={{
                background: "rgba(13,16,53,0.8)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "var(--silver)",
              }}
              dir="rtl"
            >
              <option value="rating">ترتيب حسب: التقييم</option>
              <option value="title">ترتيب حسب: الاسم</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((novel, index) => (
            <NovelCard key={novel.id} novel={novel} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(76,29,149,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
          >
            <BookMarked size={32} style={{ color: "var(--violet-glow)" }} />
          </div>
          <p className="font-arabic-display text-xl font-bold text-white mb-2">
            لا توجد نتائج
          </p>
          <p className="font-arabic-body text-sm" style={{ color: "var(--silver-dim)" }}>
            جرّب البحث بكلمات مختلفة
          </p>
        </motion.div>
      )}
    </section>
  );
}
