export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
  status: "active" | "unsubscribed";
  unsubscribedAt?: string;
}

// Allowed signup sources (whitelist)
const ALLOWED_SOURCES = [
  "homepage",
  "footer",
  "blog",
  "tool-page",
  "tools",
  "unknown",
] as const;

export type SignupSource = (typeof ALLOWED_SOURCES)[number];

export function isValidSource(source: string): source is SignupSource {
  return ALLOWED_SOURCES.includes(source as SignupSource);
}

export function sanitizeSource(source: string | undefined): SignupSource {
  if (!source) return "unknown";
  return isValidSource(source) ? source : "unknown";
}

// RFC 5321-aligned practical email validation
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) return false;

  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");
  if (domainParts.length < 2) return false;

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  return true;
}

// Generate unsubscribe token with randomness
export function generateUnsubscribeToken(
  email: string,
  secret: string
): string {
  // Include timestamp for uniqueness -- not just deterministic hash
  const timestamp = Date.now().toString(36);
  let hash = 0;
  const str = `${email}:${secret}:${timestamp}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `${Math.abs(hash).toString(36)}-${timestamp}`;
}
