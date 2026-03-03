import express from "express";
import cors from "cors";
import novelsRouter from "./routes/novels.js";
import "./db.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/novels", novelsRouter);

app.get("/", (req, res) => res.json({ name: "Store backend", version: "0.1.0" }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
