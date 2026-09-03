import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { hasDatabase } from "./runtime";

const globalForDb = globalThis as unknown as {
  sqlite?: Database.Database;
};

type Db = ReturnType<typeof drizzle>;

let cached: Db | undefined;

function sqlitePath() {
  return process.env.SQLITE_PATH || path.join(process.cwd(), "data", "yriskit.db");
}

function openSqlite() {
  if (globalForDb.sqlite) return globalForDb.sqlite;
  const file = sqlitePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const sqlite = new Database(file);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  applySchema(sqlite);
  void import("./seed").then(({ seedIfEmpty }) => seedIfEmpty());
  globalForDb.sqlite = sqlite;
  return sqlite;
}

function applySchema(sqlite: Database.Database) {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      email_verified INTEGER NOT NULL DEFAULT 0,
      image TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      phone TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS session (
      id TEXT PRIMARY KEY,
      expires_at INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS account (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      issuer TEXT,
      access_token TEXT,
      refresh_token TEXT,
      id_token TEXT,
      access_token_expires_at INTEGER,
      refresh_token_expires_at INTEGER,
      scope TEXT,
      password TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS verification (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER,
      updated_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      registration_number TEXT,
      vertical TEXT,
      phone TEXT,
      fic_org_id TEXT,
      crm_status TEXT NOT NULL DEFAULT 'lead',
      last_contacted_at INTEGER,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      vertical TEXT NOT NULL DEFAULT 'generic',
      description TEXT NOT NULL,
      one_off_price_cents INTEGER NOT NULL,
      annual_price_cents INTEGER NOT NULL,
      renewal_months INTEGER NOT NULL DEFAULT 12,
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS clause_blocks (
      id TEXT PRIMARY KEY,
      product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL REFERENCES products(id),
      kind TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      paylink_id TEXT,
      paylink_url TEXT,
      external_transaction_id TEXT,
      includes_annual INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      paid_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      organization_id TEXT REFERENCES organizations(id),
      product_id TEXT NOT NULL REFERENCES products(id),
      order_id TEXT REFERENCES orders(id),
      answers_json TEXT NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'draft',
      completed_at INTEGER,
      renews_at INTEGER,
      reminder_60_sent_at INTEGER,
      reminder_30_sent_at INTEGER,
      reminder_7_sent_at INTEGER,
      docx_key TEXT,
      pdf_key TEXT,
      template_version TEXT NOT NULL DEFAULT 'v1.1',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS crm_notes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      author_id TEXT REFERENCES user(id),
      body TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS crm_tags (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
      tag TEXT NOT NULL
    );
  `);
  try {
    sqlite.exec("ALTER TABLE account ADD COLUMN issuer TEXT");
  } catch {
    // already present
  }
}

function createDb(): Db {
  if (!hasDatabase()) {
    throw new Error("Database is not configured for this environment.");
  }
  return drizzle(openSqlite(), { schema });
}

export function getDb(): Db {
  if (!cached) cached = createDb();
  return cached;
}

export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real as object, prop, receiver);
    if (typeof value === "function") {
      return value.bind(real);
    }
    return value;
  },
});

export { schema };
