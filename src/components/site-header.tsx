import Link from "next/link";
import { Logo } from "./logo";
import { SignOutButton } from "./sign-out-button";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({
  signedIn,
  admin,
}: {
  signedIn?: boolean;
  admin?: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-ink/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {signedIn ? (
            <>
              {admin ? (
                <Link href="/admin" className="hidden text-ink/70 hover:text-navy sm:inline">
                  Admin
                </Link>
              ) : null}
              <Link href="/app" className="btn-secondary !py-2 !px-4">
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-ink/80 hover:text-navy">
                Sign in
              </Link>
              <Link href="/register" className="btn-primary !py-2 !px-4">
                Get your RMCP
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
