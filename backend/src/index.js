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

// ✅ 1. CORS：一定要 origin 指定前端網址，credentials: true 才能帶 cookie
app.use(cors({
  origin: "https://omg-frontend.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-csrf-token"], // ✅ 必須允許 CSRF token header
}));

app.use(express.json());
app.use(cookieParser());

// ✅ 2. 如果部署在 https，要加 trust proxy
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ✅ 3. 設定 session（secure 必須配合 https）
// name 是 cookie 名稱，可以自訂
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "none",                     // ⛔️ 若不同源一定要用 none
    secure: process.env.NODE_ENV === "production", // ⚠️ 一定要 https 才設 true
    maxAge: 1000 * 60 * 60 * 24,          // 1天
  },
}));

// ✅ 4. CSRF middleware 一定要放在 session 後
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);

// ✅ 5. 你的主要路由（一定要在 CSRF middleware 後）
app.use(rootRouter);

// 範例 GET：計數器
app.get("/visit", (req, res) => {
  req.session.view = (req.session.view || 0) + 1;
  res.send(`<h1>Visit: ${req.session.view}</h1>`);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 API running at http://0.0.0.0:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
