<script>
	import { goto } from '$app/navigation';
	import '../../app.css';
	import axios from 'axios';
	import routerNavigate from 'svelte-spa-router';

	let username = '';
	let email = '';
	let password = '';
	let passwordConfirmation = '';
	let errorMessage = '';

	const dataChecking = async () => {
		if (!username || !email || !password || !passwordConfirmation) {
			errorMessage = 'Kérem töltse ki az összes mezőt!';
		} else {
			if (password != passwordConfirmation) {
				errorMessage = 'A két jelszó nem egyezik!';
			} else {
				if (password.length < 8) {
					errorMessage = 'A jelszónak minimum 8 karakter hosszúnak kell lennie!';
				} else {
					if (!email.includes('@') && !email.includes('.')) {
						errorMessage = 'Nem valós email cím!';
					} else {
						errorMessage = '';
						register();
					}
				}
			}
		}
	};

	const register = async () => {
		const data = {
			username: username,
			email: email,
			password: password
		};
		const response = await axios.post('http://localhost:5173/api/register', data, {
			withCredentials: true
		});
		if (response.status === 201) {
			console.log('Siker!');
			console.log(response.data.token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            window.localStorage.setItem('token', response.data.token);
			goto('/')
		} else if (response.status === 200) {
			errorMessage = 'Létezik ez a felhasználónév/email!';
		} else {
			errorMessage = 'Hiba történt!';
		}
	};
</script>

<div class="bg-grey-lighter min-h-screen flex flex-col">
	<div
		class="container max-w-lg max-h-lg mx-auto flex-1 flex flex-col items-center justify-center px-2"
	>
		<form class="bg-white px-6 py-10 rounded shadow-lg text-black w-full rounded-xl">
			<h1 class="mb-8 text-3xl text-center">Regisztráció</h1>
			<p class="text-xl text-red-500 text-center">{errorMessage}</p>
			<input
				bind:value={username}
				type="text"
				class="block border border-grey-light w-full p-3 rounded mb-4"
				placeholder="Felhasználónév"
			/>
			<input
				bind:value={email}
				type="text"
				class="block border border-grey-light w-full p-3 rounded mb-4"
				placeholder="Email cím"
			/>
			<input
				bind:value={password}
				type="password"
				class="block border border-grey-light w-full p-3 rounded mb-4"
				placeholder="Jelszó"
			/>
			<input
				bind:value={passwordConfirmation}
				type="password"
				class="block border border-grey-light w-full p-3 rounded mb-4"
				placeholder="Jelszó"
			/>

			<button
				type="submit"
				class="w-full text-center py-3 rounded bg-green text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1"
				on:click={dataChecking}>Regisztráció</button
			>
		</form>

		<div class="text-grey-dark mt-6">
			Van már fiókod?
			<a class="no-underline border-b border-blue text-blue" href="/login"> Jelentkezz be!</a>
		</div>
	</div>
</div>
