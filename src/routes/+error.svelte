<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex flex-col justify-center items-center bg-base min-h-screen animate-fade-in">
	<h1
		class="bg-clip-text bg-linear-to-r from-teal to-teal-light font-rajdhani font-bold text-[8rem] text-transparent sm:text-[10rem] leading-none"
	>
		{page.status}
	</h1>

	<p class="mt-4 text-body text-lg">
		{page.error?.message ?? 'Something went wrong'}
	</p>

	<a
		href="/"
		class="bg-teal hover:bg-teal-dark mt-8 px-8 py-3 rounded-full font-medium text-white transition-colors"
	>
		Back to Home
	</a>
</div>
