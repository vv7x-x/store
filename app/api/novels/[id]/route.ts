import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Novel = { id: number };

async function loadNovels(): Promise<Novel[]> {
  const file = path.resolve(process.cwd(), "data", "novels.json");
  const content = await fs.readFile(file, "utf-8");
  return JSON.parse(content) as Novel[];
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const all = await loadNovels();
  const found = all.find((n) => n.id === id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}
