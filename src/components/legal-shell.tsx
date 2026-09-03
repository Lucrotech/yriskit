import type { ReactNode } from "react";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="prose-legal mx-auto max-w-3xl px-6 py-16 leading-7 text-ink/75">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">{title}</h1>
      <div className="mt-8 space-y-4">{children}</div>
    </main>
  );
}

export function PdfLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p>
      <a href={href} className="font-semibold text-navy underline">
        {children}
      </a>
    </p>
  );
}
