<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let header: HTMLHeadElement;
	const dotSize = 15;

	function drawDot(centerX: number, centerY: number, canvasContext: CanvasRenderingContext2D) {
		if (!canvasContext) throw new Error('Could not get canvas context');

		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = '#1d83c4';
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, dotSize, 0, 2 * Math.PI);
		canvasContext.fill();
	}

	onMount(() => {
		resizeCanvas();

		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Could not get canvas context');

		let centerX = canvas.width / 2;
		let centerY = canvas.height / 2;

		drawDot(centerX, centerY, ctx);

		// Add an event listener to re-draw the dot when the viewport is resized
		window.addEventListener('resize', () => {
			resizeCanvas();
			centerX = canvas.width / 2;
			centerY = canvas.height / 2;
			drawDot(centerX, centerY, ctx);
		});

		// Cleanup the event listener when the component is unmounted
		return () => {
			window.removeEventListener('resize', () => {
				resizeCanvas();
				centerX = canvas.width / 2;
				centerY = canvas.height / 2;
				drawDot(centerX, centerY, ctx);
			});
		};
	});

	function resizeCanvas() {
		const headerStyles = header.getBoundingClientRect();
		canvas.width = headerStyles.width * devicePixelRatio;
		canvas.height = headerStyles.height * devicePixelRatio;
		canvas.style.width = `${headerStyles.width}px`;
		canvas.style.height = `${headerStyles.height}px`;
	}
</script>

<header bind:this={header}>
	<!-- Add the 'bind:this' directive to create a reference to the canvas element -->
	<canvas bind:this={canvas} />
	<div class="company-name">
		<h1>btv</h1>
		<h1>dev</h1>
	</div>
</header>

<style>
	/* Style the container to take up the viewport height with a white background */
	header {
		width: 100%;
		height: 70vh;
		position: relative;
	}

	h1 {
		font-family: Courier, Arial, Helvetica, sans-serif;
		font-size: 6em;
		line-height: 1em;
		font-weight: normal;
		margin: 0;
	}

	.company-name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3em;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* Style the canvas to fill the container */
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	/* Media query for mobile-sized screens */
	@media screen and (min-width: 768px) {
		header {
			height: 50vh;
		}
	}
</style>
