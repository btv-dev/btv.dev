import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";

export function SupportingNonProfits() {
  return (
    <Section id="NonProfits" fade="all">
      <H2>Supporting Non-Profits</H2>
      <Paragraph>
        We are passionate about empowering mission-driven organizations.
        Your cause deserves a digital presence that reflects its heart and
        impact.
      </Paragraph>
      <Paragraph>
        Understanding the challenges you face, we offer special discounts
        and tailored solutions.
      </Paragraph>
      <Paragraph>
        Let's create something remarkable together.
        <a
          href="mailto:hey@btv.dev"
          className="ml-2 text-btv-blue-500 hover:text-btv-blue-600 underline"
        >
          Let's talk!
        </a>
      </Paragraph>
    </Section>
  );
}
