<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import Hero from '$lib/components/hero.svelte';
	import WhoItsFor from '$lib/components/who-its-for.svelte';
	import Services from '$lib/components/services.svelte';
	import CompanyProfile from '$lib/components/company-profile.svelte';
	import About from '$lib/components/about.svelte';
	import Trust from '$lib/components/trust.svelte';
	import Contact from '$lib/components/contact.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'AccountingService',
				'@id': 'https://accountech.dev/#organization',
				name: 'AccounTech Business Management Services',
				alternateName: 'AccounTech',
				url: 'https://accountech.dev',
				logo: 'https://accountech.dev/favicon.png',
				image:
					'https://res.cloudinary.com/accountech/image/upload/v1771235077/iuatksezjs7zfdgobo1m.png',
				description:
					'Where Accounting Meets Technology. Comprehensive accounting, tax compliance, advisory, and system development services in Oriental Mindoro, Philippines.',
				foundingDate: '2017',
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Roxas',
					addressRegion: 'Oriental Mindoro',
					addressCountry: 'PH'
				},
				telephone: '+63-995-294-2417',
				email: 'accntech.dev@gmail.com',
				sameAs: [
					'https://facebook.com/ogiegalicia',
					'https://github.com/cpa-coder'
				],
				founder: { '@id': 'https://accountech.dev/#founder' },
				areaServed: {
					'@type': 'AdministrativeArea',
					name: 'Oriental Mindoro, Philippines'
				},
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Accounting & Technology Services',
					itemListElement: [
						{ '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Compliance' } },
						{ '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax Advisory' } },
						{
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: 'Business Registrations' }
						},
						{
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: 'Management Advisory' }
						},
						{
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: 'System Development' }
						},
						{
							'@type': 'Offer',
							itemOffered: { '@type': 'Service', name: 'Accounting Software' }
						}
					]
				},
				slogan: 'Where Accounting Meets Technology'
			},
			{
				'@type': 'Person',
				'@id': 'https://accountech.dev/#founder',
				name: 'Ogie Galicia',
				jobTitle: 'Founder & Certified Public Accountant',
				image:
					'https://res.cloudinary.com/accountech/image/upload/v1771235077/iuatksezjs7zfdgobo1m.png',
				description:
					'Licensed Certified Public Accountant in the Philippines. Founder of AccounTech, bridging traditional accounting practices with modern technology. Speaker and trainer on accounting and taxation.',
				worksFor: { '@id': 'https://accountech.dev/#organization' },
				knowsAbout: [
					'Tax Compliance',
					'Business Advisory',
					'Software Development',
					'Accounting',
					'Auditing'
				]
			},
			{
				'@type': 'WebSite',
				'@id': 'https://accountech.dev/#website',
				url: 'https://accountech.dev',
				name: 'AccounTech',
				description: 'Accounting & Technology Solutions',
				publisher: { '@id': 'https://accountech.dev/#organization' }
			}
		]
	};
</script>

<Seo
	title="Accountech | Accounting & Technology Solutions"
	description="Accountech - Where Accounting Meets Technology. Tax compliance, advisory, business registrations, and system development services in the Philippines."
	{jsonLd}
/>

<Nav />
<main>
	<Hero />
	<WhoItsFor />
	<Services />
	<CompanyProfile />
	<About />
	<Trust />
	<Contact />
</main>
<Footer />
