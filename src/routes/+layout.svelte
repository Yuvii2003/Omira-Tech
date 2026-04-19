<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	export let data;
</script>

<svelte:body class="bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100" />

<!-- Global Decorative Background -->
<div class="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/50 via-gray-50 to-gray-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-gray-900"></div>

<Header {data}></Header>
<main class="mt-24 min-h-screen">
	<slot></slot>
</main>
<Footer></Footer>
