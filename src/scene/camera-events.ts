const OVERVIEW_REQUEST = 'scene:overview';

export function requestOverview(): void {
  window.dispatchEvent(new Event(OVERVIEW_REQUEST));
}

export function onOverviewRequest(handler: () => void): () => void {
  window.addEventListener(OVERVIEW_REQUEST, handler);

  return () => window.removeEventListener(OVERVIEW_REQUEST, handler);
}
