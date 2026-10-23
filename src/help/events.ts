const OPEN_REQUEST = 'help:open';

export function requestHelp(): void {
  window.dispatchEvent(new Event(OPEN_REQUEST));
}

export function onHelpRequest(handler: () => void): () => void {
  window.addEventListener(OPEN_REQUEST, handler);

  return () => window.removeEventListener(OPEN_REQUEST, handler);
}
