"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const product = params.get("product") || "";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    });
    setPending(false);
    if (result.error) {
      setError(result.error.message || "Could not sign in.");
      return;
    }
    router.push(product ? `/app/checkout?product=${product}` : "/app");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="label">Email</span>
        <input name="email" type="email" required className="input" />
      </label>
      <label className="block">
        <span className="label">Password</span>
        <input name="password" type="password" required className="input" />
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button className="btn-primary w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm text-ink/60">
        New here?{" "}
        <Link href={`/register${product ? `?product=${product}` : ""}`} className="text-navy underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
