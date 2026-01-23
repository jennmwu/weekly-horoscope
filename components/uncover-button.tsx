"use client"

import { useState, useEffect } from "react"

interface UncoverButtonProps {
  onUncover: () => void
  isRevealing: boolean
}

export function UncoverButton({ onUncover, isRevealing }: UncoverButtonProps) {
  const [showNebula, setShowNebula] = useState(false)
  const [showOrb, setShowOrb] = useState(false)

  useEffect(() => {
    if (isRevealing) {
      // Show orb pulse
      setShowOrb(true)
      
      // Show nebula sweep after orb starts
      const nebulaTimer = setTimeout(() => {
        setShowNebula(true)
      }, 400)
      
      return () => {
        clearTimeout(nebulaTimer)
      }
    }
  }, [isRevealing])

  return (
    <div className="animate-fade-in-up text-center relative">
      <p className="font-serif text-foreground/70 text-base mb-10 tracking-wide italic">
        The stars have aligned for this moment...
      </p>
      
      <div className="relative inline-flex items-center justify-center">
        {/* Outer glow rings - always visible when idle */}
        {!isRevealing && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse scale-150" />
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl animate-pulse scale-[2]" style={{ animationDelay: "0.5s" }} />
          </>
        )}
        
        {/* Orb pulse on reveal */}
        {showOrb && (
          <div className="absolute inset-0 rounded-full bg-primary/60 orb-pulse" />
        )}
        
        {/* Main button */}
        <button
          onClick={onUncover}
          disabled={isRevealing}
          className={`
            relative z-10 cosmic-button py-5 px-10 rounded-full 
            font-sans text-base font-medium tracking-wide
            focus:outline-none transition-all duration-500
            ${isRevealing 
              ? "bg-primary/80 text-primary-foreground scale-95 opacity-0" 
              : "bg-primary/90 text-primary-foreground hover:bg-primary animate-gentle-glow"
            }
          `}
        >
          Uncover today's horoscope
        </button>
      </div>
      
      {/* Nebula sweep overlay */}
      {showNebula && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none nebula-sweep"
          style={{
            background: "radial-gradient(ellipse at center, rgba(196, 181, 224, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
          }}
        />
      )}
    </div>
  )
}
