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

<div class="relative z-[1000] bg-slate-100">
	<Navbar class="fixed start-0 top-0 w-full border-b bg-slate-600 px-0 py-0 sm:px-4">
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold text-white">
				Omira-Tech 
			</span>
		</NavBrand>
		<NavUl>
			<NavLi on:click={() => goto('/')}>
				<span class="cursor-pointer text-white hover:text-blue-600 sm:text-black md:text-white">
					Home
				</span>
			</NavLi>
			<NavLi on:click={() => goto('/products')}>
				<span class="cursor-pointer text-white hover:text-blue-600 sm:text-black md:text-white">
					Products
				</span>
			</NavLi>
			<NavLi on:click={() => goto('/categories')}>
				<span class="cursor-pointer text-white hover:text-blue-600 sm:text-black md:text-white">
					Categories
				</span>
			</NavLi>
		</NavUl>
		<NavHamburger />
		<NavUl>
			<div class="flex flex-row justify-between gap-10 align-middle">
				<NavLi href="/cart" class="text-white hover:text-blue-600">
					<CartOutline size="xl" class="hover:text-blue-500 sm:text-black md:text-white" />
				</NavLi>
				<NavLi class="cursor-pointer text-white hover:text-blue-600">
					<UserCircleOutline size="xl" class="hover:text-blue-500 sm:text-black md:text-white" />
				</NavLi>
				<Dropdown class="z-20 w-44">
					{#if isLogin}
						<DropdownItem href="/" class="select-none">Dashboard</DropdownItem>
						<DropdownItem href="/" class="select-none">Settings</DropdownItem>
						<DropdownItem href="/" class="select-none">Earnings</DropdownItem>
						<DropdownDivider />
						<form on:submit|preventDefault={handleLogout}>
							<button type="submit" class="w-full text-left">
								<DropdownItem class="select-none">Sign out</DropdownItem>
							</button>
						</form>
					{:else}
						<DropdownItem href="/login" class="select-none">Login</DropdownItem>
						<DropdownItem href="/signup" class="select-none">Signup</DropdownItem>
					{/if}
				</Dropdown>
			</div>
		</NavUl>
	</Navbar>
</div>
