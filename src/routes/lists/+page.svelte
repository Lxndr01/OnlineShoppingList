<script>
	import axios from "axios";
	import { onMount } from "svelte";
    
    let authorized = false;
    let lists = [];

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
                    lists = response.data.lists
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
{#if lists.length > 0}
  {#each lists as listItem}
    <div>{listItem.id}</div>
  {/each}
{:else}
  <div>No lists found.</div>
{/if}