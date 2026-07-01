import { cn } from '@/lib/utils'

function highlightCode(code: string) {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 1. Strings
  html = html.replace(/("(?:\\"|[^"])*")/g, '<span class="code-string">$1</span>')
  html = html.replace(/('(?:\\'|[^'])*')/g, '<span class="code-string">$1</span>')

  // 2. Keywords
  const keywords = ['const', 'let', 'var', 'return', 'import', 'from', 'export', 'default', 'function', 'true', 'false', 'type', 'interface', 'as', 'async', 'await']
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g')
    html = html.replace(reg, '<span class="code-keyword">$1</span>')
  })

  // 3. Components & Tags
  html = html.replace(/(&lt;\/?[A-Z][a-zA-Z0-9]*)/g, '<span class="code-tag">$1</span>')
  html = html.replace(/(&lt;\/?[a-z]+)/g, '<span class="code-tag">$1</span>')

  // 4. Attributes
  const attrs = ['className', 'key', 'style', 'onClick', 'type', 'ref', 'value', 'onChange', 'href', 'target', 'rel']
  attrs.forEach(attr => {
    const reg = new RegExp(`\\b(${attr})\\b`, 'g')
    html = html.replace(reg, '<span class="code-attr">$1</span>')
  })

  // 5. Comments
  html = html.replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')

  return html
}

type CodeBlockProps = {
  children: string
  variant?: 'usage' | 'install'
  className?: string
}

export function CodeBlock({ children, variant = 'usage', className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'detail-code-block overflow-x-auto font-mono leading-relaxed select-text',
        variant === 'install' ? 'detail-code-install text-xs' : 'detail-code-usage text-[13.5px]',
        className,
      )}
    >
      <code dangerouslySetInnerHTML={{ __html: highlightCode(children) }} />
    </pre>
  )
}
