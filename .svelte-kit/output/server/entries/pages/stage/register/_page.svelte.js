import { a as attr } from "../../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let displayName = "";
    let email = "";
    let password = "";
    let pixKey = "";
    let loading = false;
    $$renderer2.push(`<div class="container stack"><h1>Cadastrar artista</h1> <form class="stack"><label>Nome artístico <input${attr("value", displayName)} maxlength="120" required=""/></label> <label>E-mail <input type="email"${attr("value", email)} maxlength="254" required="" autocomplete="email"/></label> <label>Senha (mínimo 8 caracteres) <input type="password"${attr("value", password)} minlength="8" maxlength="128" required="" autocomplete="new-password"/></label> <label>Chave Pix de recebimento <input${attr("value", pixKey)} maxlength="128" required=""/></label> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Cadastrar`);
    }
    $$renderer2.push(`<!--]--></button></form> <a href="/stage/login" class="muted">Já tenho conta</a></div>`);
  });
}
export {
  _page as default
};
