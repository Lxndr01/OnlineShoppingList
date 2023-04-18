<script>
	import ListCard from '$lib/components/ListCard.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';

	let authorized = false;
	let lists = [];

	let tags = ['bevasarlolista', 'szuper', 'csodajo'];

	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			try {
				const response = await axios.get('http://localhost:5173/api/lists/list', {
					withCredentials: true
				});
				if (response.status === 200) {
					console.log(response.data.lists);
					authorized = true;
					lists = response.data.lists;
				} else {
					console.log('Hiba történt!');
					authorized = false;
				}
			} catch (error) {
				console.log(error);
			}
		}
	});
</script>

<div class="gridded">
	{#if lists.length > 0}
		{#each lists as listItem}
			<div class="mb-10">
				<ListCard name={listItem.name} content={listItem.content} id={listItem.id} importance={listItem.importance.toLowerCase()}/>
			</div>
		{/each}
	{:else}
		<div>No lists found.</div>
	{/if}
</div>

<style>
	.gridded {
		display: grid;
		grid-template-columns: repeat(
			auto-fit,
			minmax(400px, 1fr)
		); /* Creates a flexible grid with columns that have a minimum width of 300px and a maximum width of 1fr */
		gap: 40px; /* Adds a 20px gap between the cards */
	}
</style>
