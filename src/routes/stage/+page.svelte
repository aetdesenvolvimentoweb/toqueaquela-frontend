<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { apiFetch, type ApiError } from '$lib/api';
  import { clearToken } from '$lib/auth';
  import { formatBRL } from '$lib/format';

  type ActiveShow = {
    id: string;
    qrCode: string;
    artistMinAmount: number;
    validHours: number;
    startedAt: string;
  };

  let activeShow = $state<ActiveShow | null>(null);
  let loadingActive = $state(true);
  let loadError = $state<string | null>(null);

  let artistMinReais = $state(5);
  let validHours = $state(4);
  let starting = $state(false);
  let startError = $state<string | null>(null);

  onMount(async () => {
    try {
      const res = await apiFetch<{ show: ActiveShow | null }>('/artist/shows/active', {
        auth: true,
      });
      activeShow = res.show;
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        clearToken();
        goto('/stage/login');
        return;
      }
      loadError = err.code;
    } finally {
      loadingActive = false;
    }
  });

  async function startShow() {
    startError = null;
    starting = true;
    try {
      const res = await apiFetch<{ showId: string; qrCode: string }>('/artist/shows', {
        method: 'POST',
        auth: true,
        body: {
          artistMinAmount: Math.round(artistMinReais * 100),
          validHours,
        },
      });
      activeShow = {
        id: res.showId,
        qrCode: res.qrCode,
        artistMinAmount: Math.round(artistMinReais * 100),
        validHours,
        startedAt: new Date().toISOString(),
      };
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        clearToken();
        goto('/stage/login');
        return;
      }
      startError = err.code === 'artist_already_has_active_show'
        ? 'Você já tem um show ativo. Recarregue a página.'
        : `Erro: ${err.code}`;
    } finally {
      starting = false;
    }
  }

  function logout() {
    clearToken();
    goto('/stage/login');
  }

  function publicShowUrl(qr: string): string {
    if (typeof window === 'undefined') return `/show/${qr}`;
    return `${window.location.origin}/show/${qr}`;
  }
</script>

<div class="container stack">
  <div class="row">
    <h1>Palco</h1>
    <button class="secondary right" onclick={logout} style="width:auto;">Sair</button>
  </div>

  {#if loadingActive}
    <div class="card"><span class="spinner"></span> Carregando…</div>
  {:else if loadError}
    <div class="card error">Erro ao buscar show ativo: {loadError}</div>
  {:else if activeShow}
    <div class="card stack">
      <h2>Show ativo</h2>
      <div>QR Code: <strong style="font-size:1.25rem;">{activeShow.qrCode}</strong></div>
      <div class="muted">Valor mínimo: {formatBRL(activeShow.artistMinAmount)}</div>
      <div class="muted">Janela: {activeShow.validHours}h</div>
      <div class="muted" style="word-break:break-all;">
        URL pro público: {publicShowUrl(activeShow.qrCode)}
      </div>
      <a href="/stage/show/{activeShow.id}">Abrir fila →</a>
    </div>
  {:else}
    <div class="card stack">
      <h2>Iniciar show</h2>
      <label>
        Valor mínimo do pedido (R$)
        <input type="number" min="1" step="0.5" bind:value={artistMinReais} />
      </label>
      <label>
        Janela do QR (horas, 1–24)
        <input type="number" min="1" max="24" bind:value={validHours} />
      </label>
      {#if startError}
        <div class="error">{startError}</div>
      {/if}
      <button onclick={startShow} disabled={starting}>
        {#if starting}<span class="spinner"></span> Iniciando…{:else}Gerar QR e iniciar{/if}
      </button>
    </div>
  {/if}

  <div class="card">
    <a href="/stage/repertoire">Gerenciar repertório →</a>
  </div>
</div>
