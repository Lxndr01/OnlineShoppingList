<script>
	import '../../app.css';

	let usernameOrEmail = '';
	let password = '';
	let errorMessage = '';

	const dataChecking = () => {
	}
</script>

<div class="bg-grey-lighter min-h-screen flex flex-col">
	<div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
		<div class="bg-stone-50 px-6 py-10 rounded shadow-lg h-80 text-black w-full rounded-xl">
			<h1 class="mb-8 text-3xl text-center">Bejelentkezés</h1>
			<p class="text-xl text-red-500 text-center">{errorMessage}</p>
			<input
				bind:value={usernameOrEmail}
				type="text"
				class="block border border-grey-light w-full p-3 rounded mb-4 font-bold text-gray-950"
				placeholder="Felhasználónév vagy Email"
			/>
			<input
				bind:value={password}
				type="password"
				class="block border border-grey-light w-full p-3 rounded mb-4 font-bold text-gray-950"
				placeholder="Jelszó"
			/>
			<button
				type="submit"
				class="w-full text-center py-3 rounded bg-green text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1"
				on:click={dataChecking}
				>Bejelentkezés</button
			>
		</div>

		<div class="text-stone-50 mt-6">
			Nincs még fiókod?
			<a class="no-underline border-b border-blue text-orange-500" href="/register"> Regisztrálj!</a>
		</div>
	</div>
</div>
