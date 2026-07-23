export function normalizeSearch(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getSearchParts(query: string): string[] {
  return normalizeSearch(query).split(' ').filter(Boolean)
}

export function matchesSearch(itemText: string, query: string): boolean {
  const parts = getSearchParts(query)
  if (!parts.length) return true
  const normalized = normalizeSearch(itemText)
  return parts.every((part) => normalized.includes(part))
}

export function buildSearchableText(
  label: string,
  description?: string,
  keywords?: string[],
): string {
  const parts = [label]
  if (description) parts.push(description)
  if (keywords?.length) parts.push(...keywords)
  return parts.join(' ')
}
