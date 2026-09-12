import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const decodedUrl = decodeURIComponent(imageUrl);

    // Only allow HTTP/HTTPS URLs
    if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
      return new NextResponse('Invalid URL protocol', { status: 400 });
    }

    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      // Fallback: fetch via wsrv.nl proxy mirror if direct fetch fails
      const fallbackUrl = `https://wsrv.nl/?url=${encodeURIComponent(decodedUrl)}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const imageBuffer = await fallbackRes.arrayBuffer();
        const contentType = fallbackRes.headers.get('content-type') || 'image/png';

        return new NextResponse(imageBuffer, {
          headers: {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=604800, immutable',
          },
        });
      }
      return new NextResponse('Failed to fetch remote image', { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=604800, immutable',
      },
    });
  } catch (err) {
    console.error('Image proxy error:', err);
    return new NextResponse('Internal server error fetching image', { status: 500 });
  }
}
