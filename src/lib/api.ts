import { getToken } from './auth';

// PUBLIC_API_URL e' exposto ao client via SvelteKit. Default = backend dev local.
const API_BASE: string =
  (import.meta.env.PUBLIC_API_URL as string | undefined) ?? 'http://localhost:3000';

export type ApiError = { code: string; status: number };

type FetchOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
  auth?: boolean;
  idempotencyKey?: string;
};

export async function apiFetch<T = unknown>(
  path: string,
  opts: FetchOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['content-type'] = 'application/json';
  if (opts.auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  if (opts.idempotencyKey) headers['idempotency-key'] = opts.idempotencyKey;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    let code = 'unknown_error';
    try {
      const data = await res.json();
      const errCode = (data as { error?: { code?: unknown } })?.error?.code;
      if (typeof errCode === 'string') code = errCode;
    } catch {
      // sem body json — codigo fica como unknown_error
    }
    throw { code, status: res.status } satisfies ApiError;
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
