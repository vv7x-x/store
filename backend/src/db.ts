import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "backend", "data.db");
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS novels (
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT,
  description TEXT,
  rating REAL,
  reviewCount INTEGER,
  genre TEXT,
  coverGradient TEXT,
  year TEXT,
  pdfUrl TEXT
);
`);

const row = db.prepare("SELECT COUNT(*) as cnt FROM novels").get() as { cnt: number };
if (!row || row.cnt === 0) {
  const NOVELS = [
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

  const insert = db.prepare(
    `INSERT INTO novels (id, title, author, description, rating, reviewCount, genre, coverGradient, year, pdfUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertMany = db.transaction((novels: any[]) => {
    for (const n of novels) {
      insert.run(
        n.id,
        n.title,
        n.author,
        n.description,
        n.rating,
        n.reviewCount || 0,
        n.genre,
        n.coverGradient || "",
        n.year || "",
        n.pdfUrl || null
      );
    }
  });

  insertMany(NOVELS);
}

export default db;
