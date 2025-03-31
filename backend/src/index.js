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

// ✅ 加上 CORS 設定，允許 frontend 跨網域請求 + 送出 cookie
app.use(cors({
  origin: "https://omg-frontend.onrender.com",
  credentials: true,
}));

// ✅ JSON 與 cookie middleware 要在 session 前面也沒關係，這樣更保險
app.use(express.json());
app.use(cookieParser());

// ✅ 記得：production 環境必須設 trust proxy 才能正確處理 cookie
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only send cookie over https
    sameSite: "none", // 改成 none 才能跨域 cookie（搭配 credentials: true）
    maxAge: 1000 * 60 * 60 * 24, // optional: 1 天
  },
}));

// ✅ 放在 session 後面，才能正確讀到 session id
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);

// ✅ 掛入所有 API routes
app.use(rootRouter);

// 測試用
app.get("/visit", (req, res) => {
  req.session.view = (req.session.view || 0) + 1;
  res.send(`<h1>Visit: ${req.session.view}</h1>`);
});

// fallback
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 API running at http://localhost:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
