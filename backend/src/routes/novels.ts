import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { search = "", genre, sort = "rating", page = "1", limit = "12" } = req.query as Record<string, string>;
  const offset = (Number(page) - 1) * Number(limit);

  let base = "SELECT * FROM novels";
  const where: string[] = [];
  const params: any[] = [];

  if (search) {
    where.push("(title LIKE ? OR author LIKE ? OR description LIKE ? OR genre LIKE ?)");
    const q = `%${search}%`;
    params.push(q, q, q, q);
  }
  if (genre && genre !== "الكل") {
    where.push("genre = ?");
    params.push(genre);
  }

  if (where.length) base += ` WHERE ${where.join(" AND ")}`;

  let order = "ORDER BY rating DESC";
  if (sort === "title") order = "ORDER BY title COLLATE NOCASE ASC";

  const totalRow = db.prepare(base.replace("*", "COUNT(*) as cnt")).get(...params);
  const total = totalRow ? totalRow.cnt : 0;

  const rows = db.prepare(`${base} ${order} LIMIT ? OFFSET ?`).all(...params, Number(limit), Number(offset));

  res.json({ total, page: Number(page), limit: Number(limit), items: rows });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare("SELECT * FROM novels WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

router.post("/", (req, res) => {
  const { title, author, description, rating = 0, reviewCount = 0, genre = "عام", coverGradient = "", year = "", pdfUrl = null } = req.body;
  const result = db.prepare(
    `INSERT INTO novels (title, author, description, rating, reviewCount, genre, coverGradient, year, pdfUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(title, author, description, rating, reviewCount, genre, coverGradient, year, pdfUrl);
  const created = db.prepare("SELECT * FROM novels WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(created);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author, description, rating, reviewCount, genre, coverGradient, year, pdfUrl } = req.body;
  const exists = db.prepare("SELECT id FROM novels WHERE id = ?").get(id);
  if (!exists) return res.status(404).json({ error: "Not found" });
  db.prepare(
    `UPDATE novels SET title = ?, author = ?, description = ?, rating = ?, reviewCount = ?, genre = ?, coverGradient = ?, year = ?, pdfUrl = ? WHERE id = ?`
  ).run(title, author, description, rating, reviewCount, genre, coverGradient, year, pdfUrl, id);
  const updated = db.prepare("SELECT * FROM novels WHERE id = ?").get(id);
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare("DELETE FROM novels WHERE id = ?").run(id);
  if (info.changes === 0) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

export default router;
