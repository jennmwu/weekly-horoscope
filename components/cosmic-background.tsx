"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
}

export function CosmicBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random stars
    const generatedStars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 3,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <>
      {/* Layered gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] via-[#1a1a2e] to-[#0d0d1a]" />
        
        {/* Purple haze in corners */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-[#2d1f3d]/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[#1f1a3d]/25 to-transparent blur-3xl" />
        
        {/* Soft pink haze */}
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-radial from-[#3d2d3d]/15 to-transparent blur-3xl" />
      </div>
      
      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-foreground/80"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
