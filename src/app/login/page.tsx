import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your Y Risk It workspace to continue your RMCP questionnaire or download documents.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Sign in</h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
