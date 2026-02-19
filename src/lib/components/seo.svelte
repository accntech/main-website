<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		title: string;
		description: string;
		canonical?: string;
		ogImage?: string;
		ogType?: string;
		ogImageWidth?: number;
		ogImageHeight?: number;
		jsonLd?: Record<string, unknown> | null;
		noindex?: boolean;
	}

	let {
		title,
		description,
		canonical,
		ogImage = 'https://res.cloudinary.com/accountech/image/upload/v1771235077/iuatksezjs7zfdgobo1m.png',
		ogType = 'website',
		ogImageWidth = 1200,
		ogImageHeight = 630,
		jsonLd = null,
		noindex = false
	}: Props = $props();

	const canonicalUrl = $derived(canonical ?? `https://accountech.dev${page.url.pathname}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	{#if noindex}
		<meta name="robots" content="noindex,nofollow" />
	{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta property="og:image:width" content={String(ogImageWidth)} />
	<meta property="og:image:height" content={String(ogImageHeight)} />
	<meta property="og:site_name" content="AccounTech" />
	<meta property="og:locale" content="en_PH" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<meta name="geo.region" content="PH-MDR" />
	<meta name="geo.placename" content="Oriental Mindoro" />
	<meta name="geo.position" content="12.6218;121.5117" />
	<meta name="ICBM" content="12.6218, 121.5117" />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>
