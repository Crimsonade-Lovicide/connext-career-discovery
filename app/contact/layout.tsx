import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | A.I. Esquire Legal",
  description: "Get in touch with A.I. Esquire Legal for a free consultation. AI-enhanced legal representation from a Connecticut-licensed attorney and a nationwide network.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
