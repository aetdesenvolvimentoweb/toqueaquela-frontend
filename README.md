# Toque Aquela — frontend

PWA mobile-first em SvelteKit. 3 superfícies: espectador (`/show/[qr]`), palco (`/stage/*`).

## Stack

- **SvelteKit 2 + Svelte 5** (runes)
- **Vite** (dev + build)
- **TypeScript** strict
- **Cloudflare Pages** (produção)

Sem framework de CSS — vanilla com CSS variables (`src/app.css`).

## Rodando local

```bash
bun install
bun run dev
# → http://localhost:5173
# Espera backend em http://localhost:3000 (ver repo backend)
```

Credenciais demo (seed do backend dev): `demo@toqueaquela.app` / `demo123`.

## Configuração

`PUBLIC_API_URL` define o backend. Default: `http://localhost:3000`.

Para produção, configurar no dashboard Cloudflare Pages → Settings → Environment variables.

## Verificação

```bash
bun run check    # svelte-check + tsc strict
bun run build    # production build → .svelte-kit/cloudflare
```

## Deploy

### Pré-requisitos (uma única vez)

1. **Criar Pages project** no dashboard Cloudflare (associar ao repo `toqueaquela-frontend`).
2. **Configurar variável** `PUBLIC_API_URL` no Pages project (production environment).
3. **Adicionar secrets ao GitHub repo:**
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. **Adicionar variable ao GitHub repo:** `PUBLIC_API_URL` (settings → secrets and variables → actions → variables).

### Deploy automático

Push para `main` → CI roda `svelte-check`, build com `PUBLIC_API_URL` injetado, deploy via wrangler.

### Deploy manual

```bash
bun run build
bunx wrangler pages deploy .svelte-kit/cloudflare --project-name=toqueaquela-frontend
```

## Estrutura

```
src/
├── app.html         # template HTML
├── app.css          # design system mobile-first
├── lib/
│   ├── api.ts       # fetch wrapper com auth + idempotency
│   ├── auth.ts      # token em localStorage
│   └── format.ts    # formatBRL, formatDuration, newIdempotencyKey
└── routes/
    ├── +layout.svelte           # importa CSS global
    ├── +page.svelte             # redireciona p/ /stage/login
    ├── show/[qr]/+page.svelte   # espectador
    └── stage/
        ├── +layout.svelte       # auth guard client-side
        ├── login/
        ├── register/
        ├── +page.svelte         # dashboard
        ├── repertoire/
        └── show/[id]/           # fila + polling 3s
```

## Notas de UX importantes

- **Polling de 3s** na fila do palco (sem WebSocket por ora).
- **Auth guard client-side** — token vive em `localStorage`. Logout = `clearToken()`.
- **Mensagens de erro pt-BR**: mapeadas por `code` em cada handler de erro (não exibe códigos crus).
- **Sem Pix QR visível** após criar pedido — gateway mock auto-confirma. Quando integrar gateway real, exibir Pix QR retornado pelo backend.
