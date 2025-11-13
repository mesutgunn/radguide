import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://radguide.vercel.app"],
}));

app.get("/", (_, res) => res.json({ message: "Backend çalışıyor!" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => console.log("Server running on port", PORT));
