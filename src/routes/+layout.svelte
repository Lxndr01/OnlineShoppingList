<script>
	import Card from '$lib/components/Card.svelte';
import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app bg-gray-950">
	<Header />

	<main>
		<slot />
	</main>
	<footer class="text-amber-50">
		<p><strong>Készítette Bogács László, Takács Kevin, és Ragasits Márk</strong></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
