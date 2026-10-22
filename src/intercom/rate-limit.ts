const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

const hits = new Map<string, number[]>();

export function allow(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW);

  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  for (const [other, stamps] of hits) {
    if (stamps.every((at) => now - at >= WINDOW)) hits.delete(other);
  }

  return true;
}

export function reset(): void {
  hits.clear();
}
