<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';
	import axios from 'axios';

	let authorized = false;
	let unauthorized = true;

	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			try {
				const response = await axios.post('http://localhost:5173/api/jwt/verify', {
					withCredentials: true
				});
				if (response.status === 200) {
					console.log('Siker!');
					authorized = true;
					unauthorized = false;
				} else {
					console.log('Hiba történt!');
					authorized = false;
					unauthorized = true;
				}
			} catch (error) {
				console.log(error);
			}
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if authorized}
		<h1>
			<span class="welcome User">
				<picture>
					<source srcset={welcome} type="image/webp" />
					<img src={welcome_fallback} alt="Welcome" />
				</picture>
			</span>

			to your new<br />SvelteKit app User
		</h1>

		<h2>
			try editing <strong>src/routes/+page.svelte</strong>
		</h2>

		<Counter />
	{:else}
		<h1>
			<span class="welcome">
				<picture>
					<source srcset={welcome} type="image/webp" />
					<img src={welcome_fallback} alt="Welcome" />
				</picture>
			</span>

			to your new<br />SvelteKit app
		</h1>

		<h2>
			try editing <strong>src/routes/+page.svelte</strong>
		</h2>

		<Counter />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
