<script>
  import { onMount } from "svelte";
  
	import { appData } from '../stores.js';
  import { istrav, scripts } from '../../farmerless/api'

  import Generic1 from '../../farmerless/components/wireframes/Generic1.svelte'
	import MainFooter from '../../farmerless/components/blocks/MainFooter.svelte'
	import Navigation from '../../farmerless/components/blocks/Navigation.svelte'
	import Logo from '../../farmerless/components/blocks/Logo.svelte'
	import Slogan from '../../farmerless/components/blocks/Slogan.svelte'

  let app
  appData.subscribe(value => {
    app = value
    console.log(app)
  })
</script>

<svelte:head>
  {#if app.id}
	  <title>Message Bulletin Board - {app.labelName}</title>
  {/if}
</svelte:head>

{#if app.id}
  <Generic1 showWiring={false}>
    <section slot="logo" class="slot">
      <Logo {app} fontSize='' height='' />
    </section>
    <section slot="slogan" class="slot">
      <Slogan {app} fontSize='1em' />
    </section>
    <section slot="controls" class="slot">
      CONTROLS
    </section>
    <section slot="navigation" class="slot">
      <Navigation {app} page={{}} selected='forum' menuId='main' />
    </section>
    <section slot="article" class="slot">
      hello messages :)
    </section>
    <section slot="main" class="slot">
      
    </section>
    <section slot="footer" class="slot">
      <MainFooter {app} page={{}} selected='forum' menuId='marketing' />
    </section>
  </Generic1>
{/if}

<style>
</style>