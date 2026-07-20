import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline";
type ButtonSize = "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type LinkButtonProps = ButtonOwnProps &
  ComponentProps<typeof Link> & { href: ComponentProps<typeof Link>["href"] };

type NativeButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  solid:
    "bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow-md active:shadow-sm",
  outline:
    "border border-border-subtle text-foreground hover:border-accent hover:bg-accent-soft",
};

/**
 * El tamano vive aparte del base: `cn` concatena sin resolver conflictos de
 * Tailwind, asi que si el base trajera `px-5` y el consumidor pasara `px-6`,
 * el resultado dependeria del orden en la hoja de estilos, no del atributo.
 */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

/**
 * Lista de propiedades explicita y no `transition-all`: hay que animar
 * `transform` y `box-shadow` ademas del color, pero `all` acabaria animando
 * propiedades de layout sin querer.
 *
 * `--dur-2` y no `--dur-1`: a 120ms el gesto no se alcanzaba a percibir y el
 * boton se sentia plano. El levantado al pasar por encima solo existe en
 * punteros finos — en tactil no hay hover, y ahi el hundido hace el trabajo.
 */
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[color,background-color,border-color,transform,box-shadow] duration-[var(--dur-2)] ease-out-soft hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Button({
  variant = "solid",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  if (props.href !== undefined) {
    const { href, ...linkProps } = props as LinkButtonProps;
    return <Link href={href} className={classes} {...linkProps} />;
  }

  const { ...buttonProps } = props as NativeButtonProps;
  return <button className={classes} {...buttonProps} />;
}
