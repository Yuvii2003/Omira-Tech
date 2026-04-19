<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { CartOutline, UserCircleOutline } from 'flowbite-svelte-icons';
	import { loggedIn } from '$lib/store';
	import { onMount } from 'svelte';
	export let data;
	$: isLogin = $loggedIn;
	onMount(() => {
		if (data?.cookie) {
			loggedIn.set(true);
		}
	});

	async function handleLogout(event) {
		event.preventDefault();
		const response = await fetch('/logout', {
			method: 'POST'
		});
		if (response.ok) {
			loggedIn.set(false);
			window.location.reload();
		} else {
			console.error('Failed to log out');
		}
	}
</script>

<Navbar let:hidden let:toggle class="fixed start-0 top-0 z-[1000] w-full border-b border-gray-200 bg-white/90 backdrop-blur-md px-4 py-3 sm:px-6 dark:border-gray-800 dark:bg-gray-900/90">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-primary-600 from-purple-500">
			Omira-Tech 
		</span>
	</NavBrand>
	
	<div class="flex items-center md:order-2 gap-2 sm:gap-4">
		<button on:click={() => goto('/cart')} class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-500 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
			<CartOutline size="lg" />
		</button>
		<button id="user-menu" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-primary-500 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">
			<UserCircleOutline size="lg" />
		</button>
		
		<Dropdown triggeredBy="#user-menu" class="z-[1001] w-44 shadow-xl rounded-xl">
			{#if isLogin}
				<DropdownItem href="/" class="select-none py-2 text-base font-medium">Dashboard</DropdownItem>
				<DropdownItem href="/" class="select-none py-2 text-base font-medium">Settings</DropdownItem>
				<DropdownItem href="/" class="select-none py-2 text-base font-medium">Earnings</DropdownItem>
				<DropdownDivider />
				<form on:submit|preventDefault={handleLogout}>
					<button type="submit" class="w-full text-left">
						<DropdownItem class="select-none py-2 text-base font-medium text-red-600 dark:text-red-500">Sign out</DropdownItem>
					</button>
				</form>
			{:else}
				<DropdownItem href="/login" class="select-none py-2 text-base font-medium">Login</DropdownItem>
				<DropdownItem href="/signup" class="select-none py-2 text-base font-medium">Signup</DropdownItem>
			{/if}
		</Dropdown>

		<NavHamburger on:click={toggle} class="ml-2 md:hidden" />
	</div>

	<NavUl {hidden} class="md:order-1 pt-4 md:pt-0 border-t border-gray-100 dark:border-gray-700 md:border-0">
		<NavLi href="/" class="text-base font-medium">Home</NavLi>
		<NavLi href="/products" class="text-base font-medium">Products</NavLi>
		<NavLi href="/categories" class="text-base font-medium">Categories</NavLi>
	</NavUl>
</Navbar>
