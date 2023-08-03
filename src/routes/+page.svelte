<script>
	import LandingPageHero from '../components/LandingPageHero.svelte';
</script>

<LandingPageHero />

<main>
	<section id="Our-Approach">
		<h2>Our Approach</h2>
		<p>
			We take a collaborative approach to ensures that our work stays aligned with what you want and
			need. Here's how we do it:
		</p>
		<ol>
			<li>
				We start by understanding your goals, organizational personality, and preferred style.
			</li>
			<li>We brainstorm and sketch ideas on paper to capture the essence of your vision.</li>
			<li>
				We transform those ideas into a professional wireframe that represents the actual look and
				feel of your website.
			</li>
			<li>
				We bring your website to life by starting the development process based on the wireframe.
			</li>
		</ol>
	</section>

	<section id="Work-&-Features">
		<h2>Work & Features</h2>
		<p>
			At btv.dev, we specialize in building websites that are not only visually appealing but also
			packed with features that meet your specific needs.
		</p>
		<p>In addition to creating static websites, we offer dynamic features that include:</p>
		<ul>
			<li>Easy content updating through a user-friendly editor portal.</li>
			<li>Seamless integration with databases for storing and retrieving information.</li>
			<li>Connecting personalized emails to your site's domain.</li>
			<li>Building and managing email subscription lists.</li>
		</ul>
	</section>

	<section id="NonProfits">
		<h2>Supporting Non-Profits</h2>
		<p>
			We are passionate about collaborating with mission-oriented organizations and businesses that
			are driven by a higher purpose. If you're working towards making a positive impact in the
			world, we want to be a part of your journey. We understand the unique challenges and limited
			resources that mission-driven organizations often face.
		</p>
		<p>
			To support your noble cause, we offer special discounts and customized solutions tailored to
			your specific needs. Let's create something remarkable together. <a href="#Lets-Talk"
				>Let's talk!</a
			>
		</p>
	</section>

	<section id="The-Team">
		<h2>The Team</h2>
		<p>We're friends, brothers, & developers.</p>
		<div class="bros">
			<div class="bro">
				<img class="profile-pic" src="/images/james.jpg" alt="Headshot of James Mitofsky" />
				<h3>James Mitofsky</h3>
				<p>
					James has a keen interest in the impact of design on user behavior. When not coding,
					you'll find him speaking French, running through the countryside, or shredding slopes on
					his snowboard.
				</p>
				<a href="email:james@btv.dev" target="_blank">james@btv.dev</a>
				<a href="https://jamesmit.dev" target="_blank">jamesmit.dev</a>
			</div>
			<div class="bro">
				<img class="profile-pic" src="/images/kyle.jpg" alt="Headshot of Kyle Mitofsky" />
				<h3>Kyle Mitofsky</h3>
				<p>
					Kyle has passion for sharing knowledge, seeking creative ways to educate and empower
					others. The proud owner of three black cats, a dog, and multiple laptops, Kyle brings a
					unique blend of expertise and personality.
				</p>
				<a href="email:kyle@btv.dev" target="_blank">kyle@btv.dev</a>
				<a href="https://kylemit.dev" target="_blank">kylemit.dev</a>
			</div>
		</div>
	</section>

	<section id="Lets-Talk">
		<h2>Let's Talk!</h2>
		<p>
			We would love to hear from you! Feel free to reach out to us at <a
				href="email:contact@btv.dev"
				target="_blank">contact@btv.dev</a
			>. We are highly responsive and always excited to discuss new ideas, projects, and
			collaborations.
		</p>
	</section>
</main>
<footer id="footer" />

<style>
	/* Utilities */

	main {
		margin: 0 5%;
	}

	section {
		margin: 1em 0 4em 0;
	}

	h2 {
		color: #1d83c4;
		margin: 0;
		font-size: 2em;
		line-height: 1em;
	}

	a {
		width: fit-content;
		text-decoration: none;
		color: inherit;
		border-bottom: 2px solid #cef1f6;
		box-shadow: 0px -10px 0px #cef1f6 inset;
	}

	a:hover {
		border-bottom-color: #e4e4e4;
		box-shadow: 0px -10px 0px #e4e4e4 inset;
	}

	/* a.button {
		background: #1d83c4;
		font-size: 1em;
		padding: 0.5em 1em;
		border: none;
		color: white;
		border-radius: 5px;
		box-shadow: #033598 4px 4px 6px;
	} */

	/* Bio Styles */
	.bro {
		margin: 2em 0;
	}

	.profile-pic {
		height: 10em;
		border-radius: 50%;
	}

	/* Media queries */
	@media only screen and (min-width: 700px) {
		main {
			margin: 0 15%;
		}

		.bros {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 3em;
		}
	}
</style>
