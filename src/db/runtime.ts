import { getCloudflareContext } from "@opennextjs/cloudflare";

export function isCloudflareWorker(): boolean {
  try {
    getCloudflareContext();
    return true;
  } catch {
    return false;
  }
}

/** True when a database binding is available (local SQLite or Cloudflare D1). */
export function hasDatabase(): boolean {
  if (!isCloudflareWorker()) return true;
  try {
    const { env } = getCloudflareContext();
    return Boolean(env?.DB);
  } catch {
    return false;
  }
}
