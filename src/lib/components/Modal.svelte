<script>
	export let showModal = false;
	export let modalTitle = '';
	export let modalContent = '';
</script>

<div
	class="fixed z-10 inset-0 overflow-y-auto px-16"
	style="display: {showModal ? 'block' : 'none'};"
>
	<div class="flex items-center justify-center min-h-screen">
		<div class="fixed inset-0 bg-gray-700 opacity-75 text-stone-50" />

		<div class="bg-gray-950 rounded-lg z-20 px-48 py-32 text-justify">
			<h3 class="text-4xl top-0 text-stone-50 font-bold mb-4">{modalTitle}</h3>
			<div class="text-stone-50 mb-4 text-center">
				<ul>
					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="lists">Lista hozzáadása</a>
                    </div>
					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="">{modalTitle}</a>
                    </div>
					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="">{modalTitle}</a>
                    </div>

					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="">{modalTitle}</a>
                    </div>

					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="">{modalTitle}</a>
                    </div>
					<div class="text-stone-50 mb-4 font-semibold">
                        <a href="">{modalTitle}</a>
                    </div>
				</ul>
			</div>

			<button
				class="w-full px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
				on:click={() => (showModal = false)}
			>
				Bezár
			</button>
		</div>
	</div>
</div>
