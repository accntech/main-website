<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import { ModeWatcher } from 'mode-watcher';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	afterNavigate((navigation) => {
		if (navigation.from?.url.pathname !== navigation.to?.url.pathname) {
			window.scrollTo({ top: 0, behavior: 'instant' });
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" />
{@render children()}
