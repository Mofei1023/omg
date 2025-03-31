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

// ✅ 加上 CORS 設定，讓 frontend 能跨網域請求
app.use(cors({
  origin: "https://omg-frontend.onrender.com", // 你的 frontend 網域
  credentials: true
}));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  session({
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: null,
    },
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);
app.use(rootRouter);

// 測試用 route
app.get("/visit", (req, res) => {
  if (typeof req.session.view === "number") {
    req.session.view++;
  } else {
    req.session.view = 0;
  }
  res.send(`<h1>Visit: ${req.session.view}</h1>`);
});

// fallback
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`🚀 API running at http://localhost:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
