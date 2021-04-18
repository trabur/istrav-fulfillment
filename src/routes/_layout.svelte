<script context="module">
  export async function preload(page, session) {
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
  import axios from 'axios'

  export let apiUri
  export let ioUri
  export let headlessUri
  
  let loading = true

  onMount(() => {
    // fetch library
    window.axios = axios

    // appId domain state
    let backend
    let headless
    if (window.location.host === 'localhost:5000') {
      window.appDomain = 'istrav.com'
      headless = 'http://localhost:9999'
      backend = 'http://localhost:1337'
      io = 'http://localhost:3333'
      console.log('localhost settings:', appDomain, backend, headless, io)
    } else {
      window.appDomain = window.location.host
      headless = headlessUri || 'https://farmerless.com'
      backend = apiUri || 'https://api.hacktracks.org'
      io = ioUri || 'https://io.hacktracks.org'
      console.log('production settings:', appDomain, backend, headless, io)
    }

    // headless.istrav.com scripts
    var code = document.createElement('script');
    code.onload = function (event) {
      // headless scripts & istrav will attach to window
      // console.log(window.scripts)
      // console.log(window.istrav)

      istrav.tenant.members.init({ host: backend })
      istrav.tenant.apps.init({ host: backend })
      istrav.app.menus.init({ host: backend })
      istrav.app.pages.init({ host: backend })
      istrav.store.collections.init({ host: backend })
      istrav.store.categories.init({ host: backend })
      istrav.store.products.init({ host: backend })
      istrav.account.users.init({ host: backend })
      istrav.account.carts.init({ host: backend })
      istrav.account.orders.init({ host: backend })
      loading = false
    };

    code.src = `${headless}/scripts/index.js`;
    code.setAttribute('type', 'module')
    document.getElementById('code').appendChild(code); 
  })
</script>