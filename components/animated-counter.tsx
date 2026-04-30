"use client"

import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  label: string
}

export function AnimatedCounter({ end, suffix = "", duration = 2000, label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-bold text-white mb-2 ${isVisible ? 'animate-count-up' : 'opacity-0'}`}>
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </div>
  )
}
