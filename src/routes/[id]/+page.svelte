<script>
	import { goto } from '$app/navigation';

	import axios from 'axios';
	import { onMount } from 'svelte';
    let userId = '';

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
					userId = response.data.id
				} else {
					console.log('Hiba történt!');
                   await goto('/')
				}
			} catch (error) {
				console.log(error);
                await goto('/')
			}
		}else{
                await goto('/')
        }
	});
</script>

<h1>Page</h1>
<h3>{userId}</h3>


  
