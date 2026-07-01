import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message, component } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.warn(`[Feedback API Warning] DISCORD_WEBHOOK_URL is missing. Cannot send message: ${message}`)
      return NextResponse.json(
        { error: 'Discord webhook is not configured on the server.' },
        { status: 503 }
      )
    }

    const payload = {
      embeds: [
        {
          title: `Bug/Feedback Report: ${component}`,
          description: message,
          color: 0x7aa7c7,
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Nexvyn/UI feedback bot',
          },
        },
      ],
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to send to Discord.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
