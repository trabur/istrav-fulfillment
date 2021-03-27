<script>
  import { onMount } from "svelte";
	import * as animateScroll from "svelte-scrollto"

	import Solutions from '../components/Solutions.svelte'
	import Nav from '../components/Nav.svelte'
	import Logo from '../components/Logo.svelte'

</script>

<svelte:head>
	<title>AAGHC: Community messaging and bulletin board.</title>
</svelte:head>

<Logo />
<Nav />
<div class="dotted">
	<div style="min-height: 100vh;"></div>
</div>


<style>
	.dotted {
		background-image: radial-gradient(#ddd 20%, transparent 20%), radial-gradient(#ddd 20%, transparent 20%);
    background-color: #eee;
    background-position: 0 0, 50px 50px;
    background-size: 100px 100px;
	}
</style>