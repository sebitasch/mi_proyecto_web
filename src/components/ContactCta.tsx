import { Mail } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <section className="border-t border-border-subtle py-16 sm:py-20">
      <Reveal className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-semibold text-foreground">¿Hablamos?</h2>
        <div className="mt-6">
          <Button href="/contacto">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contacto
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
