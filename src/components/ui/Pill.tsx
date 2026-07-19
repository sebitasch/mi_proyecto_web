import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillElement = "li" | "span";

type PillProps<T extends PillElement> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const BASE_CLASSES =
  "rounded-lg bg-accent-soft px-3 py-1 text-sm font-medium text-accent";

export function Pill<T extends PillElement = "span">({
  as,
  children,
  className,
  ...props
}: PillProps<T>) {
  const Component = (as ?? "span") as ElementType;

  return (
    <Component className={cn(BASE_CLASSES, className)} {...props}>
      {children}
    </Component>
  );
}
