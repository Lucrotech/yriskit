import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm leading-6 text-cream/70">
            South African specialists in Risk Management and Compliance
            Programmes under the Financial Intelligence Centre Act, 38 of 2001.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Programme</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/industries">Industries</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/legal/disclaimer">FIC disclaimer</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Privacy &amp; POPIA</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms of use</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Y Risk It (Pty) Ltd · Aligned to FIC Act s42 and Guidance Note 7A
      </div>
    </footer>
  );
}
