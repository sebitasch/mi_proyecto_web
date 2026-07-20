import { Mail } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";

export async function ContactCta() {
  const t = await getTranslations("home");
  return (
    <section className="border-t border-border-subtle py-16 sm:py-20">
      <Reveal className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-semibold font-display text-foreground">{t("contactHeading")}</h2>
        <div className="mt-6">
          <Button href="/contacto">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t("contactCta")}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
