import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 12;

const getAdminSecret = () => process.env.ADMIN_SECRET_KEY || "";

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
};

const sign = (payload) =>
  crypto
    .createHmac("sha256", getAdminSecret())
    .update(payload)
    .digest("base64url");

export const isAdminConfigured = () => Boolean(getAdminSecret());

export const isValidAdminPassword = (password) => {
  const secret = getAdminSecret();
  return Boolean(secret && password && safeEqual(password, secret));
};

export const createAdminSession = () => {
  const payload = `v1.${Math.floor(Date.now() / 1000)}`;
  return `${payload}.${sign(payload)}`;
};

export const isValidAdminSession = (token) => {
  if (!token || !isAdminConfigured()) return false;

  const [version, issuedAtValue, signature] = String(token).split(".");
  if (version !== "v1" || !issuedAtValue || !signature) return false;

  const issuedAt = Number(issuedAtValue);
  const now = Math.floor(Date.now() / 1000);
  if (
    !Number.isFinite(issuedAt) ||
    issuedAt > now + 60 ||
    now - issuedAt > ADMIN_SESSION_SECONDS
  ) {
    return false;
  }

  return safeEqual(signature, sign(`${version}.${issuedAtValue}`));
};

const readCookie = (req, name) => {
  const cookieHeader = req.headers.cookie || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!cookie) return "";
  return decodeURIComponent(cookie.slice(name.length + 1));
};

export const isAdminRequest = (req) => {
  const secret = getAdminSecret();
  if (!secret) return false;

  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return safeEqual(authHeader.slice(7), secret);
  }

  return isValidAdminSession(readCookie(req, ADMIN_COOKIE_NAME));
};

export const serializeAdminCookie = (value, maxAge = ADMIN_SESSION_SECONDS) => {
  const parts = [
    `${ADMIN_COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
  ];

  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
};
