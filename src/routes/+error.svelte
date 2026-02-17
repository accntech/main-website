<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-base animate-fade-in">
	<h1
		class="font-[family-name:var(--font-rajdhani)] text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent"
	>
		{page.status}
	</h1>

	<p class="mt-4 text-lg text-body">
		{page.error?.message ?? 'Something went wrong'}
	</p>

	<a
		href="/"
		class="mt-8 bg-teal hover:bg-teal-dark text-white rounded-full px-8 py-3 font-medium transition-colors"
	>
		Back to Home
	</a>
</div>
