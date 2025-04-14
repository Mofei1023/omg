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
