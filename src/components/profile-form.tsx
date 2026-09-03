"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/sign-out-button";

export function ProfileForm({
  name,
  email,
  phone,
  company,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
}) {
  const [message, setMessage] = useState("");

  async function save(formData: FormData) {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        phone: formData.get("phone"),
        company: formData.get("company"),
      }),
    });
    setMessage(res.ok ? "Saved." : "Could not save.");
  }

  return (
    <form action={save} className="mt-8 space-y-4">
      <label className="block">
        <span className="label">Name</span>
        <input name="name" defaultValue={name} className="input" />
      </label>
      <label className="block">
        <span className="label">Email</span>
        <input defaultValue={email} disabled className="input bg-stone-50" />
      </label>
      <label className="block">
        <span className="label">Phone</span>
        <input name="phone" defaultValue={phone} className="input" />
      </label>
      <label className="block">
        <span className="label">Organisation</span>
        <input name="company" defaultValue={company} className="input" />
      </label>
      {message ? <p className="text-sm text-navy">{message}</p> : null}
      <div className="flex gap-3">
        <button className="btn-primary">Save</button>
        <SignOutButton className="btn-secondary">Sign out</SignOutButton>
      </div>
    </form>
  );
}
