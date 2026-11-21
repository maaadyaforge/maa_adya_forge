import { ASSETS } from '../data/catalog';
import { isValidPdfBuffer } from './inquiry';

export type BrochureKind = 'main' | 'castables';

const BROCHURE_CONFIG: Record<
  BrochureKind,
  { apiPath: string; fallbackPath: string; filename: string }
> = {
  main: {
    apiPath: '/api/brochure/main',
    fallbackPath: ASSETS.brochurePdf,
    filename: 'MAA-Adya-Forge-Brochure.pdf',
  },
  castables: {
    apiPath: '/api/brochure/castables',
    fallbackPath: ASSETS.castablesPdf,
    filename: 'Maa-Adya-Forge-Castables-Product-Data-Book.pdf',
  },
};

async function fetchVerifiedPdfBytes(url: string): Promise<Uint8Array | null> {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { Accept: 'application/pdf' },
  });
  if (!response.ok) return null;
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return isValidPdfBuffer(bytes) ? bytes : null;
}

export async function downloadBrochurePdf(kind: BrochureKind): Promise<boolean> {
  const config = BROCHURE_CONFIG[kind];
  try {
    let bytes = await fetchVerifiedPdfBytes(config.apiPath);
    if (!bytes) {
      bytes = await fetchVerifiedPdfBytes(config.fallbackPath);
    }
    if (!bytes) {
      return false;
    }

    const pdfBlob = new Blob([bytes.buffer as ArrayBuffer], {
      type: 'application/pdf',
    });
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = config.filename;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Keep the object URL alive long enough for large multi-MB PDFs to finish saving
    window.setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 60_000);

    return true;
  } catch {
    return false;
  }
}
