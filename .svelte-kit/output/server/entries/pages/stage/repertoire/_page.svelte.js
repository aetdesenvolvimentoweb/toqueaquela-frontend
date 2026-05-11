import { a as attr } from "../../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let newTitle = "";
    let newOriginalArtist = "";
    let newDurationMin = null;
    let adding = false;
    $$renderer2.push(`<div class="container stack"><div class="row"><h1>Repertório</h1> <a href="/stage" class="right">← voltar</a></div> <form class="card stack"><h2>Adicionar música</h2> <label>Título <input${attr("value", newTitle)} maxlength="200" required=""/></label> <label>Artista original <input${attr("value", newOriginalArtist)} maxlength="200" required=""/></label> <label>Duração (minutos, opcional) <input type="number" min="0.5" step="0.5"${attr("value", newDurationMin)} placeholder="3.5"/></label> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", adding, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Adicionar`);
    }
    $$renderer2.push(`<!--]--></button></form> <div class="stack">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="card"><span class="spinner"></span> Carregando…</div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
