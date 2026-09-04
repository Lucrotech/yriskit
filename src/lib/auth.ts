import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { authBaseUrl, authTrustedOrigins } from "@/lib/auth-config";

const adminEmail = (process.env.ADMIN_EMAIL || "hello@yriskit.co.za").toLowerCase();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-only-change-me-in-production-32ch",
  baseURL: authBaseUrl(),
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (created) => {
          if (created.email.toLowerCase() === adminEmail) {
            db.update(schema.user)
              .set({ role: "admin" })
              .where(eq(schema.user.id, created.id))
              .run();
          }
        },
      },
    },
  },
  plugins: [nextCookies()],
  trustedOrigins: authTrustedOrigins(),
});

export function isAdminEmail(email: string) {
  return email.toLowerCase() === adminEmail;
}
