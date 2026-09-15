import { pageMetadata } from '@/lib/seo'
import MCPPage from './mcp-page'

export const metadata = pageMetadata({
  title: 'MCP',
  description:
    'Use Nexvyn/UI from your AI editor. Connect the shadcn MCP server to search and install components by prompt.',
  path: '/mcp',
})

export default function Page() {
  return <MCPPage />
}
