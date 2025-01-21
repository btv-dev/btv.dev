import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";
import { Logo, LogoCarousel } from "@/components/complex/LogoCarousel";

interface TheyTrustUsProps {
  logos: Logo[];
}

export function TheyTrustUs({ logos }: TheyTrustUsProps) {
  return (
    <Section id="They-Trust-Us" className="mb-0">
      <H2>They Trust Us</H2>
      <Paragraph className="mb-12 sm:mb-18">
        Our clients span various industries, each trusting us to bring their
        digital visions to life.
      </Paragraph>
      <LogoCarousel logos={logos} />
    </Section>
  );
}
