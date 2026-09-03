import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth, isAdminEmail } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  const rows = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);
  const role = rows[0]?.role;
  const admin = role === "admin" || isAdminEmail(session.user.email);
  if (!admin) redirect("/app");
  return { ...session, role: "admin" as const };
}
