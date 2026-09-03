import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { organizations, user } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export default async function PeoplePage() {
  const people = db.select().from(user).orderBy(desc(user.createdAt)).all();
  const orgs = db.select().from(organizations).all();
  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">People</h1>
      <div className="mt-6 overflow-x-auto border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Organisation</th>
              <th className="px-3 py-2">CRM</th>
              <th className="px-3 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => {
              const org = orgs.find((o) => o.userId === person.id);
              return (
                <tr key={person.id} className="border-t border-stone-200">
                  <td className="px-3 py-2">
                    <Link className="underline" href={`/admin/people/${person.id}`}>
                      {person.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{person.email}</td>
                  <td className="px-3 py-2">{org?.name || "—"}</td>
                  <td className="px-3 py-2 capitalize">{org?.crmStatus || "lead"}</td>
                  <td className="px-3 py-2">{formatDate(person.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
