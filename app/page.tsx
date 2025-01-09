import Image from "next/image";
import { AnimatedLogo } from "../components/complex/AnimatedLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedLogo />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Our Approach Section */}
        <section id="Our-Approach" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Our Approach
          </h2>
          <p className="mb-4 text-lg">
            At btv.dev, our collaborative process ensures your vision comes to
            life—beautifully and seamlessly.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md">
            <li>
              <strong>Discover:</strong> We start by diving deep into your
              goals, brand personality, and design preferences.
            </li>
            <li>
              <strong>Sketch & Brainstorm:</strong> We sketch ideas on paper and
              create mockups, visualizing potential directions and refining
              concepts before moving forward.
            </li>
            <li>
              <strong>Build:</strong> Bringing designs to life, we begin
              development to craft a site that exceeds expectations.
            </li>
          </ol>
          <p className="mt-4 text-md">
            Through sketches and mockups, we explore various possibilities and
            steer the project in the right direction before committing to the
            final design, ensuring our work aligns perfectly with your vision.
          </p>
        </section>

        {/* Work & Features Section */}
        <section id="Work-&-Features" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Work & Features
          </h2>
          <p className="mb-4 text-lg">
            We don't just build websites; we create digital experiences that
            captivate and convert.
          </p>
          <p className="mb-4 text-md">
            Beyond stunning static sites, our dynamic features include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-md">
            <li>User-friendly content editor for effortless updates</li>
            <li>Seamless database integration for reliable data management</li>
            <li>Professional email integration tied to your domain</li>
            <li>Robust tools for building and managing subscription lists</li>
          </ul>
        </section>

        {/* They Trust Us Section */}
        <section id="They-Trust-Us" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            They Trust Us
          </h2>
          <p className="mb-4 text-md">
            Our clients span various industries, each trusting us to bring their
            digital visions to life.
          </p>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              Placeholder for carousel of client logos
            </p>
          </div>
        </section>

        {/* Supporting Non-Profits Section */}
        <section id="NonProfits" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Supporting Non-Profits
          </h2>
          <p className="mb-4 text-lg">
            We are passionate about empowering mission-driven organizations.
            Your cause deserves a digital presence that reflects its heart and
            impact.
          </p>
          <p className="mb-4 text-md">
            Understanding the challenges you face, we offer special discounts
            and tailored solutions. Through sketches, mockups, and iterative
            feedback, we ensure the final product meets your unique needs.
          </p>
          <p className="mb-4 text-md">
            Let's create something remarkable together.
            <a
              href="#Lets-Talk"
              className="ml-2 text-btv-blue-500 hover:text-btv-blue-600 underline"
            >
              Let's talk!
            </a>
          </p>
        </section>

        {/* The Team Section */}
        <section id="The-Team" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            The Team
          </h2>
          <p className="mb-4 text-lg">We're friends, brothers, & developers.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* James */}
            <div className="space-y-4 text-center">
              <Image
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mx-auto"
                src="/images/james.webp"
                alt="Headshot of James Mitofsky"
              />
              <h3 className="text-xl font-semibold">James Mitofsky</h3>
              <p className="text-md">
                A design enthusiast with a passion for how aesthetics influence
                user behavior. When he's not coding, James is speaking French,
                running through the countryside, or carving down snowy slopes on
                his snowboard.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:james@btv.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  james@btv.dev
                </a>
                <a
                  href="https://jamesmit.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  jamesmit.dev
                </a>
              </div>
            </div>
            {/* Kyle */}
            <div className="space-y-4 text-center">
              <Image
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mx-auto"
                src="/images/kyle.webp"
                alt="Headshot of Kyle Mitofsky"
              />
              <h3 className="text-xl font-semibold">Kyle Mitofsky</h3>
              <p className="text-md">
                A knowledge sharer with a creative spirit, Kyle thrives on
                educating and empowering. Proud owner of three black cats, a
                dog, and multiple laptops, Kyle brings a unique blend of
                expertise and personality.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:kyle@btv.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  kyle@btv.dev
                </a>
                <a
                  href="https://kylemit.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-btv-blue-500 hover:text-btv-blue-600"
                >
                  kylemit.dev
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Talk Section */}
        <section id="Lets-Talk" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Let's Talk!
          </h2>
          <p className="mb-4 text-lg">
            Ready to transform your vision into reality? We're here to listen,
            collaborate, and innovate.
          </p>
          <p className="text-md">
            Reach out at{" "}
            <a
              href="mailto:contact@btv.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-btv-blue-500 hover:text-btv-blue-600 underline"
            >
              contact@btv.dev
            </a>
            . We're responsive, enthusiastic, and eager to discuss new ideas,
            projects, and collaborations.
          </p>
        </section>
      </main>
      <footer id="footer" className="bg-gray-100 py-8 text-center">
        {/* Footer content can go here */}
      </footer>
    </div>
  );
}
