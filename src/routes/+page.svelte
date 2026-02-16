<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/Services.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
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
