<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import '../../../app.css';
	import moment from 'moment'
	import Card from '$lib/components/Card.svelte';
	import Flat from '$lib/components/Flat.svelte';
	let listId = '';
	let username = '';

	let name: string;
	let importance: string;
	let content: string[];
	let expiresat: string;

	onMount(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			try {
				const response = await axios.post('http://localhost:5173/api/jwt/verify', {
					withCredentials: true
				});
				if (response.status === 200) {
					console.log(response.data);
					listId = response.data.id;
					username = response.data.user.username;
				} else {
					console.log('Hiba történt!');
				}
			} catch (error) {
				console.log(error);
			}
		} else {
		}
		const response = await axios.post('http://localhost:5173/api/lists/get/' + listId, {
			withCredentials: true
		});
		if (response.status === 200) {
			console.log(response.data.result);
			name = response.data.result.name
			importance = response.data.result.importance
			content = response.data.result.content
			expiresat = response.data.result.expiresat
		} else {
			console.log('Hiba történt!');
		}
	});
</script>

<section>
	<div class="text-2xl text-stone-50">
		<div>{listId}</div>
		<form>
			<input type="text" placeholder={name}/>
			<Flat expiresatFormatted={moment(expiresat).format('YYYY-MM-DD')}/>
		</form>
	</div>
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
