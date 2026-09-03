"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CrmForm({
  userId,
  status,
  tags,
}: {
  userId: string;
  status: string;
  tags: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function save(formData: FormData) {
    setPending(true);
    await fetch("/api/admin/crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        status: formData.get("status"),
        tags: formData.get("tags"),
        note: formData.get("note"),
      }),
    });
    setPending(false);
    router.refresh();
  }

  return (
    <form action={save} className="mt-6 space-y-3 border border-navy/10 bg-white p-4">
      <label className="block">
        <span className="label">CRM status</span>
        <select name="status" defaultValue={status} className="input">
          {["lead", "paid", "completed", "due_for_renewal"].map((s) => (
            <option key={s} value={s}>
              {s.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="label">Tags (comma separated)</span>
        <input name="tags" defaultValue={tags} className="input" />
      </label>
      <label className="block">
        <span className="label">Add note</span>
        <textarea name="note" className="input min-h-20" />
      </label>
      <button className="btn-primary" disabled={pending}>
        {pending ? "Saving…" : "Save CRM"}
      </button>
    </form>
  );
}
