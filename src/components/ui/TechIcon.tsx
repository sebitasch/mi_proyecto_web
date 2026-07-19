interface TechIconProps {
  path: string;
  className?: string;
}

export function TechIcon({ path, className }: TechIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className ?? "h-6 w-6"}
    >
      <path d={path} />
    </svg>
  );
}
