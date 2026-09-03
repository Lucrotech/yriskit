"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton({
  className = "text-ink/80 hover:text-navy",
  children = "Sign out",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = "/";
            },
          },
        })
      }
    >
      {children}
    </button>
  );
}
