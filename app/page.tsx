import fs from "fs";
import path from "path";
import NextImage from "next/image";
import { H2, H3, Paragraph } from "@/components/ui/typography";

import { Logo, LogoCarousel } from "../components/complex/LogoCarousel";
import { WorkAndFeatures } from "../components/sections/WorkAndFeatures";
import OurApproach from "../components/sections/OurApproach";
import { HeroHighlightImplemented } from "../components/complex/HeroHighlight";

export default function Home() {
  // Read client images from the filesystem
  const clientsDir = path.join(process.cwd(), "public", "images", "clients");
  const files = fs.readdirSync(clientsDir);

  // Filter for image files (jpg, png, gif, webp, svg)
  const imageFiles = files.filter((file) =>
    /\.(jpe?g|png|gif|webp|svg)$/i.test(file)
  );

  // Create Logo objects
  const logos: Logo[] = imageFiles.map((file, i) => {
    const src = `/images/clients/${file}`;
    return {
      id: i,
      name: file,
      img: src,
    };
  });
  return (
    <div className="min-h-screen bg-white leading-loose">
      <HeroHighlightImplemented />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* <Paragraph className="text-lg text-center font-medium text-gray-700">
          A web design and development agency crafting digital solutions that
          reflect your values and amplify your mission.
        </Paragraph> */}

        <OurApproach />

        <WorkAndFeatures />

        {/* They Trust Us Section */}
        <section id="They-Trust-Us" className="my-28">
          <H2>They Trust Us</H2>
          <Paragraph className="mb-12 sm:mb-18">
            Our clients span various industries, each trusting us to bring their
            digital visions to life.
          </Paragraph>

          <LogoCarousel logos={logos} columnCount={3} />
        </section>

        {/* Supporting Non-Profits Section */}
        <section id="NonProfits" className="my-28">
          <H2>Supporting Non-Profits</H2>
          <Paragraph>
            We are passionate about empowering mission-driven organizations.
            Your cause deserves a digital presence that reflects its heart and
            impact.
          </Paragraph>
          <Paragraph>
            Understanding the challenges you face, we offer special discounts
            and tailored solutions. Through sketches, mockups, and iterative
            feedback, we ensure the final product meets your unique needs.
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
        </section>

        {/* The Team Section */}
        <section id="The-Team" className="my-28">
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
              <Paragraph className="text-md text-justify">
                With a bachelor's in Computer Science from CESI, a French
                engineering school, James is a design enthusiast with a passion
                for understanding user behavior. When not coding, James is
                running through the countryside, advocating for social issues,
                or carving down Vermont's snowy slopes.
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
              <Paragraph className="text-md text-justify">
                Posessing a master's in Managing Information Science from
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
        </section>

        {/* Let's Talk Section */}
        <section id="Lets-Talk" className="my-28">
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
        </section>
      </main>
      <footer id="footer" className="bg-gray-100 py-8 text-center">
        <Paragraph>
          &copy; 2020 – {new Date().getFullYear()} BTV.dev. All rights reserved.
        </Paragraph>
      </footer>
    </div>
  );
}
