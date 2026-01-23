"use client"

import { Textarea } from "@/components/ui/textarea"

interface IntentSelectionProps {
  onSelect: (intent: string) => void
  curiosityNote: string
  onCuriosityChange: (note: string) => void
}

const intents = [
  "What's shaping the week",
  "What's in the air this week?",
  "What's this week asking of me?",
]

export function IntentSelection({ onSelect, curiosityNote, onCuriosityChange }: IntentSelectionProps) {
  const maxChars = 200

  return (
    <div className="animate-fade-in-up text-center">
      <p className="font-sans text-foreground/80 text-lg mb-8 tracking-wide">
        What are you curious about?
      </p>
      
      <div className="flex flex-col gap-3 mb-8">
        {intents.map((intent, index) => (
          <button
            key={index}
            onClick={() => onSelect(intent)}
            className="cosmic-button w-full py-4 px-6 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/30 text-foreground font-sans text-sm font-medium tracking-wide hover:bg-secondary/70 hover:border-accent/25 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {intent}
          </button>
        ))}
      </div>
      
      {/* Anything else? */}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5">
        <label className="block text-left mb-3">
          <span className="font-sans text-foreground/70 text-xs uppercase tracking-widest">
            Anything else?
          </span>
        </label>
        <Textarea
          value={curiosityNote}
          onChange={(e) => onCuriosityChange(e.target.value.slice(0, maxChars))}
          placeholder="A person, a decision, a feeling..."
          className="w-full min-h-[80px] bg-secondary/30 border-border/20 text-foreground/90 placeholder:text-muted-foreground/40 font-sans text-sm resize-none focus:border-accent/40 focus:ring-accent/20 rounded-xl"
        />
        <div className="flex items-center justify-between mt-3">
          <p className="font-sans text-muted-foreground/40 text-xs">
            {curiosityNote.length}/{maxChars}
          </p>
          {curiosityNote.trim().length > 0 && (
            <button
              onClick={() => onSelect(curiosityNote)}
              className="cosmic-button py-2 px-5 rounded-xl bg-primary/80 text-primary-foreground font-sans text-sm font-medium tracking-wide hover:bg-primary hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-300"
            >
              Enter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
