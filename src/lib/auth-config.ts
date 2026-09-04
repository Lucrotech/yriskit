const LOCAL_ORIGIN = "http://localhost:3000";

function envOrigin(key: string) {
  const value = process.env[key]?.trim();
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return value.replace(/\/$/, "");
  }
}

/** Origins allowed for Better Auth callbacks (login, register, etc.). */
export function authTrustedOrigins(): string[] {
  const origins = new Set<string>([LOCAL_ORIGIN, "https://*.workers.dev"]);

  for (const key of [
    "BETTER_AUTH_URL",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SITE_URL",
  ]) {
    const origin = envOrigin(key);
    if (origin) origins.add(origin);
  }

  const extra = process.env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (extra) {
    for (const part of extra.split(",")) {
      const origin = part.trim().replace(/\/$/, "");
      if (origin) origins.add(origin);
    }
  }

  return [...origins];
}

export function authBaseUrl() {
  return (
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    LOCAL_ORIGIN
  );
}
