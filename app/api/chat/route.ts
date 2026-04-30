import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are a helpful AI legal assistant for A.I. Esquire Legal. You help potential clients understand their legal options. You do not provide legal advice but help them understand when they should consult with one of our licensed attorneys. Be professional, empathetic, and concise. Always recommend scheduling a free consultation for specific legal questions.`

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { messages, systemPrompt } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      )
    }

    const openaiMessages = [
      { role: "system", content: systemPrompt || SYSTEM_PROMPT },
      ...messages
    ]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] OpenAI API error:", error)
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: response.status }
      )
    }

    // Stream the response back to the client
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n").filter(line => line.trim() !== "")

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6)
                if (data === "[DONE]") {
                  controller.close()
                  return
                }

                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    controller.enqueue(encoder.encode(content))
                  }
                } catch {
                  // Skip invalid JSON chunks
                }
              }
            }
          }
        } catch (error) {
          console.error("[v0] Stream error:", error)
          controller.error(error)
        } finally {
          reader.releaseLock()
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
