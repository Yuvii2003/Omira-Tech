<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	export let data;
</script>

<Header {data}></Header>
<div class="mt-24 min-h-screen">
	<slot></slot>
</div>
<Footer></Footer>
