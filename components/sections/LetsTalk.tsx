import { H2, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";

export function LetsTalk() {
  return (
    <Section id="Lets-Talk" fade="top" innerClassname="pb-0">
      <H2>Let's Talk!</H2>
      <Paragraph>
        Ready to transform your vision into reality? We're here to listen,
        collaborate, and innovate.
      </Paragraph>
      <Paragraph>
        Reach out at{" "}
        <a
          href="mailto:hey@btv.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-btv-blue-500 hover:text-btv-blue-600 underline"
        >
          hey@btv.dev
        </a>
        . We're eager to discuss how we can help you improve your presence
        on the web.
      </Paragraph>
      <footer id="footer" className="text-center mt-7 mb-4 md:mt-16 md:mb-7 text-sm text-gray-500">
        &copy; 2020 – {new Date().getFullYear()} BTV.dev. All rights reserved.
      </footer>
    </Section>
  );
}
