import { Suspense } from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Create your workspace</h1>
      <p className="mt-3 text-ink/70">
        You will choose a product and pay before the RMCP wizard unlocks. By
        creating an account you accept the{" "}
        <Link href="/legal/privacy" className="text-navy underline">
          privacy statement
        </Link>{" "}
        and{" "}
        <Link href="/legal/terms" className="text-navy underline">
          terms of use
        </Link>
        .
      </p>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
