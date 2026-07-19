import { experience } from "@/data/experience";
import { Pill } from "@/components/ui/Pill";

const MONTH_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  month: "short",
  year: "numeric",
});

/** Convierte "YYYY-MM" a "mes abreviado + año" (ej. "mar 2024"). */
function formatMonthYear(isoMonth: string): string {
  const [year, month] = isoMonth.split("-").map(Number);
  // Construida en hora local (no UTC) para que el mes no se desplace.
  const date = new Date(year, month - 1, 1);
  return MONTH_FORMATTER.format(date);
}

function formatPeriod(startDate: string, endDate: string | null): string {
  const start = formatMonthYear(startDate);
  const end = endDate === null ? "Actualidad" : formatMonthYear(endDate);
  return `${start} — ${end}`;
}

export function ExperienceTimeline() {
  return (
    <ol className="flex flex-col gap-8">
      {experience.map((entry) => (
        <li key={`${entry.role}-${entry.startDate}`}>
          <h3 className="text-base font-semibold text-foreground">
            {entry.role}
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            {entry.confidential ? "Empresa confidencial" : entry.company}
            {" · "}
            {formatPeriod(entry.startDate, entry.endDate)}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {entry.summary}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {entry.stack.map((tech) => (
              <Pill key={tech} as="li">
                {tech}
              </Pill>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
