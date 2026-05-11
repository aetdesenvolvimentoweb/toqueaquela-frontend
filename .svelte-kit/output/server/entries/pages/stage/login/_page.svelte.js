import { a as attr } from "../../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "demo@toqueaquela.app";
    let password = "demo123";
    let loading = false;
    $$renderer2.push(`<div class="container stack"><h1>Entrar</h1> <form class="stack"><label>E-mail <input type="email"${attr("value", email)} required="" autocomplete="email"/></label> <label>Senha <input type="password"${attr("value", password)} required="" autocomplete="current-password"/></label> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Entrar`);
    }
    $$renderer2.push(`<!--]--></button></form> <a href="/stage/register" class="muted">Cadastrar artista</a></div>`);
  });
}
export {
  _page as default
};
