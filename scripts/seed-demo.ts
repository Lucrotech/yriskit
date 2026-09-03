import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { user } from "../src/db/schema";
import { ensureSeed } from "../src/db/seed";
import {
  DEMO_CLIENT_EMAIL,
  DEMO_CLIENT_NAME,
  seedDemoPurchase,
} from "../src/lib/demo-client";

const origin =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

async function ensureDemoUser() {
  const existing = db.select().from(user).where(eq(user.email, DEMO_CLIENT_EMAIL)).get();
  if (existing) return existing;

  const password = process.env.DEMO_CLIENT_PASSWORD;
  if (!password) {
    throw new Error(
      "Set DEMO_CLIENT_PASSWORD in .env.local, then run npm run seed:demo again.",
    );
  }

  const res = await fetch(`${origin}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
    },
    body: JSON.stringify({
      email: DEMO_CLIENT_EMAIL,
      password,
      name: DEMO_CLIENT_NAME,
    }),
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Could not create demo client (${res.status}): ${body.slice(0, 300)}`);
  }

  const created = db.select().from(user).where(eq(user.email, DEMO_CLIENT_EMAIL)).get();
  if (!created) {
    throw new Error("Demo client was signed up but is not in the database.");
  }
  return created;
}

async function main() {
  await ensureSeed();
  const person = await ensureDemoUser();
  const submissionId = seedDemoPurchase(person.id);
  console.log("Demo client ready:", DEMO_CLIENT_EMAIL);
  console.log("Paid RMCP submission:", submissionId);
  console.log("Sign in at", `${origin}/login`, "then continue the wizard from /app");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
