"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  gradient?: boolean
}

export function AnimatedText({ text, className, delay = 0, gradient = false }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const words = text.split(" ")

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <span
            className={cn(
              "inline-block transition-all duration-700 ease-out",
              gradient && "gradient-text-animated",
              isVisible 
                ? "translate-y-0 opacity-100" 
                : "translate-y-full opacity-0"
            )}
            style={{ 
              transitionDelay: `${delay + i * 80}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypewriterText({ text, className, speed = 50, delay = 0 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setIsStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isStarted])

  useEffect(() => {
    if (!isStarted) return

    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index >= text.length) {
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isStarted, text, speed, delay])

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface CountUpTextProps {
  end: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function CountUpText({ 
  end, 
  suffix = "", 
  prefix = "",
  className,
  duration = 2000 
}: CountUpTextProps) {
  const [count, setCount] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setIsStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isStarted])

  useEffect(() => {
    if (!isStarted) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out-expo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const current = Math.floor(startValue + (end - startValue) * easeOutExpo)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isStarted, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
