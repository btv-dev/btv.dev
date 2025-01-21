import NextImage from "next/image";
import { H2, H3, Paragraph } from "@/components/ui/typography";
import { Section } from "@/components/ui/layout";

export function TheTeam() {
  return (
    <Section id="The-Team">
      <H2>The Team</H2>
      <Paragraph className="mb-8">
        We're friends, brothers, & developers.
      </Paragraph>
      <div className="grid md:grid-cols-2 gap-8">
        {/* James */}
        <div className="space-y-4 text-center">
          <NextImage
            width={160}
            height={160}
            className="w-40 h-40 rounded-full mx-auto"
            src="/images/james.webp"
            alt="Headshot of James Mitofsky"
          />
          <H3 className="font-semibold">James Mitofsky</H3>
          <Paragraph className="md:text-md text-justify">
            With a bachelor's in Computer Science from CESI, a French
            engineering school, James is a design enthusiast with a passion
            for understanding user behavior. James enjoys
            learning languages, running through the countryside, and advocating for social issues.
          </Paragraph>
        </div>
        {/* Kyle */}
        <div className="space-y-4 text-center">
          <NextImage
            width={160}
            height={160}
            className="w-40 h-40 rounded-full mx-auto"
            src="/images/kyle.webp"
            alt="Headshot of Kyle Mitofsky"
          />
          <H3 className="font-semibold">Kyle Mitofsky</H3>
          <Paragraph className="md:text-md text-justify">
            Possessing a master's in Managing Information Science from
            Champlain College, Kyle is a knowledge sharer who thrives on
            educating and empowering. Proud owner of three black cats, a
            dog, and multiple laptops, Kyle brings a unique blend of
            expertise and personality.
          </Paragraph>
        </div>
      </div>
    </Section>
  );
}
