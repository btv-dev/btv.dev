import fs from "fs";
import path from "path";
import NextImage from "next/image";
import { AnimatedLogo } from "../components/complex/AnimatedLogo";
import { H2, H3, Paragraph, UL, OL, LI } from "@/components/ui/typography";

import { Logo, LogoCarousel } from "../components/complex/LogoCarousel";

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
      <AnimatedLogo />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Our Approach Section */}
        <section id="Our-Approach" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">Our Approach</H2>
          <Paragraph>
            At BTV.dev, our collaborative process ensures your vision comes to
            life—beautifully and seamlessly.
          </Paragraph>
          <OL className="space-y-2 text-md">
            <LI>
              <strong>Discover:</strong> We start by diving deep into your
              goals, brand personality, and design preferences.
            </LI>
            <LI>
              <strong>Sketch & Brainstorm:</strong> We sketch ideas on paper and
              create mockups, visualizing potential directions and refining
              concepts before moving forward.
            </LI>
            <LI>
              <strong>Build:</strong> Bringing designs to life, we begin
              development to craft a site that exceeds expectations.
            </LI>
          </OL>
          <Paragraph className="mt-4 text-md">
            Through sketches and mockups, we explore various possibilities and
            steer the project in the right direction before committing to the
            final design, ensuring our work aligns perfectly with your vision.
          </Paragraph>
        </section>

        {/* Work & Features Section */}
        <section id="Work-&-Features" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">Work & Features</H2>
          <Paragraph>
            We don't just build websites; we create digital experiences that
            captivate and convert.
          </Paragraph>
          <Paragraph className="mb-4 text-md">
            We deliver according to your needs, but some of the features we find
            reliably helpful include:
          </Paragraph>
          <UL className="space-y-2 text-md">
            <LI>
              <strong>Responsive Design & Animations:</strong> Engaging,
              mobile-friendly layouts with subtle animations to enhance user
              experience.
            </LI>
            <LI>
              <strong>SEO Tools:</strong> Out-of-the-box SEO-friendly markup,
              meta tag management, and structured data to boost visibility.
            </LI>
            <LI>
              <strong>Contact Forms & Social Sharing:</strong> Easy-to-use
              contact forms and social media integration to engage visitors and
              streamline communication.
            </LI>
            <LI>
              <strong>Image Optimization & Lazy Loading:</strong> Automated
              image compression and lazy loading for faster page loads and
              improved performance.
            </LI>
            <LI>
              <strong>Analytics Integration:</strong> Setup for tracking user
              interactions, helping you make data-driven decisions.
            </LI>
            <LI>
              <strong>Integrated Blog & CMS:</strong> A simple, built-in content
              management system allowing effortless content updates and blog
              posts.
            </LI>
          </UL>
        </section>

        {/* They Trust Us Section */}
        <section id="They-Trust-Us" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">They Trust Us</H2>
          <Paragraph className="mb-12 sm:mb-0">
            Our clients span various industries, each trusting us to bring their
            digital visions to life.
          </Paragraph>

          <LogoCarousel logos={logos} columnCount={2} />
        </section>

        {/* Supporting Non-Profits Section */}
        <section id="NonProfits" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">Supporting Non-Profits</H2>
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
        <section id="The-Team" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">The Team</H2>
          <Paragraph>We're friends, brothers, & developers.</Paragraph>
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
                A design enthusiast with a passion for how aesthetics influence
                user behavior. When he's not coding, James is speaking French,
                running through the countryside, or carving down snowy slopes on
                his snowboard.
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
                A knowledge sharer with a creative spirit, Kyle thrives on
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
        <section id="Lets-Talk" className="my-16">
          <H2 className="text-btv-blue-500 mb-4">Let's Talk!</H2>
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
