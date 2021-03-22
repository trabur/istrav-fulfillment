<script>
  import { onMount } from "svelte";
	import * as animateScroll from "svelte-scrollto"

	import Solutions from '../components/Solutions.svelte'
	import Nav from '../components/Nav.svelte'

	let show = false

	onMount(() => {
		/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
		particlesJS.load('particles-js', './particles.json', function() {
			console.log('callback - particles.js config loaded');
		});
	})

	function showMagic () {
		show = true
	}
	function hideMagic () {
		show = false
	}
</script>

<svelte:head>
	<title>AAGHC: Kitting & assembly.</title>
</svelte:head>

<div class="masonry">
	<div id="particles-js">
		<div class="middle">
			<div class="logo" on:mouseenter={showMagic} on:mouseleave={hideMagic}>
				{#if show}
					<span style="font-size: 2.5em; margin: 0 -0.1em;"><span class="first-a">A</span><span class="second-a">A</span>G<span class="rotate-letter">H</span><span class="space-letter">C</span></span>
				{:else}
					<span style="font-size: 2.5em; margin: 0 -0.1em;">AAGHC</span>
				{/if}
			</div>
			<h1 class="slogan">Kitting & assembly.</h1>
			<div class="expand">
				<a href="/#" class="btn-floating btn-large waves-effect waves-light" on:click={() => animateScroll.scrollTo({element: '#platform'})}>
					<i class="material-icons">expand_more</i>
				</a>
			</div>
		</div>
	</div>
</div>
<Nav />
<div id="platform">
	<Solutions />
</div>
<div class="dotted">
	<div style="min-height: 100vh;"></div>
</div>


<style>
	.masonry {
		min-height: 100vh;
		position: relative;
	}

	.middle {
    width: 100%;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
	}

	.logo {
		margin: -1em 0 0 0;
		font-size: 3.2em;
		font-weight: 800;
		text-align: center;
		font-family: sans-serif;
		color: #333;
		cursor: pointer;
	}

	.logo .first-a {
		width: 1em;
	}

	.logo .second-a {
		width: 1em;
		margin-left: -0.2em;
	}

	.logo .rotate-letter {
    position: absolute;
		transform: rotate(-90deg);
	}

	.logo .space-letter {
		margin-left: 0.7em;
	}

	.slogan {
		font-weight: 600;
		text-align: center;
		margin-top: -1em;
    font-size: 2.5em;
		color: #333;
	}

	#platform {
		background-color: #333;
	}

	#particles-js {
		background-color: #ee6e73;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.expand {
		text-align: center;
	}

	.dotted {
		background-image: radial-gradient(#ddd 20%, transparent 20%), radial-gradient(#ddd 20%, transparent 20%);
    background-color: #eee;
    background-position: 0 0, 50px 50px;
    background-size: 100px 100px;
	}
</style>