import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!doctype html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"utf-8\">\n\t<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">\n\t<meta name=\"theme-color\" content=\"#333333\">\n\n\t<!-- Import Google Icon Font -->\n\t<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n\t<!-- Import materialize.css -->\n\t<link type=\"text/css\" rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css\"  media=\"screen,projection\"/>\n\t\n\t<link rel=\"stylesheet\" href=\"/global.css\">\n\t<link rel=\"manifest\" href=\"manifest.json\" crossorigin=\"use-credentials\">\n\t<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\">\n\n\t" + head + "\n</head>\n<body>\n\t<div id=\"svelte\">" + body + "</div>\n\n\t<script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js\"></script>\t\n</body>\n</html>\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-4c6dbd91.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-4c6dbd91.js","/./_app/chunks/vendor-105b73e2.js","/./_app/chunks/preload-helper-9f12a5fd.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":3127,"type":"image/png"},{"file":"global.css","size":710,"type":"text/css"},{"file":"logo-192.png","size":4760,"type":"image/png"},{"file":"logo-512.png","size":13928,"type":"image/png"},{"file":"manifest.json","size":324,"type":"application/json"},{"file":"particles.js","size":43009,"type":"application/javascript"},{"file":"particles.json","size":1970,"type":"application/json"},{"file":"poweredByISTRAV.png","size":95,"type":"image/png"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-d7cf9447.js","css":[],"js":["/./_app/pages/__layout.svelte-d7cf9447.js","/./_app/chunks/vendor-105b73e2.js","/./_app/chunks/api-5fa53d0a.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-08da241b.js","css":[],"js":["/./_app/error.svelte-08da241b.js","/./_app/chunks/vendor-105b73e2.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-5d5c0c5a.js","css":["/./_app/assets/pages/index.svelte-8536c73b.css"],"js":["/./_app/pages/index.svelte-5d5c0c5a.js","/./_app/chunks/vendor-105b73e2.js","/./_app/chunks/api-5fa53d0a.js","/./_app/chunks/preload-helper-9f12a5fd.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}