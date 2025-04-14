// csrf.js
import { doubleCsrf } from "csrf-csrf";

const {
  generateToken,
  doubleCsrfProtection,
  invalidCsrfTokenError,
  csrfTokenByCookie,
  csrfErrorHandler,
} = doubleCsrf({
  getSecret: (req) => req.session.id,
  cookieName: "csrf-token",
  cookieOptions: {
    sameSite: "none",
    secure: true,
  },
  size: 64,
});

export {
  generateToken,
  doubleCsrfProtection,
  invalidCsrfTokenError,
  csrfTokenByCookie,
  csrfErrorHandler,
};
