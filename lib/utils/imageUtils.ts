/**
 * Image utilities for handling CDN hotlink restrictions, proxying, and fallbacks.
 */

/**
 * Returns an ordered array of candidate image URLs to attempt when loading images.
 * Priority:
 * 1. Local Same-Origin Proxy (`/api/proxy-image?url=...`) - Solves CORS for html-to-image download & referrer blocks
 * 2. Direct URL
 * 3. High-availability external image proxy (wsrv.nl)
 */
export function getImageCandidates(primarySrc?: string | null): string[] {
  if (!primarySrc || typeof primarySrc !== 'string') return [];

  const trimmed = primarySrc.trim();
  if (!trimmed) return [];

  // If already relative / proxy / data URL, return direct
  if (trimmed.startsWith('/') || trimmed.startsWith('data:')) {
    return [trimmed];
  }

  const candidates: string[] = [];

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    // 1. Same-origin server proxy (bypasses CORS and referrer blocking completely for browser & html-to-image card downloads)
    candidates.push(`/api/proxy-image?url=${encodeURIComponent(trimmed)}`);
    // 2. Direct URL fallback
    candidates.push(trimmed);
    // 3. High-availability external proxy
    candidates.push(`https://wsrv.nl/?url=${encodeURIComponent(trimmed)}`);
  } else {
    candidates.push(trimmed);
  }

  return candidates;
}

/**
 * Helper to convert an image URL to a base64 Data URL (useful for canvas / html-to-image export)
 */
export async function urlToBase64(url: string): Promise<string> {
  try {
    const proxyUrl = url.startsWith('/') ? url : `/api/proxy-image?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error('Failed to convert image to Base64:', err);
    return url;
  }
}
