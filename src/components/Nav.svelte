<script>
  let navigation = [
    {
      "name": "Home",
      "url": "https://istrav.com"
    },
    {
      "name": "Shop",
      "url": "https://shop.istrav.com"
    },
    {
      "name": "Community",
      "url": "https://forum.istrav.com"
    },
    {
      "name": "Blog",
      "url": "https://blog.istrav.com"
    },
    {
      "name": "Pricing",
      "url": "https://www.istrav.com/pricing"
    },
    {
      "name": "FAQ",
      "url": "https://www.istrav.com/faq"
    },
    {
      "name": "Contact",
      "url": "https://www.istrav.com/contact"
    }
  ]
</script>

<div class="nav">
  {#each navigation as nav}
    <a href={nav.url} class="btn-large waves-effect waves-light">
      {nav.name}
    </a>
  {/each}
</div>

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

