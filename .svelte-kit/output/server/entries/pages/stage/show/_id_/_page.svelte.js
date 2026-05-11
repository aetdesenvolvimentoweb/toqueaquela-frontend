import { s as ssr_context, b as ensure_array_like, e as escape_html, a as attr } from "../../../../../chunks/root.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/state.svelte.js";
import "../../../../../chunks/client.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const formatBRL = (cents) => `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = [];
    let repertoireById = {};
    let busyOrderId = null;
    let ending = false;
    onDestroy(() => {
    });
    function songLabel(repertoireItemId) {
      const item = repertoireById[repertoireItemId];
      if (!item) return repertoireItemId;
      return `${item.title} — ${item.originalArtist}`;
    }
    $$renderer2.push(`<div class="container stack"><div class="row"><h1>Fila</h1> <a href="/stage" class="right">← voltar</a></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (items.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="card muted">Nenhum pedido pago no momento.</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="stack"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<div class="queue-item"><span class="position">#${escape_html(item.position)}</span> <div style="flex:1;"><div><strong>${escape_html(songLabel(item.repertoireItemId))}</strong></div> `);
        if (item.dedicatee) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="muted">"${escape_html(item.dedicatee)}"</div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="muted"><span class="amount">${escape_html(formatBRL(item.amount))}</span></div></div> <button${attr("disabled", busyOrderId === item.orderId, true)} style="width:auto;">`);
        if (busyOrderId === item.orderId) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="spinner"></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`Tocada`);
        }
        $$renderer2.push(`<!--]--></button></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button class="danger"${attr("disabled", ending, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Encerrar show`);
    }
    $$renderer2.push(`<!--]--></button> <p class="muted" style="text-align:center;">Atualiza automaticamente a cada 3s.</p></div>`);
  });
}
export {
  _page as default
};
