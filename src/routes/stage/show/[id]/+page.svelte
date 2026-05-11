<script lang="ts">
  import { goto } from '$app/navigation';
  import { onDestroy, onMount } from 'svelte';
  import { page } from '$app/state';
  import { apiFetch, type ApiError } from '$lib/api';
  import { clearToken } from '$lib/auth';
  import { formatBRL } from '$lib/format';

  type QueueItem = {
    orderId: string;
    repertoireItemId: string;
    amount: number;
    dedicatee: string | null;
    status: string;
    position: number;
    createdAt: string;
  };

  type RepertoireItem = {
    id: string;
    title: string;
    originalArtist: string;
    durationSeconds: number | null;
  };

  const showId = $derived(page.params.id ?? '');

  let items = $state<QueueItem[]>([]);
  let repertoireById = $state<Record<string, RepertoireItem>>({});
  let loadError = $state<string | null>(null);
  let busyOrderId = $state<string | null>(null);
  let endError = $state<string | null>(null);
  let ending = $state(false);

  let pollHandle: ReturnType<typeof setInterval> | null = null;

  onMount(async () => {
    await loadRepertoire();
    await refreshQueue();
    pollHandle = setInterval(refreshQueue, 3000);
  });

  onDestroy(() => {
    if (pollHandle) clearInterval(pollHandle);
  });

  async function loadRepertoire() {
    try {
      const res = await apiFetch<{ items: RepertoireItem[] }>('/artist/repertoire', {
        auth: true,
      });
      const map: Record<string, RepertoireItem> = {};
      for (const i of res.items) map[i.id] = i;
      repertoireById = map;
    } catch {
      // ignore — fila ainda funciona
    }
  }

  async function refreshQueue() {
    try {
      const res = await apiFetch<{ items: QueueItem[] }>(
        `/artist/shows/${showId}/queue`,
        { auth: true },
      );
      items = res.items;
      loadError = null;
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        clearToken();
        goto('/stage/login');
        return;
      }
      if (err.status === 403) {
        loadError = 'Esse show não pertence a você.';
        if (pollHandle) clearInterval(pollHandle);
        return;
      }
      loadError = err.code;
    }
  }

  async function markAsPlayed(orderId: string) {
    busyOrderId = orderId;
    try {
      await apiFetch(`/artist/orders/${orderId}/play`, { method: 'POST', auth: true });
      await refreshQueue();
    } catch (e) {
      const err = e as ApiError;
      loadError = `Não foi possível marcar: ${err.code}`;
    } finally {
      busyOrderId = null;
    }
  }

  async function endShow() {
    if (!confirm('Encerrar o show? Pedidos pagos não tocados serão reembolsados.')) return;
    endError = null;
    ending = true;
    try {
      const res = await apiFetch<{ refundedCount: number; cancelledCount: number }>(
        `/artist/shows/${showId}/end`,
        { method: 'POST', auth: true },
      );
      if (pollHandle) clearInterval(pollHandle);
      alert(`Show encerrado. Refunds: ${res.refundedCount}. Cancelados: ${res.cancelledCount}.`);
      goto('/stage');
    } catch (e) {
      const err = e as ApiError;
      endError = err.code === 'already_ended' ? 'Show já estava encerrado.' : `Erro: ${err.code}`;
    } finally {
      ending = false;
    }
  }

  function songLabel(repertoireItemId: string): string {
    const item = repertoireById[repertoireItemId];
    if (!item) return repertoireItemId;
    return `${item.title} — ${item.originalArtist}`;
  }
</script>

<div class="container stack">
  <div class="row">
    <h1>Fila</h1>
    <a href="/stage" class="right">← voltar</a>
  </div>

  {#if loadError}
    <div class="card error">{loadError}</div>
  {/if}

  {#if items.length === 0}
    <div class="card muted">Nenhum pedido pago no momento.</div>
  {:else}
    <div class="stack">
      {#each items as item (item.orderId)}
        <div class="queue-item">
          <span class="position">#{item.position}</span>
          <div style="flex:1;">
            <div><strong>{songLabel(item.repertoireItemId)}</strong></div>
            {#if item.dedicatee}
              <div class="muted">"{item.dedicatee}"</div>
            {/if}
            <div class="muted">
              <span class="amount">{formatBRL(item.amount)}</span>
            </div>
          </div>
          <button
            onclick={() => markAsPlayed(item.orderId)}
            disabled={busyOrderId === item.orderId}
            style="width:auto;"
          >
            {#if busyOrderId === item.orderId}
              <span class="spinner"></span>
            {:else}
              Tocada
            {/if}
          </button>
        </div>
      {/each}
    </div>
  {/if}

  {#if endError}
    <div class="card error">{endError}</div>
  {/if}

  <button class="danger" onclick={endShow} disabled={ending}>
    {#if ending}<span class="spinner"></span> Encerrando…{:else}Encerrar show{/if}
  </button>

  <p class="muted" style="text-align:center;">Atualiza automaticamente a cada 3s.</p>
</div>
