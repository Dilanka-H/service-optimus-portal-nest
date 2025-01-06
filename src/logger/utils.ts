export function normalizeHeader(
    header: string | string[] | undefined
  ): string | Record<string, string> {
    if (Array.isArray(header)) {
      return header[0];
    } else if (typeof header === 'object' && header !== null) {
      return header;
    } else {
      return header || '';
    }
  }

export function normalizeHeaderForMetrics(
    header: string | string[] | undefined
  ): string {
    if (Array.isArray(header)) {
      return header[0];
    } else if (typeof header === 'string' && header !== null) {
      return header;
    } else {
      return JSON.stringify(header || '');
    }
  }
  