import Image from "next/image";
import { AnimatedLogo } from "../components/complex/AnimatedLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedLogo />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <section id="Our-Approach" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Our Approach
          </h2>
          <p className="mb-4">
            We take a collaborative approach to ensures that our work stays
            aligned with what you want and need. Here's how we do it:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              We start by understanding your goals, organizational personality,
              and preferred style.
            </li>
            <li>
              We brainstorm and sketch ideas on paper to capture the essence of
              your vision.
            </li>
            <li>
              We transform those ideas into a professional wireframe that
              represents the actual look and feel of your website.
            </li>
            <li>
              We bring your website to life by starting the development process
              based on the wireframe.
            </li>
          </ol>
        </section>

        <section id="Work-&-Features" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Work & Features
          </h2>
          <p className="mb-4">
            At btv.dev, we specialize in building websites that are not only
            visually appealing but also packed with features that meet your
            specific needs.
          </p>
          <p className="mb-4">
            In addition to creating static websites, we offer dynamic features
            that include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Easy content updating through a user-friendly editor portal.
            </li>
            <li>
              Seamless integration with databases for storing and retrieving
              information.
            </li>
            <li>Connecting personalized emails to your site's domain.</li>
            <li>Building and managing email subscription lists.</li>
          </ul>
        </section>

        <section id="NonProfits" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Supporting Non-Profits
          </h2>
          <p className="mb-4">
            We are passionate about collaborating with mission-oriented
            organizations and businesses that are driven by a higher purpose. If
            you're working towards making a positive impact in the world, we
            want to be a part of your journey. We understand the unique
            challenges and limited resources that mission-driven organizations
            often face.
          </p>
          <p className="mb-4">
            To support your noble cause, we offer special discounts and
            customized solutions tailored to your specific needs. Let's create
            something remarkable together.{" "}
            <a
              href="#Lets-Talk"
              className="text-btv-blue-500 hover:text-btv-blue-600 underline"
            >
              Let's talk!
            </a>
          </p>
        </section>

        <section id="The-Team" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            The Team
          </h2>
          <p className="mb-4">We're friends, brothers, & developers.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Image
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mx-auto"
                src="/images/james.webp"
                alt="Headshot of James Mitofsky"
              />
              <h3 className="text-xl font-semibold text-center">
                James Mitofsky
              </h3>
              <p>
                James has a keen interest in the impact of design on user
                behavior. When not coding, you'll find him speaking French,
                running through the countryside, or shredding slopes by way of
                snowboard.
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
            <div className="space-y-4">
              <Image
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mx-auto"
                src="/images/kyle.webp"
                alt="Headshot of Kyle Mitofsky"
              />
              <h3 className="text-xl font-semibold text-center">
                Kyle Mitofsky
              </h3>
              <p>
                Kyle has passion for sharing knowledge, seeking creative ways to
                educate and empower others. The proud owner of three black cats,
                a dog, and multiple laptops, Kyle brings a unique blend of
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

        <section id="Lets-Talk" className="my-16">
          <h2 className="text-3xl font-bold text-btv-blue-500 mb-4">
            Let's Talk!
          </h2>
          <p className="mb-4">
            We would love to hear from you! Feel free to reach out to us at{" "}
            <a
              href="mailto:contact@btv.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-btv-blue-500 hover:text-btv-blue-600 underline"
            >
              contact@btv.dev
            </a>
            . We are highly responsive and always excited to discuss new ideas,
            projects, and collaborations.
          </p>
          {/* <Button variant="default" className="mt-4">
            Contact Us
          </Button> */}
        </section>
      </main>
      <footer id="footer" className="bg-gray-100 py-8 text-center">
        {/* Footer content */}
      </footer>
    </div>
  );
}
