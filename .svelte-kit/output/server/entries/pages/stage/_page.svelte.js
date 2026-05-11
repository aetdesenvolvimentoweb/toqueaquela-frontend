import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="container stack"><div class="row"><h1>Palco</h1> <button class="secondary right" style="width:auto;">Sair</button></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="card"><span class="spinner"></span> Carregando…</div>`);
    }
    $$renderer2.push(`<!--]--> <div class="card"><a href="/stage/repertoire">Gerenciar repertório →</a></div></div>`);
  });
}
export {
  _page as default
};
