export const SESSION_COOKIE_NAME = "lumina_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14; // 14 giorni

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

const textEncoder = new TextEncoder();

function getSigningSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!secret) {
    throw new Error(
      "Missing ADMIN_SESSION_SECRET or SUPABASE_SERVICE_ROLE_KEY for session signing."
    );
  }
  return secret;
}

export function getAllowedAdminEmails(): string[] {
  const configured = (process.env.ADMIN_EMAIL || "psi.padalino@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return configured.length > 0 ? configured : ["psi.padalino@gmail.com"];
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array | null {
  try {
    const padded = str.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const binary = atob(padded + "=".repeat(padLen));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

async function signHmacSha256(data: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, textEncoder.encode(data));
  return new Uint8Array(sig);
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

/**
 * Crea un token di sessione admin firmato crittograficamente (HMAC-SHA256)
 */
export async function createSignedAdminToken(email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    role: "admin",
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const payloadEncoded = toBase64Url(textEncoder.encode(JSON.stringify(payload)));
  const signature = await signHmacSha256(payloadEncoded, getSigningSecret());
  return `${payloadEncoded}.${toBase64Url(signature)}`;
}

/**
 * Verifica crittograficamente firma, scadenza e identità del token di sessione
 */
export async function verifySignedAdminToken(
  token: string | undefined | null
): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadEncoded, signatureEncoded] = parts;
  if (!payloadEncoded || !signatureEncoded) return null;

  try {
    const providedSig = fromBase64Url(signatureEncoded);
    if (!providedSig) return null;

    const expectedSig = await signHmacSha256(payloadEncoded, getSigningSecret());
    if (!timingSafeEqualBytes(providedSig, expectedSig)) {
      return null;
    }

    const payloadBytes = fromBase64Url(payloadEncoded);
    if (!payloadBytes) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(payloadBytes)
    ) as AdminSessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (
      payload.role !== "admin" ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= now
    ) {
      return null;
    }

    const allowed = getAllowedAdminEmails();
    if (!allowed.includes(payload.email.toLowerCase())) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Confronto password a tempo costante tramite hash SHA-256 (previene timing attacks)
 */
export async function verifySecretConstantTime(
  provided: string,
  expected: string
): Promise<boolean> {
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest("SHA-256", textEncoder.encode(provided)),
    crypto.subtle.digest("SHA-256", textEncoder.encode(expected)),
  ]);
  return timingSafeEqualBytes(new Uint8Array(hashA), new Uint8Array(hashB));
}

/**
 * Rate limiter leggero in memoria (sliding window) per login, download e form contatti
 */
const rateLimitStore = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const existing = (rateLimitStore.get(key) || []).filter(
    (ts) => ts > windowStart
  );

  if (existing.length >= maxRequests) {
    const oldest = existing[0] || now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    rateLimitStore.set(key, existing);
    return { allowed: false, retryAfterSeconds };
  }

  existing.push(now);
  rateLimitStore.set(key, existing);

  // Pulizia periodica per evitare crescita della memoria
  if (rateLimitStore.size > 500) {
    for (const [k, timestamps] of rateLimitStore.entries()) {
      const fresh = timestamps.filter((ts) => ts > windowStart);
      if (fresh.length === 0) rateLimitStore.delete(k);
      else rateLimitStore.set(k, fresh);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}
