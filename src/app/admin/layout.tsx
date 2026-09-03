import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { requireAdmin } from "@/lib/session";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/people", label: "People" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/submissions", label: "RMCPs" },
  { href: "/admin/renewals", label: "Renewals" },
  { href: "/admin/products", label: "Products" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row">
      <aside className="w-full md:w-48">
        <p className="eyebrow">Administration</p>
        <nav className="mt-4 space-y-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block text-navy hover:underline">
              {link.label}
            </Link>
          ))}
          <SignOutButton className="mt-6 block text-left text-ink/70 hover:text-navy hover:underline" />
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
