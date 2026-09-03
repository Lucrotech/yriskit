import { eq } from "drizzle-orm";
import { db } from "@/db";
import { organizations, user } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const session = await requireUser();
  const me = db.select().from(user).where(eq(user.id, session.user.id)).get();
  const org = db
    .select()
    .from(organizations)
    .where(eq(organizations.userId, session.user.id))
    .get();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <p className="eyebrow">Account</p>
      <h1 className="mt-2 font-serif text-4xl text-navy">Profile</h1>
      <ProfileForm
        name={me?.name || ""}
        email={me?.email || ""}
        phone={me?.phone || ""}
        company={org?.name || ""}
      />
    </main>
  );
}
