import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline";

interface ButtonOwnProps {
  variant?: ButtonVariant;
}

type LinkButtonProps = ButtonOwnProps &
  ComponentProps<typeof Link> & { href: ComponentProps<typeof Link>["href"] };

type NativeButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid: "bg-accent text-white hover:bg-accent-hover",
  outline: "border border-border-subtle text-foreground hover:bg-accent-soft",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Button({ variant = "solid", className, ...props }: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (props.href !== undefined) {
    const { href, ...linkProps } = props as LinkButtonProps;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  const { ...buttonProps } = props as NativeButtonProps;
  return <button className={classes} {...buttonProps} />;
}
