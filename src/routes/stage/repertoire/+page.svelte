<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { apiFetch, type ApiError } from '$lib/api';
  import { clearToken } from '$lib/auth';
  import { formatDuration } from '$lib/format';

  type Item = {
    id: string;
    title: string;
    originalArtist: string;
    durationSeconds: number | null;
  };

  let items = $state<Item[]>([]);
  let loading = $state(true);
  let loadError = $state<string | null>(null);

  let newTitle = $state('');
  let newOriginalArtist = $state('');
  let newDurationMin = $state<number | null>(null);
  let adding = $state(false);
  let addError = $state<string | null>(null);

  onMount(load);

  async function load() {
    try {
      const res = await apiFetch<{ items: Item[] }>('/artist/repertoire', { auth: true });
      items = res.items;
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        clearToken();
        goto('/stage/login');
        return;
      }
      loadError = err.code;
    } finally {
      loading = false;
    }
  }

  async function addItem(e: Event) {
    e.preventDefault();
    addError = null;
    adding = true;
    try {
      await apiFetch('/artist/repertoire', {
        method: 'POST',
        auth: true,
        body: {
          title: newTitle,
          originalArtist: newOriginalArtist,
          durationSeconds: newDurationMin != null ? Math.round(newDurationMin * 60) : null,
        },
      });
      newTitle = '';
      newOriginalArtist = '';
      newDurationMin = null;
      await load();
    } catch (e) {
      addError = (e as ApiError).code;
    } finally {
      adding = false;
    }
  }
</script>

<div class="container stack">
  <div class="row">
    <h1>Repertório</h1>
    <a href="/stage" class="right">← voltar</a>
  </div>

  <form onsubmit={addItem} class="card stack">
    <h2>Adicionar música</h2>
    <label>
      Título
      <input bind:value={newTitle} maxlength="200" required />
    </label>
    <label>
      Artista original
      <input bind:value={newOriginalArtist} maxlength="200" required />
    </label>
    <label>
      Duração (minutos, opcional)
      <input
        type="number"
        min="0.5"
        step="0.5"
        bind:value={newDurationMin}
        placeholder="3.5"
      />
    </label>
    {#if addError}
      <div class="error">Erro: {addError}</div>
    {/if}
    <button type="submit" disabled={adding}>
      {#if adding}<span class="spinner"></span> Adicionando…{:else}Adicionar{/if}
    </button>
  </form>

  <div class="stack">
    {#if loading}
      <div class="card"><span class="spinner"></span> Carregando…</div>
    {:else if loadError}
      <div class="card error">{loadError}</div>
    {:else if items.length === 0}
      <div class="card muted">Nenhuma música ainda.</div>
    {:else}
      {#each items as item (item.id)}
        <div class="card">
          <div><strong>{item.title}</strong></div>
          <div class="muted">
            {item.originalArtist}
            {#if item.durationSeconds}— {formatDuration(item.durationSeconds)}{/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
