<script lang="ts">
  import { goto } from '$app/navigation';
  import { apiFetch, type ApiError } from '$lib/api';

  let displayName = $state('');
  let email = $state('');
  let password = $state('');
  let pixKey = $state('');
  let error = $state<string | null>(null);
  let loading = $state(false);

  async function submit(e: Event) {
    e.preventDefault();
    error = null;
    loading = true;
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: { displayName, email, password, pixKey, genres: [] },
      });
      goto('/stage/login');
    } catch (e) {
      const err = e as ApiError;
      error = err.code === 'email_already_taken'
        ? 'E-mail já cadastrado.'
        : `Erro: ${err.code}`;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container stack">
  <h1>Cadastrar artista</h1>
  <form onsubmit={submit} class="stack">
    <label>
      Nome artístico
      <input bind:value={displayName} maxlength="120" required />
    </label>
    <label>
      E-mail
      <input type="email" bind:value={email} maxlength="254" required autocomplete="email" />
    </label>
    <label>
      Senha (mínimo 8 caracteres)
      <input
        type="password"
        bind:value={password}
        minlength="8"
        maxlength="128"
        required
        autocomplete="new-password"
      />
    </label>
    <label>
      Chave Pix de recebimento
      <input bind:value={pixKey} maxlength="128" required />
    </label>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    <button type="submit" disabled={loading}>
      {#if loading}<span class="spinner"></span> Cadastrando…{:else}Cadastrar{/if}
    </button>
  </form>
  <a href="/stage/login" class="muted">Já tenho conta</a>
</div>
