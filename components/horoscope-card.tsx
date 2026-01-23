"use client"

import { motion } from "framer-motion"

interface HoroscopeCardProps {
  sign: "sagittarius" | "scorpio" | null
  intent: string | null
  curiosityNote?: string
  onReset: () => void
}

const horoscopes = {
  sagittarius: {
    reading: "The morning light carries a quiet invitation today. Something you've been holding loosely is ready to be held a little closer, or released entirely. Trust the feeling that arrives without explanation. Your intuition is speaking in its softest voice — lean in to hear it.",
    suggestions: [
      "Send that message you've been composing in your head",
      "Take the longer route home",
    ],
  },
  scorpio: {
    reading: "There's a gentle undercurrent moving beneath the surface of today. What feels like stillness is actually preparation. The universe is rearranging something on your behalf, even if you can't see it yet. Let yourself be carried by the rhythm you can't quite name.",
    suggestions: [
      "Write down the thought that keeps returning",
      "Leave space for an unexpected conversation",
    ],
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: "blur(8px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export function HoroscopeCard({ sign, onReset }: HoroscopeCardProps) {
  const content = sign ? horoscopes[sign] : horoscopes.sagittarius
  const signName = sign === "sagittarius" ? "Sagittarius" : "Scorpio"
  const signSymbol = sign === "sagittarius" ? "\u2650" : "\u264F"

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-card/70 backdrop-blur-md rounded-3xl border border-border/30 p-8 shadow-2xl shadow-accent/5"
        variants={itemVariants}
      >
        {/* Sign header */}
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <span className="text-3xl opacity-60">{signSymbol}</span>
          <h2 className="cosmic-heading font-serif text-foreground text-xl font-semibold mt-2 tracking-wide">
            {signName}
          </h2>
          <p className="font-sans text-muted-foreground/60 text-xs uppercase tracking-widest mt-1">
            Today's Reading
          </p>
        </motion.div>
        
        {/* Horoscope reading */}
        <motion.p 
          className="font-serif text-foreground/90 text-lg leading-relaxed tracking-wide"
          variants={itemVariants}
        >
          {content.reading}
        </motion.p>
        
        {/* Divider with star */}
        <motion.div 
          className="flex items-center justify-center my-8"
          variants={itemVariants}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <span className="mx-4 text-accent/60 text-sm">&#10022;</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </motion.div>
        
        {/* Today section */}
        <motion.div variants={itemVariants}>
          <p className="font-sans text-muted-foreground text-xs uppercase tracking-widest mb-4">
            Today
          </p>
          <ul className="space-y-3">
            {content.suggestions.map((suggestion, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-3 text-foreground/80 font-sans text-sm leading-relaxed"
                variants={itemVariants}
              >
                <span className="text-accent/50 text-xs mt-1.5">&#10038;</span>
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      
      {/* Reset button */}
      <motion.div 
        className="text-center mt-10"
        variants={itemVariants}
      >
        <button
          onClick={onReset}
          className="font-sans text-muted-foreground/50 text-xs tracking-widest uppercase hover:text-muted-foreground/80 transition-colors duration-500"
        >
          begin again
        </button>
      </motion.div>
    </motion.div>
  )
}
