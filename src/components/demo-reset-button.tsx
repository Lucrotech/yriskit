"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DemoResetButton({
  className = "btn-secondary",
  label = "Re-run demo",
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function reset() {
    setPending(true);
    setError("");
    const res = await fetch("/api/demo/reset", { method: "POST" });
    const body = (await res.json()) as { error?: string; submissionId?: string };
    setPending(false);
    if (!res.ok) {
      setError(body.error || "Could not reset demo.");
      return;
    }
    router.push(body.submissionId ? `/app/rmcp/${body.submissionId}/wizard` : "/app");
    router.refresh();
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button type="button" className={className} disabled={pending} onClick={reset}>
        {pending ? "Resetting…" : label}
      </button>
      {error ? <span className="text-sm text-red-700">{error}</span> : null}
    </div>
  );
}
