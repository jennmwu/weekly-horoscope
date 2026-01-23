"use client"

import { useState } from "react"
import { SignSelection } from "@/components/sign-selection"
import { IntentSelection } from "@/components/intent-selection"
import { UncoverButton } from "@/components/uncover-button"
import { HoroscopeCard } from "@/components/horoscope-card"
import { CosmicBackground } from "@/components/cosmic-background"

type Screen = "sign" | "intent" | "uncover" | "result"
type Sign = "sagittarius" | "scorpio" | null
type Intent = string | null

export default function HoroscopePage() {
  const [screen, setScreen] = useState<Screen>("sign")
  const [selectedSign, setSelectedSign] = useState<Sign>(null)
  const [selectedIntent, setSelectedIntent] = useState<Intent>(null)
  const [curiosityNote, setCuriosityNote] = useState<string>("")
  const [isRevealing, setIsRevealing] = useState(false)

  const handleSignSelect = (sign: Sign) => {
    setSelectedSign(sign)
    setScreen("intent")
  }

  const handleIntentSelect = (intent: Intent) => {
    setSelectedIntent(intent)
    setScreen("uncover")
  }

  const handleUncover = () => {
    setIsRevealing(true)
    // Delay showing result to allow reveal animation
    setTimeout(() => {
      setScreen("result")
      setIsRevealing(false)
    }, 1800)
  }

  const handleReset = () => {
    setScreen("sign")
    setSelectedSign(null)
    setSelectedIntent(null)
    setCuriosityNote("")
  }

  return (
    <main className="cosmic-bg grain min-h-dvh flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cosmic background with stars */}
      <CosmicBackground />
      
      {/* Nebula mist overlay during reveal */}
      {isRevealing && (
        <div className="nebula-sweep fixed inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-3xl" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {screen === "sign" && (
          <SignSelection onSelect={handleSignSelect} />
        )}
        
        {screen === "intent" && (
          <IntentSelection 
            onSelect={handleIntentSelect}
            curiosityNote={curiosityNote}
            onCuriosityChange={setCuriosityNote}
          />
        )}
        
        {screen === "uncover" && (
          <UncoverButton onUncover={handleUncover} isRevealing={isRevealing} />
        )}
        
        {screen === "result" && (
          <HoroscopeCard 
            sign={selectedSign} 
            intent={selectedIntent}
            curiosityNote={curiosityNote}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  )
}
