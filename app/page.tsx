import fs from "fs";
import path from "path";
import sharp from 'sharp';
import NextImage from "next/image";
import { H2, H3, Paragraph } from "@/components/ui/typography";

import { Logo, LogoCarousel } from "../components/complex/LogoCarousel";
import { WorkAndFeatures } from "../components/sections/WorkAndFeatures";
import OurApproach from "../components/sections/OurApproach";
import { HeroHighlightImplemented } from "../components/complex/HeroHighlight";
import { Section } from "../components/ui/layout";
import { ParallaxImplemented } from "@/components/complex/ParallaxImplemented";

export default async function Home() {
  // Read client images from the filesystem
  const clientsDir = path.join(process.cwd(), "public", "images", "clients");
  const files = fs.readdirSync(clientsDir);

  // Filter for image files (jpg, png, gif, webp, svg)
  const imageFiles = files.filter((file) =>
    /\.(jpe?g|png|gif|webp|svg)$/i.test(file)
  );

  // Create Logo objects
  const logos: Logo[] = await Promise.all(imageFiles.map(async (file, i) => {
    const src = `/images/clients/${file}`;
    const imagePath = path.join(clientsDir, file);
    
    // Get actual image dimensions using sharp
    const metadata = await sharp(imagePath).metadata();
    
    return {
      id: i,
      name: file,
      img: src,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }));
  return (
    <div className="min-h-screen bg-white leading-loose">
      <HeroHighlightImplemented />

      <main>

        <OurApproach />

        <ParallaxImplemented />

        <WorkAndFeatures />

        {/* They Trust Us Section */}
        <Section id="They-Trust-Us" className="mb-0">
          <H2>They Trust Us</H2>
          <Paragraph className="mb-12 sm:mb-18">
            Our clients span various industries, each trusting us to bring their
            digital visions to life.
          </Paragraph>
          <LogoCarousel logos={logos} />


        </Section>

        {/* Supporting Non-Profits Section */}
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
            Let's create something remarkable together.{" "}
            <a
              href="mailto:hey@btv.dev"
              className="ml-2 text-btv-blue-500 hover:text-btv-blue-600 underline"
            >
              Let's talk!
            </a>
          </Paragraph>
        </Section>

        {/* The Team Section */}
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
              {/* <div className="space-y-2">
                <a
                  href="https://jamesmit.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  jamesmit.dev
                </a>
              </div> */}
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
              {/* <div className="space-y-2">
                <a
                  href="https://kylemit.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  kylemit.dev
                </a>
              </div> */}
            </div>
          </div>
        </Section>

        {/* Let's Talk Section */}
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
          {/* <Button variant="default" className="mt-4">
            Contact Us
          </Button> */}
          <footer id="footer" className="text-center mt-7 mb-4 md:mt-16 md:mb-7 text-sm text-gray-500">
            &copy; 2020 – {new Date().getFullYear()} BTV.dev. All rights reserved.
          </footer>
        </Section>
      </main>
    </div>
  );
}
