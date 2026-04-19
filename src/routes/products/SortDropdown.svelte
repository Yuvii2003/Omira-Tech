<script>
	import { Button, Dropdown, Radio } from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { onMount, createEventDispatcher } from 'svelte';
	import { selectedSortOption } from '$lib/store';
	import { get } from 'svelte/store';

	let opened = false;
	const dispatch = createEventDispatcher();

	function handleClickOutside(event) {
		if (!event.target.closest('.mybtn') && opened) {
			opened = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleDispatch(data) {
		dispatch('sort', data);
	}

	function handleSortChange(value) {
		selectedSortOption.set(value);
		handleDispatch(value);
	}

	// Get the current value from the store
	let selectedValue = get(selectedSortOption);
</script>

<Button color="light" on:click={() => (opened = !opened)} class="mybtn">
	SORT BY:
	<ChevronRightOutline
		class={`ms-2 h-6 w-6 text-black dark:text-white ${opened ? 'rotate-90' : ''} duration-150`}
	/>
</Button>

<Dropdown class="w-44 space-y-3 p-3 text-sm">
	<li>
		<Radio
			name="group1"
			bind:group={selectedValue}
			value={0}
			color="blue"
			on:click={() => handleSortChange(0)}
			class="hover:cursor-pointer"
		>
			Relevance
		</Radio>
	</li>
	<li>
		<Radio
			name="group1"
			bind:group={selectedValue}
			value={1}
			color="blue"
			on:click={() => handleSortChange(1)}
			class="hover:cursor-pointer"
		>
			Price -- Low to High
		</Radio>
	</li>
	<li>
		<Radio
			name="group1"
			bind:group={selectedValue}
			value={-1}
			color="blue"
			on:click={() => handleSortChange(-1)}
			class="hover:cursor-pointer"
		>
			Price -- High to Low
		</Radio>
	</li>
</Dropdown>
