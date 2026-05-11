<script lang="ts">
  import { goto } from '$app/navigation';
  import { apiFetch, type ApiError } from '$lib/api';
  import { setToken } from '$lib/auth';

  let email = $state('demo@toqueaquela.app');
  let password = $state('demo123');
  let error = $state<string | null>(null);
  let loading = $state(false);

  async function submit(e: Event) {
    e.preventDefault();
    error = null;
    loading = true;
    try {
      const res = await apiFetch<{ token: string; expiresInSeconds: number }>(
        '/auth/login',
        { method: 'POST', body: { email, password } },
      );
      setToken(res.token);
      goto('/stage');
    } catch (e) {
      const err = e as ApiError;
      error = err.code === 'invalid_credentials'
        ? 'E-mail ou senha incorretos.'
        : `Erro: ${err.code}`;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container stack">
  <h1>Entrar</h1>
  <form onsubmit={submit} class="stack">
    <label>
      E-mail
      <input type="email" bind:value={email} required autocomplete="email" />
    </label>
    <label>
      Senha
      <input type="password" bind:value={password} required autocomplete="current-password" />
    </label>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    <button type="submit" disabled={loading}>
      {#if loading}<span class="spinner"></span> Entrando…{:else}Entrar{/if}
    </button>
  </form>
  <a href="/stage/register" class="muted">Cadastrar artista</a>
</div>
