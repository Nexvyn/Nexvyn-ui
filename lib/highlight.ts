export function highlightCode(code: string): string {
  if (!code) return ''

  let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const comments: string[] = []
  html = html.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, (match) => {
    comments.push(match)
    return `__COMMENT_PLACEHOLDER_${comments.length - 1}__`
  })

  const strings: string[] = []
  html = html.replace(/(["'`])([\s\S]*?)\1/g, (match) => {
    strings.push(match)
    return `__STRING_PLACEHOLDER_${strings.length - 1}__`
  })

  const keywords =
    /\b(const|let|var|function|return|import|export|from|default|as|true|false|null|undefined|if|else|for|while|switch|case|break|class|extends|new|this|type|interface)\b/g
  html = html.replace(keywords, '<span class="token-keyword">$1</span>')

  html = html.replace(
    /(&lt;\/?[A-Z][a-zA-Z0-9_-]*|&lt;\/?[a-z][a-zA-Z0-9_-]*)/g,
    '<span class="token-tag">$1</span>',
  )
  html = html.replace(/(\/?&gt;)/g, '<span class="token-tag">$1</span>')

  html = html.replace(
    /\b(className|style|id|onClick|type|variant|size)\b=/g,
    '<span class="token-attr">$1</span>=',
  )

  html = html.replace(/__STRING_PLACEHOLDER_(\d+)__/g, (_, index) => {
    const original = strings[parseInt(index, 10)]
    return `<span class="token-string">${original}</span>`
  })

  html = html.replace(/__COMMENT_PLACEHOLDER_(\d+)__/g, (_, index) => {
    const original = comments[parseInt(index, 10)]
    return `<span class="token-comment">${original}</span>`
  })

  return html
}
