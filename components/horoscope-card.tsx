"use client"

import { motion } from "framer-motion"

interface HoroscopeCardProps {
  sign: "sagittarius" | "scorpio" | null
  intent: "shaping" | "air" | "asking" | null
  curiosityNote?: string
  weeklyText?: string | null
  apiError?: string | null
  onReset: () => void
}

const fallbackReadings = {
  sagittarius:
    "The morning light carries a quiet invitation this week. Something you've been holding loosely is ready to be held a little closer, or released entirely. Trust the feeling that arrives without explanation. Your intuition is speaking in its softest voice. Lean in to hear it.\n\nThis week\n- Notice what makes you exhale. Do more of that.\n- Send that message you've been composing in your head.\n- Take the longer route home at least once.",
  scorpio:
    "There's a gentle undercurrent moving beneath the surface of this week. What feels like stillness is actually preparation. Something is rearranging on your behalf, even if you can't see it yet. Let yourself be carried by the rhythm you can't quite name.\n\nThis week\n- Write down the thought that keeps returning.\n- Leave space for an unexpected conversation.\n- Pay attention to what irritates you. It's pointing at something you care about.",
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

export function HoroscopeCard({
  sign,
  intent,
  curiosityNote,
  weeklyText,
  apiError,
  onReset,
}: HoroscopeCardProps) {
  const signName = sign === "sagittarius" ? "Sagittarius" : "Scorpio"
  const signSymbol = sign === "sagittarius" ? "\u2650" : "\u264F"

  const intentLabel =
    intent === "shaping"
      ? "What's shaping my week"
      : intent === "air"
      ? "What's in the air this week"
      : intent === "asking"
      ? "What's this week asking of me"
      : null

  const displayedText =
    weeklyText ?? fallbackReadings[sign ?? "sagittarius"]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div
        className="bg-card/70 backdrop-blur-md rounded-3xl border border-border/30 p-8 shadow-2xl shadow-accent/5"
        variants={itemVariants}
      >
        {/* Sign header */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <span className="text-3xl opacity-60">{signSymbol}</span>
          <h2 className="cosmic-heading font-serif text-foreground text-xl font-semibold mt-2 tracking-wide">
            {signName}
          </h2>
          <p className="font-sans text-muted-foreground/60 text-xs uppercase tracking-widest mt-1">
            This Week's Reading
          </p>

          {intentLabel && (
            <p className="mt-2 font-sans text-foreground/70 text-xs tracking-wide">
              {intentLabel}
            </p>
          )}

          {curiosityNote && curiosityNote.trim().length > 0 && (
            <p className="mt-3 font-sans text-muted-foreground/70 text-xs leading-relaxed">
              <span className="uppercase tracking-widest text-[10px] text-muted-foreground/60">
                What's on your mind:
              </span>{" "}
              {curiosityNote.trim()}
            </p>
          )}
        </motion.div>

        {/* Error state */}
        {apiError && (
          <motion.div
            className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4"
            variants={itemVariants}
          >
            <p className="font-sans text-sm text-foreground/90 leading-relaxed">
              Something went a little sideways while asking the stars.
            </p>
            <p className="mt-2 font-sans text-xs text-muted-foreground/80 leading-relaxed">
              {apiError}
            </p>
            <p className="mt-3 font-sans text-xs text-muted-foreground/80 leading-relaxed">
              Try again in a moment, or tap <span className="text-foreground/80">begin again</span>.
            </p>
          </motion.div>
        )}

        {/* Weekly reading */}
        {!apiError && (
          <motion.div
            className="font-serif text-foreground/90 text-base leading-relaxed tracking-wide whitespace-pre-wrap"
            variants={itemVariants}
          >
            {displayedText}
          </motion.div>
        )}
      </motion.div>

      {/* Reset button */}
      <motion.div className="text-center mt-10" variants={itemVariants}>
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
