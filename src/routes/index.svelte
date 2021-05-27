<script>
  import { onMount } from "svelte";
  
  import { istrav, scripts } from '../../farmerless/api'

  import Generic1 from '../../farmerless/components/wireframes/Generic1.svelte'
	import MainFooter from '../../farmerless/components/blocks/MainFooter.svelte'
	import Navigation from '../../farmerless/components/blocks/Navigation.svelte'
	import Logo from '../../farmerless/components/blocks/Logo.svelte'
	import Slogan from '../../farmerless/components/blocks/Slogan.svelte'

  let app
  let domainId
  let state = 'production'

	onMount(async () => {
    domainId = window.location.host

    // pick an app to show for local development
    if (domainId.includes('localhost:5000')) {
      domainId = 'istrav.com'
    }
    // set appId from domain 
    if (domainId.includes('aaghc.com')) {
      // for subdomains such as http://istrav.aaghc.com
      let endpoint = domainId.split('.')[0]
      let esEndpoint = await scripts.tenant.apps.getEndpoint(null, endpoint)
      if (esEndpoint.payload.success === true) {
        app = esEndpoint.payload.data
        domainId = esEndpoint.payload.data.domain // do this so images load
      } else {
        alert(esEndpoint.payload.reason)
      }
    } else {
      // for custom domains such as https://aaghc.com
      domainId = domainId.split('.').slice(-2).join('.')
      let esOne = await scripts.tenant.apps.getOne(null, domainId, state)
      if (esOne.payload.success === true) {
        app = esOne.payload.data
      } else {
        alert(esOne.payload.reason)
      }
    }
  })
</script>

<svelte:head>
  {#if app}
	  <title>Message Bulletin Board - {app.labelName}</title>
  {/if}
</svelte:head>

{#if app}
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