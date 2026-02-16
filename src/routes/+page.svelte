<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import Hero from '$lib/components/hero.svelte';
	import Services from '$lib/components/services.svelte';
	import About from '$lib/components/about.svelte';
	import Contact from '$lib/components/contact.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Accountech | Accounting & Technology Solutions</title>
	<meta name="description" content="Accountech - Where Accounting Meets Technology. Tax compliance, advisory, business registrations, and system development services in the Philippines." />
	<meta name="author" content="Ogie Galicia" />
</svelte:head>

<Nav />
<main>
	<Hero />
	<Services />
	<About />
	<Contact />
</main>
<Footer />
