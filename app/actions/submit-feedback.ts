"use server"

export async function submitFeedback(feedback: string) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
        console.error("DISCORD_WEBHOOK_URL is not defined")
        return { success: false, error: "Configuration error. Please contact support." }
    }

    if (!feedback.trim()) {
        return { success: false, error: "Feedback cannot be empty." }
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `**New Feedback Received:**\n${feedback}`,
            }),
        })

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.statusText}`)
        }

        return { success: true }
    } catch (error) {
        console.error("Failed to submit feedback:", error)
        return { success: false, error: "Failed to submit feedback. Please try again." }
    }
}
