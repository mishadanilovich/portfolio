const OPEN_REQUEST = 'intercom:open';

export function requestIntercom(): void {
  window.dispatchEvent(new Event(OPEN_REQUEST));
}

export function onIntercomRequest(handler: () => void): () => void {
  window.addEventListener(OPEN_REQUEST, handler);

  return () => window.removeEventListener(OPEN_REQUEST, handler);
}
