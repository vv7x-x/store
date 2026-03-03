import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Novel = {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviewCount: number;
  genre: string;
  coverGradient: string;
  year: string;
};

async function loadNovels(): Promise<Novel[]> {
  const file = path.resolve(process.cwd(), "data", "novels.json");
  const content = await fs.readFile(file, "utf-8");
  return JSON.parse(content) as Novel[];
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const genre = url.searchParams.get("genre");
  const sort = url.searchParams.get("sort") || "rating";
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "12");

  const all = await loadNovels();
  let filtered = all;
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (n) => n.title.includes(q) || n.author.includes(q) || n.genre.includes(q) || n.description.includes(q)
    );
  }
  if (genre && genre !== "الكل") filtered = filtered.filter((n) => n.genre === genre);
  if (sort === "rating") filtered = filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "title") filtered = filtered.sort((a, b) => a.title.localeCompare(b.title, "ar"));

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return NextResponse.json({ total, page, limit, items });
}
