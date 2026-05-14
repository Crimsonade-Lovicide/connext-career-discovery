"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

export function MagneticButton({ 
  href, 
  children, 
  className,
  variant = "default",
  size = "default"
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? "transform 0.3s ease-out" : "none",
      }}
    >
      <Button
        asChild
        size={size}
        variant={variant}
        className={cn(
          variant === "default" 
            ? "bg-[#2563EB] hover:bg-[#3B82F6] text-white glow-button relative overflow-hidden" 
            : "border-white/20 bg-white/5 hover:bg-white/10 text-white",
          className
        )}
      >
        <Link href={href}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Link>
      </Button>
    </div>
  )
}
