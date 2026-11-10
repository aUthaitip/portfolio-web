/** Read localized text or Portable Text in Studio previews without assuming a shape. */
export function extractPreviewText(value: unknown): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  if (Array.isArray(value)) {
    const first: unknown = value[0]
    if (!first || typeof first !== 'object') return ''
    if ('children' in first && Array.isArray(first.children)) {
      return first.children.map((child: unknown) => child && typeof child === 'object' && 'text' in child && typeof child.text === 'string' ? child.text : '').join('')
    }
    return 'text' in first && typeof first.text === 'string' ? first.text : ''
  }
  const record = value as { en?: unknown; th?: unknown }
  return extractPreviewText(record.en || record.th)
}
