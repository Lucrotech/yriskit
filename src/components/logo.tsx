import { useId } from "react";
import Link from "next/link";

type LogoProps = {
  light?: boolean;
  stacked?: boolean;
  className?: string;
};

/** Original Y Risk It mark: two opposing crescents with diamonds at 3 and 9 o'clock. */
export function Mark({
  light = false,
  className = "h-10 w-10",
}: {
  light?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `yr-mark-${uid}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={gradId} x1="18" y1="16" x2="84" y2="86" gradientUnits="userSpaceOnUse">
          {light ? (
            <>
              <stop offset="0%" stopColor="#E8C96A" />
              <stop offset="55%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#F4EFE4" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#3DBEB3" />
              <stop offset="48%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#0E1B33" />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        d="M27 30.7 A 30 30 0 0 1 73 30.7"
        stroke={`url(#${gradId})`}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M73 69.3 A 30 30 0 0 1 27 69.3"
        stroke={`url(#${gradId})`}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path d="M13 50 L20 43 L27 50 L20 57 Z" fill={`url(#${gradId})`} />
      <path d="M73 50 L80 43 L87 50 L80 57 Z" fill={`url(#${gradId})`} />
    </svg>
  );
}

export function Logo({ light = false, stacked = false, className = "" }: LogoProps) {
  const word = light ? "text-cream" : "text-navy";

  if (stacked) {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-3 ${className}`}>
        <Mark light={light} className="h-28 w-28 md:h-32 md:w-32" />
        <span className={`font-sans text-2xl font-extrabold tracking-[0.32em] ${word}`}>
          Y RISK IT
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <Mark light={light} className="h-11 w-11 shrink-0" />
        <span className={`font-sans text-[15px] font-extrabold tracking-[0.28em] whitespace-nowrap ${word}`}>
        Y RISK IT
      </span>
    </Link>
  );
}

export function LogoMark({
  light = false,
  className = "h-16 w-16",
}: {
  light?: boolean;
  className?: string;
}) {
  return <Mark light={light} className={className} />;
}

export function BrandDiamond({ className = "h-3 w-3 text-gold" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M6 0.8 L11.2 6 L6 11.2 L0.8 6 Z" fill="currentColor" />
    </svg>
  );
}
