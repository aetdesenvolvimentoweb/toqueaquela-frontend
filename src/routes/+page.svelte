<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  onMount(() => {
    goto('/stage/login');
  });
</script>

<div class="container">
  <p class="muted">Redirecionando…</p>
</div>
