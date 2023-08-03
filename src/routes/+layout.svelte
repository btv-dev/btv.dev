<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>btv.dev</title>

		<link
			href="https://fonts.googleapis.com/css2?family=Modak&display=swap?text=btv.dev"
			rel="stylesheet"
		/>
		<link rel="stylesheet" href="assets/styles.css" />
	</head>
	<body>
		<slot />
	</body>
</html>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		line-height: 2.5em;
		font-size: 1.1em;
		color: rgb(38, 38, 38);
		scroll-behavior: smooth;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
