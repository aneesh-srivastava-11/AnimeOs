import { toPng } from 'html-to-image';

/**
 * Downloads an HTML element as a crisp PNG image.
 */
export async function downloadCardAsPng(
  node: HTMLElement,
  filename: string = 'AnimeOS_Card.png'
): Promise<string> {
  try {
    // Wait briefly for images and fonts to settle
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2, // crisp high DPI rendering
      cacheBust: true,
      filter: (domNode: HTMLElement) => {
        if (domNode.classList?.contains('no-export')) {
          return false;
        }
        return true;
      },
    });

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return dataUrl;
  } catch (err) {
    console.error('Error downloading card as PNG:', err);
    throw new Error('Failed to generate image download. Please try again.');
  }
}

/**
 * Copies card image blob or data URL to clipboard if supported.
 */
export async function copyCardImageToClipboard(node: HTMLElement): Promise<boolean> {
  try {
    const dataUrl = await toPng(node, { quality: 0.95, pixelRatio: 2 });
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to copy card image to clipboard:', err);
    return false;
  }
}
