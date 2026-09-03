import { NextResponse } from "next/server";
import { isDemoClientEmail, seedDemoPurchase } from "@/lib/demo-client";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!isDemoClientEmail(session.user.email)) {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  try {
    const submissionId = seedDemoPurchase(session.user.id);
    return NextResponse.json({ ok: true, submissionId });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reset failed" },
      { status: 500 },
    );
  }
}
