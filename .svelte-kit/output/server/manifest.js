export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Ckc_8D3S.js",app:"_app/immutable/entry/app.J6FF2110.js",imports:["_app/immutable/entry/start.Ckc_8D3S.js","_app/immutable/chunks/CELLloCM.js","_app/immutable/chunks/DtIcnE0i.js","_app/immutable/chunks/C-aG7Qbw.js","_app/immutable/entry/app.J6FF2110.js","_app/immutable/chunks/DtIcnE0i.js","_app/immutable/chunks/DAlj-fba.js","_app/immutable/chunks/BaHHEQlk.js","_app/immutable/chunks/C-aG7Qbw.js","_app/immutable/chunks/DryrQZS6.js","_app/immutable/chunks/BjGDvZBq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/show/[qr]",
				pattern: /^\/show\/([^/]+?)\/?$/,
				params: [{"name":"qr","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/stage",
				pattern: /^\/stage\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/stage/login",
				pattern: /^\/stage\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/stage/register",
				pattern: /^\/stage\/register\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/stage/repertoire",
				pattern: /^\/stage\/repertoire\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/stage/show/[id]",
				pattern: /^\/stage\/show\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
