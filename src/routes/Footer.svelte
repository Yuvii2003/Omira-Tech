<script>
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
</script>

<Footer class="mx-auto mt-10 max-w-screen-xl bg-transparent px-4 py-8 shadow-none dark:bg-transparent sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center sm:justify-between">
		<a href="/" class="mb-4 flex items-center sm:mb-0">
			<span class="self-center whitespace-nowrap text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-primary-600 from-purple-500">
				Omira-Tech
			</span>
		</a>
		<FooterLinkGroup class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 sm:gap-6">
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<FooterCopyright href="/" by="Omira-Tech™" year={2025} class="text-center" />
</Footer>
