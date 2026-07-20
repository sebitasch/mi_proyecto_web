"use client";

import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";

import type { AppPathname } from "@/types";

interface MobileNavItem {
  href: AppPathname;
  label: string;
}

interface MobileNavProps {
  /** Ya traducidos por SiteHeader: este componente no traduce. */
  items: readonly MobileNavItem[];
  primaryLabel: string;
  openLabel: string;
  closeLabel: string;
}

export function MobileNav({
  items,
  primaryLabel,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar con Escape: sin esto el menú solo se cierra tocando el botón,
  // que queda tapado por el panel abierto.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label={isOpen ? closeLabel : openLabel}
        className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors duration-[var(--dur-1)] ease-out-soft hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:hidden"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-16 border-b border-border-subtle bg-background sm:hidden"
        >
          <nav aria-label={primaryLabel}>
            <ul className="flex flex-col px-6 py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-sm text-muted transition-colors duration-[var(--dur-1)] ease-out-soft hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      )}
    </>
  );
}
