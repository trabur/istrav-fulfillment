<script>
  import { onMount } from 'svelte';

	export let selected
  export let appId

  let items = []

	onMount(async () => {    
    // get the menus
    let esNavigation = await scripts.app.menus.getOne(appId, 'main')
    if (esNavigation.payload.success === true) {
      items = JSON.parse(esNavigation.payload.data.raw)
    } else {
      console.log(esNavigation.payload.reason)
    }
    console.log('main menu', items)
  })
</script>

{#if items.length > 0}
	<div class="nav">
		{#each items as nav}
			{#if nav.id === selected}
				<a href={nav.url} class="btn-large waves-effect waves-light red lighten-2">
					{nav.name}
				</a>
			{:else}
				<a href={nav.url} class="btn-large waves-effect waves-light">
					{nav.name}
				</a>
			{/if}
		{/each}
	</div>
{/if}

<style>
  .nav {
    padding: 1em;
    text-align: center;
    background-color: #222;
  }

  .nav a {
    margin: 0.5em;
  }
</style>

