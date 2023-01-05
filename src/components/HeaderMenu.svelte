<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { menu } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="lead"><img src="mtc_logo_small_32.png" alt=""></svelte:fragment>
	patscenario
	<svelte:fragment slot="trail">
		<span class="relative">
			<button class="btn btn-ghost-surface" use:menu={{ menu: 'navigation' }}>Navigation</button>
			<nav class="list-nav card p-4 w-40 shadow-xl" data-menu="navigation">
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href=test on:click={()=>{log(2)}}>About</a></li>
					<li><a href=test2 on:click={()=>{log(3)}}>Blog</a></li>
				</ul>
			</nav>
		</span>
	</svelte:fragment>
</AppBar>
