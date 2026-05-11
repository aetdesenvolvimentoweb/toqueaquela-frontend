
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/show" | "/show/[qr]" | "/stage" | "/stage/login" | "/stage/register" | "/stage/repertoire" | "/stage/show" | "/stage/show/[id]";
		RouteParams(): {
			"/show/[qr]": { qr: string };
			"/stage/show/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { qr?: string; id?: string };
			"/show": { qr?: string };
			"/show/[qr]": { qr: string };
			"/stage": { id?: string };
			"/stage/login": Record<string, never>;
			"/stage/register": Record<string, never>;
			"/stage/repertoire": Record<string, never>;
			"/stage/show": { id?: string };
			"/stage/show/[id]": { id: string }
		};
		Pathname(): "/" | `/show/${string}` & {} | "/stage" | "/stage/login" | "/stage/register" | "/stage/repertoire" | `/stage/show/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}