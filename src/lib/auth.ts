import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import * as schema from "@/db/schema";

const adminEmail = (process.env.ADMIN_EMAIL || "hello@yriskit.co.za").toLowerCase();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "dev-only-change-me-in-production-32ch",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "http://localhost:3000",
  ],
});

export function isAdminEmail(email: string) {
  return email.toLowerCase() === adminEmail;
}
