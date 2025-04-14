// src/csrf.js
import { doubleCsrf } from "csrf-csrf";

export const {
  generateToken,
  doubleCsrfProtection,
  invalidCsrfTokenError,
  csrfTokenByCookie,
} = doubleCsrf({
  getSecret: (req) => req.session.csrfSecret,
  cookieName: "XSRF-TOKEN",
  cookieOptions: {
    sameSite: "none",
    secure: true,
  },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

// ✅ 補上這段 Error handler
export function csrfErrorHandler(err, req, res, next) {
  if (err === invalidCsrfTokenError) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next(err);
}