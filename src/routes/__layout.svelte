<script context="module">
  export async function load({ session }) {
    const { API_URI, IO_URI, HEADLESS_URI } = session;

    return { 
      apiUri: API_URI,
      ioUri: IO_URI,
      headlessUri: HEADLESS_URI,
    };
  }
</script>

{#if loading}
  <!-- do nothing -->
{:else}
  <slot></slot>
{/if}

<div id="code"></div>

<script>
  import { onMount, onDestroy } from 'svelte';

	import { appData, domainId, backendId, headlessId, ioId } from '../stores.js';
  import { istrav, scripts } from '../../farmerless/api'

  export let apiUri
  export let ioUri
  export let headlessUri

  let app
  appData.subscribe(value => {
		app = value
	})
  let domain
  domainId.subscribe(value => {
		domain = value
	})
  let backend
  backendId.subscribe(value => {
		backend = value
	})
  let headless
  headlessId.subscribe(value => {
    headless = value
	})
  let io
  ioId.subscribe(value => {
    io = value
	})

  let loading = true
  let state = 'production'

  onMount(async () => {
    // setup links
    if (window.location.host === 'localhost:5000') {
      console.log('using localhost settings:')
      domainId.set('istrav.com')
      headlessId.set('http://localhost:9999')
      backendId.set('http://localhost:1337')
      ioId.set('http://localhost:3333')
    } else {
      console.log('using production settings:')
      domainId.set(window.location.host)
      headlessId.set(headlessUri || 'https://farmerless.com')
      backendId.set(apiUri || 'https://api.hacktracks.org')
      ioId.set(ioUri || 'https://io.hacktracks.org')
    }
    console.log(domain, backend, headless, io)
    
    // configure backend
    istrav.account.carts.init({ host: backend })
    istrav.account.orders.init({ host: backend })
    istrav.account.users.init({ host: backend })
    istrav.app.blocks.init({ host: backend })
    istrav.app.faq.init({ host: backend })
    istrav.app.menus.init({ host: backend })
    istrav.app.pages.init({ host: backend })
    istrav.channel.guides.init({ host: backend })
    istrav.channel.playlists.init({ host: backend })
    istrav.channel.videos.init({ host: backend })
    istrav.store.categories.init({ host: backend })
    istrav.store.collections.init({ host: backend })
    istrav.store.products.init({ host: backend })
    istrav.subscription.licenses.init({ host: backend })
    istrav.subscription.plans.init({ host: backend })
    istrav.tenant.apps.init({ host: backend })
    istrav.tenant.members.init({ host: backend })

    // pick an app to show for local development
    if (domain.includes('localhost:5000')) {
      domain = 'istrav.com'
    }

    // load app data
    if (domain.includes('aaghc.com')) {
      // for subdomains such as http://istrav.aaghc.com
      let endpoint = domain.split('.')[0]
      let esEndpoint = await scripts.tenant.apps.getEndpoint(null, endpoint)
      if (esEndpoint.payload.success === true) {
        appData.set(esEndpoint.payload.data)
      } else {
        alert(esEndpoint.payload.reason)
      }
    } else {
      // for custom domains such as https://istrav.com
      domain = domain.split('.').slice(-2).join('.')
      let esOne = await scripts.tenant.apps.getOne(null, domain, state)
      if (esOne.payload.success === true) {
        appData.set(esOne.payload.data)
      } else {
        alert(esOne.payload.reason)
      }
    }

    console.log('appData', app)
    loading = false
  })
</script>