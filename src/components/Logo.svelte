<script>
  import { onMount } from "svelte";

  export let domainId
  export let rawApp

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
			{#if domainId === 'istrav.com'}
				<div class="logo">
					<span style="font-style: italic; font-size: 3em; margin: 0 -0.1em;">IS</span>
					<span style="font-style: italic; vertical-align: top; font-size: 1.5em; line-height: 2.3em;">TRAV</span>
				</div>
			{:else if domainId === 'aaghc.com'}
				<div class="aaghc" on:mouseenter={showMagic} on:mouseleave={hideMagic}>
					{#if show}
						AAGHC
					{:else}
						<div class="first-a">A</div><div class="second-a">A</div><div class="third-g">G</div><div class="rotate-letter">H</div><div class="space-letter">C</div>
					{/if}
				</div>
			{:else}
				<div class="logo">
					<span style="font-size: 1.5em; line-height: 2em;">{rawApp.name || ''}</span>
				</div>
			{/if}
			{#if rawApp}
				<h1 class="slogan">{rawApp.sloganLine1 || ''}<br />{rawApp.sloganLine2 || ''}</h1>
			{/if}
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
		margin: -1em 0 0 0;
		font-size: 1.5em;
		font-weight: 800;
		text-align: center;
		color: #333;
	}

	.slogan {
		font-weight: 600;
		text-align: center;
		margin-top: -1em;
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

	.aaghc {
		margin: 0 auto;
		font-size: 5em;
		font-weight: 800;
		text-align: center;
		font-family: sans-serif;
		color: #333;
		cursor: pointer;
		display: table;
	}

	.aaghc .first-a {
		float: left;
	}

	.aaghc .second-a {
		margin-left: -0.2em;
		float: left;
	}

	.aaghc .third-g {
		margin-right: 0.1em;
		float: left;
	}

	.aaghc .rotate-letter {
		transform: rotate(-90deg);
		float: left;
	}

	.aaghc .space-letter {
		float: left;
	}
</style>