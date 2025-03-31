import express from "express";
import cors from "cors";
import { prisma } from "./adapters.js";
import rootRouter from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import { csrfErrorHandler, doubleCsrfProtection } from "./csrf.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8000;

const app = express();

// ★ CORS：一定要 origin 指定前端網址 + credentials
app.use(cors({
  origin: "https://omg-frontend.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-csrf-token"],
}));

app.use(express.json());
app.use(cookieParser());

// ★ 在 production 環境下要 trust proxy
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ★ session 設置重點：sameSite 要 "none"、secure 要 true（在 https 下）
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "none",            // ← 關鍵！必須是 none
    secure: process.env.NODE_ENV === "production", 
    maxAge: 1000 * 60 * 60 * 24, // 1天
  },
}));

// ★ CSRF 必須在 session 後面，並保證 cookie 一起帶上
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);

app.use(rootRouter);

app.get("/visit", (req, res) => {
  req.session.view = (req.session.view || 0) + 1;
  res.send(`<h1>Visit: ${req.session.view}</h1>`);
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 API running at http://0.0.0.0:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
