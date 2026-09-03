import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-sm text-[11px] font-semibold tracking-[0.18em] ${
          light ? "bg-gold text-navy" : "bg-navy text-gold"
        }`}
      >
        YR
      </span>
      <span className="leading-tight">
        <span
          className={`block font-serif text-lg tracking-tight ${light ? "text-cream" : "text-navy"}`}
        >
          Y Risk It
        </span>
        <span
          className={`block text-[10px] uppercase tracking-[0.22em] ${light ? "text-gold" : "text-gold-dark"}`}
        >
          RMCP Compliance
        </span>
      </span>
    </Link>
  );
}
