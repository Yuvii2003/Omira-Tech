<script>
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer class="flex flex-col gap-4 py-3">
	<hr />
	<div class="sm:flex sm:items-center sm:justify-between px-5">
		<FooterCopyright href="/" by="Omira™" year={2025} />
		<FooterLinkGroup
			class="flex gap-10 flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
</Footer>
