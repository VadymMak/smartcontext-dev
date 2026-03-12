// ============================================================
// src/lib/spamFilter.ts
// 3-layer spam protection for /api/chat and /api/contact
//
// LAYER 1: Honeypot field
// LAYER 2: reCAPTCHA v3 (silent, no checkbox)
// LAYER 3: Custom spam scoring (gibberish + fake name + disposable email)
// ============================================================

// ============================================================
// LAYER 1: Honeypot
// In your form add: <input type="text" name="website" style="position:absolute;opacity:0;pointer-events:none" tabindex="-1" autocomplete="off" />
// Real human = never fills it → Bot = fills every field
// ============================================================
export function checkHoneypot(honeypot: string | undefined): boolean {
  return !!honeypot; // true = spam
}

// ============================================================
// LAYER 2: reCAPTCHA v3
// Requires: RECAPTCHA_SECRET_KEY in .env.local
// Get keys: https://www.google.com/recaptcha/admin
// ============================================================
export async function checkRecaptcha(
  token: string | undefined,
): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) return false; // skip if not configured

  if (!token) return true; // no token = block

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  const data = (await res.json()) as { success: boolean; score: number };

  // Score below 0.5 = likely bot
  return !data.success || data.score < 0.5; // true = spam
}

// ============================================================
// LAYER 3: Custom spam scoring algorithm
// Combined score 0.0–1.0 → above 0.5 = blocked
// ============================================================

// Disposable email domains blacklist
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "spamgourmet.com",
  "getairmail.com",
  "discard.email",
  "spamherelots.com",
  "mailnull.com",
  "spamex.com",
  "mailexpire.com",
  "tempr.email",
  "throwam.com",
  "10minutemail.com",
]);

// Gibberish detection: too few vowels = random keyboard mashing
function gibberishScore(text: string): number {
  if (!text || text.length < 4) return 0;
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (!letters.length) return 0;
  const vowels = letters.match(/[aeiouAEIOU]/g)?.length ?? 0;
  const ratio = vowels / letters.length;
  // Normal text: 35–50% vowels. Below 15% = gibberish
  if (ratio < 0.15) return 1.0;
  if (ratio < 0.25) return 0.5;
  return 0;
}

// Fake name detection: rAnDoM cAsE pattern
function fakeNameScore(name: string): number {
  if (!name || name.length < 3) return 0;
  const letters = name.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 3) return 0;

  let alternations = 0;
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) alternations++;
  }

  const ratio = alternations / (letters.length - 1);
  // Normal name: low alternation. Above 60% = random case
  if (ratio > 0.6) return 1.0;
  if (ratio > 0.4) return 0.5;
  return 0;
}

// Disposable email detection
function disposableEmailScore(email: string): number {
  if (!email) return 0;
  const domain = email.split("@")[1]?.toLowerCase();
  return domain && DISPOSABLE_DOMAINS.has(domain) ? 1.0 : 0;
}

// Message quality checks
function messageScore(message: string): number {
  if (!message) return 0;
  let score = 0;

  // Too short
  if (message.length < 10) score += 0.3;

  // All caps
  const letters = message.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 5) {
    const upperRatio = (letters.match(/[A-Z]/g)?.length ?? 0) / letters.length;
    if (upperRatio > 0.7) score += 0.3;
  }

  // Gibberish message
  score += gibberishScore(message) * 0.4;

  return Math.min(score, 1.0);
}

export interface SpamCheckResult {
  isSpam: boolean;
  score: number;
  reason: string;
}

export function checkSpamScore({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): SpamCheckResult {
  const nameScore = fakeNameScore(name) * 0.25;
  const emailScore = disposableEmailScore(email) * 0.4;
  const msgScore = messageScore(message) * 0.35;

  const total = nameScore + emailScore + msgScore;
  const isSpam = total > 0.5;

  let reason = "";
  if (isSpam) {
    if (disposableEmailScore(email)) reason = "disposable email";
    else if (fakeNameScore(name) > 0.5) reason = "fake name pattern";
    else reason = "low quality content";
  }

  return { isSpam, score: total, reason };
}
