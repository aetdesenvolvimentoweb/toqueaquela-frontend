<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { apiFetch, type ApiError } from '$lib/api';
  import { formatBRL, newIdempotencyKey } from '$lib/format';

  type RepertoireItem = {
    id: string;
    title: string;
    originalArtist: string;
    durationSeconds: number | null;
  };
  type ShowView = {
    showId: string;
    artistId: string;
    artistMinAmount: number;
    status: 'active' | 'expired' | 'ended';
    repertoire: RepertoireItem[];
  };

  const qr = $derived(page.params.qr ?? '');

  let view = $state<ShowView | null>(null);
  let loadError = $state<string | null>(null);

  let selectedItemId = $state<string | null>(null);
  let amountReais = $state(0);
  let dedicatee = $state('');

  let submitting = $state(false);
  let submitError = $state<string | null>(null);
  let submitSuccess = $state<string | null>(null);

  onMount(async () => {
    try {
      view = await apiFetch<ShowView>(`/shows/${qr}`);
      amountReais = view.artistMinAmount / 100;
    } catch (e) {
      loadError = (e as ApiError).code;
    }
  });

  async function submit() {
    if (!selectedItemId || !view) return;
    submitError = null;
    submitSuccess = null;
    submitting = true;
    try {
      const amountCents = Math.round(amountReais * 100);
      await apiFetch(`/shows/${qr}/orders`, {
        method: 'POST',
        body: {
          repertoireItemId: selectedItemId,
          amount: amountCents,
          dedicatee: dedicatee || null,
        },
        idempotencyKey: newIdempotencyKey(),
      });
      submitSuccess = 'Pedido enviado! Aguarde sua música tocar.';
      selectedItemId = null;
      dedicatee = '';
    } catch (e) {
      const err = e as ApiError;
      submitError = mapErrorToMessage(err);
    } finally {
      submitting = false;
    }
  }

  function mapErrorToMessage(err: ApiError): string {
    switch (err.code) {
      case 'amount_below_minimum':
        return `Valor abaixo do mínimo do show.`;
      case 'show_expired':
        return 'Esse show já encerrou.';
      case 'duplicate_request':
        return 'Pedido duplicado — tente novamente.';
      case 'gateway_failed':
        return 'Falha no processamento. Tente em alguns segundos.';
      default:
        return `Não foi possível enviar (${err.code}).`;
    }
  }
</script>

<div class="container stack">
  {#if loadError}
    <div class="card error">
      Não foi possível carregar o show: <strong>{loadError}</strong>.
    </div>
  {:else if !view}
    <div class="card"><span class="spinner"></span> Carregando show…</div>
  {:else if view.status === 'ended'}
    <div class="card">
      <h2>Show encerrado</h2>
      <p class="muted">Esse show já terminou. Volte na próxima!</p>
    </div>
  {:else if view.status === 'expired'}
    <div class="card">
      <h2>QR fora da janela</h2>
      <p class="muted">Esse QR Code expirou.</p>
    </div>
  {:else}
    <div class="card">
      <h2>Peça uma música</h2>
      <p class="muted">Mínimo do show: {formatBRL(view.artistMinAmount)}</p>
    </div>

    <div class="card stack">
      <strong>Repertório:</strong>
      {#each view.repertoire as item (item.id)}
        <label class="row" style="cursor:pointer; align-items:flex-start; padding:0.5rem 0;">
          <input
            type="radio"
            name="song"
            value={item.id}
            bind:group={selectedItemId}
            style="width:auto; margin-top:0.25rem;"
          />
          <span style="flex:1;">
            <div>{item.title}</div>
            <div class="muted">{item.originalArtist}</div>
          </span>
        </label>
      {/each}
    </div>

    <div class="card stack">
      <label>
        Valor do pedido (R$)
        <input
          type="number"
          min={view.artistMinAmount / 100}
          step="0.5"
          bind:value={amountReais}
        />
      </label>
      <label>
        Dedicatória (opcional)
        <input
          type="text"
          maxlength="200"
          bind:value={dedicatee}
          placeholder="Pra Maria do bar..."
        />
      </label>
    </div>

    {#if submitError}
      <div class="card error">{submitError}</div>
    {/if}
    {#if submitSuccess}
      <div class="card success"><strong>{submitSuccess}</strong></div>
    {/if}

    <button
      onclick={submit}
      disabled={!selectedItemId || submitting || amountReais * 100 < view.artistMinAmount}
    >
      {#if submitting}
        <span class="spinner"></span> Enviando…
      {:else}
        Pedir por {formatBRL(Math.round(amountReais * 100))}
      {/if}
    </button>
  {/if}
</div>
