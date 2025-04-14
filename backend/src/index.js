// backend/src/index.js
import express from "express";
import cors from "cors";
import { prisma } from "./adapters.js";
import rootRouter from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import { csrfErrorHandler, doubleCsrfProtection } from "./csrf.js";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8000;

const app = express();

// ✅ 1. 安全基本設置
app.use(helmet());

// ✅ 2. CORS 設定（確保前端來源安全）
app.use(cors({
  origin: "https://omg-frontend.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-csrf-token"],
}));

// ✅ 3. 基本中介層
app.use(express.json());
app.use(cookieParser());
app.use(xss());

// ✅ 4. 部署 HTTPS 必備設定
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ✅ 5. session 設定
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// ✅ 6. CSRF 保護
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);

// ✅ 7. Referer 防偽（簡單對抗 curl/Burp 爆破）
app.use((req, res, next) => {
  const referer = req.get("Referer");
  if (referer && !referer.startsWith("https://omg-frontend.onrender.com")) {
    return res.status(403).json({ error: "Forbidden: Invalid Referer" });
  }
  next();
});

// ✅ 8. Rate Limiting（打爆 API 的防線）
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { error: "🚫 Too many requests, please slow down!" },
});
app.use("/api", limiter); // API 前綴保護

// ✅ 9. 主路由
app.use(rootRouter);

// ✅ 10. 錯誤攔截（防止錯誤洩露）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ 11. 404 fallback
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// ✅ 12. 啟動
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 API running at http://0.0.0.0:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
