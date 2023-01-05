<script>
	import '../theme.postcss'; // <--
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import HeaderMenu from '../components/HeaderMenu.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<HeaderMenu />
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->

	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
