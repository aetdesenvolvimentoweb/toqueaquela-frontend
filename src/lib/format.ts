export const formatBRL = (cents: number): string =>
  `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;

export const formatDuration = (seconds: number | null): string => {
  if (seconds == null) return '';
  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export const newIdempotencyKey = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
