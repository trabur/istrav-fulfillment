<script>
  import { onMount } from "svelte";

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

<div class="masonry">
	<div id="particles-js">
		<div class="middle">
			<div class="logo" on:mouseenter={showMagic} on:mouseleave={hideMagic}>
				{#if show}
					AAGHC
				{:else}
					<div class="first-a">A</div><div class="second-a">A</div><div class="third-g">G</div><div class="rotate-letter">H</div><div class="space-letter">C</div>
				{/if}
			</div>
			<h1 class="slogan">Community messaging<br /> and bulletin board.</h1>
		</div>
	</div>
</div>

<style>
	.masonry {
		min-height: 10em;
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
		margin: 0 auto;
		font-size: 3em;
		font-weight: 800;
		text-align: center;
		font-family: sans-serif;
		color: #333;
		cursor: pointer;
		display: table;
	}

	.logo .first-a {
		float: left;
	}

	.logo .second-a {
		margin-left: -0.2em;
		float: left;
	}

	.logo .third-g {
		margin-right: 0.1em;
		float: left;
	}

	.logo .rotate-letter {
		transform: rotate(-90deg);
		float: left;
	}

	.logo .space-letter {
		float: left;
	}

	.slogan {
		font-weight: 600;
		text-align: center;
		margin-top: -0.5em;
    font-size: 1em;
		color: #333;
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
</style>