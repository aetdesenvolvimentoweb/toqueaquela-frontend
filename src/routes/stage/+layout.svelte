<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { isLoggedIn } from '$lib/auth';

  const PUBLIC_ROUTES = ['/stage/login', '/stage/register'];

  let checked = $state(false);
  let { children } = $props();

  onMount(() => {
    const path = page.url.pathname;
    if (PUBLIC_ROUTES.includes(path)) {
      checked = true;
      return;
    }
    if (!isLoggedIn()) {
      goto('/stage/login');
      return;
    }
    checked = true;
  });
</script>

{#if checked}
  {@render children()}
{:else}
  <div class="container">
    <p class="muted"><span class="spinner"></span> Verificando sessão…</p>
  </div>
{/if}
