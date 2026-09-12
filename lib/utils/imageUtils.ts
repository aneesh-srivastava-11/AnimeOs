/**
 * Image utilities for handling CDN hotlink restrictions, proxying, and fallbacks.
 */

/**
 * Returns an ordered array of candidate image URLs to attempt when loading images.
 * Priority:
 * 1. Direct URL (with referrerPolicy="no-referrer")
 * 2. High-availability image proxy (wsrv.nl / weserv)
 * 3. Additional fallback image proxy
 */
export function getImageCandidates(primarySrc?: string | null): string[] {
  if (!primarySrc || typeof primarySrc !== 'string') return [];

  const trimmed = primarySrc.trim();
  if (!trimmed) return [];

  const candidates: string[] = [trimmed];

  // If it's a remote http/https URL, add proxy mirrors as fallbacks
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    // wsrv.nl image cache & proxy (strips referrer, adds CORS headers, caches high quality)
    const encoded = encodeURIComponent(trimmed);
    candidates.push(`https://wsrv.nl/?url=${encoded}&output=webp`);
    candidates.push(`https://images.weserv.nl/?url=${encoded}`);
  }

  return candidates;
}
