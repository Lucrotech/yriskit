import { NextResponse } from "next/server";
import { and, eq, isNull, lte } from "drizzle-orm";
import { db } from "@/db";
import { organizations, submissions, user } from "@/db/schema";
import { renewalHtml, sendEmail } from "@/lib/email";

function daysFromNow(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || "https://yriskit.co.za";
  const windows = [
    { days: 60, field: "reminder60SentAt" as const },
    { days: 30, field: "reminder30SentAt" as const },
    { days: 7, field: "reminder7SentAt" as const },
  ];

  let sent = 0;
  for (const window of windows) {
    const due = daysFromNow(window.days);
    const end = new Date(due);
    end.setDate(end.getDate() + 1);
    const rows = db
      .select()
      .from(submissions)
      .where(
        and(
          eq(submissions.status, "generated"),
          isNull(submissions[window.field]),
          lte(submissions.renewsAt, end),
        ),
      )
      .all()
      .filter((row) => {
        if (!row.renewsAt) return false;
        const t = new Date(row.renewsAt).getTime();
        return t >= due.getTime() && t < end.getTime();
      });

    for (const row of rows) {
      const person = db.select().from(user).where(eq(user.id, row.userId)).get();
      const org = db.select().from(organizations).where(eq(organizations.userId, row.userId)).get();
      if (!person) continue;
      await sendEmail(
        person.email,
        `RMCP review due in ${window.days} days`,
        renewalHtml(
          person.name,
          org?.name || "your organisation",
          new Date(row.renewsAt!).toLocaleDateString("en-ZA"),
          `${origin}/app`,
        ),
      );
      db.update(submissions)
        .set({ [window.field]: new Date() })
        .where(eq(submissions.id, row.id))
        .run();
      db.update(organizations)
        .set({ crmStatus: "due_for_renewal", updatedAt: new Date() })
        .where(eq(organizations.userId, row.userId))
        .run();
      sent += 1;
    }
  }

  return NextResponse.json({ ok: true, sent });
}
