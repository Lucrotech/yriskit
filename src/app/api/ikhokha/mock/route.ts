import { NextRequest, NextResponse } from "next/server";
import { fulfillOrder } from "@/lib/fulfill";

export async function GET(request: NextRequest) {
  const tx = request.nextUrl.searchParams.get("tx");
  if (!tx) return NextResponse.redirect(new URL("/app", request.url));
  const result = fulfillOrder(tx);
  const dest = result?.submissionId
    ? `/app/rmcp/${result.submissionId}/wizard`
    : "/app";
  return NextResponse.redirect(new URL(dest, request.url));
}
