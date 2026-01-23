"use client"

interface SignSelectionProps {
  onSelect: (sign: "sagittarius" | "scorpio") => void
}

export function SignSelection({ onSelect }: SignSelectionProps) {
  return (
    <div className="animate-fade-in-up text-center">
      <h1 className="cosmic-heading font-serif text-foreground text-2xl md:text-3xl font-semibold mb-6 tracking-wide">
        Jenn & Cay's Weekly Reading
      </h1>
      <p className="font-sans text-foreground/80 text-lg mb-10 tracking-wide">
        Whose horoscope are we uncovering today?
      </p>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={() => onSelect("sagittarius")}
          className="cosmic-button w-full py-5 px-8 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border/40 text-foreground font-sans text-base font-medium tracking-wide hover:bg-secondary/80 hover:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-500"
        >
          <span className="mr-3 text-xl opacity-70">&#9808;</span>
          Sagittarius
        </button>
        
        <button
          onClick={() => onSelect("scorpio")}
          className="cosmic-button w-full py-5 px-8 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border/40 text-foreground font-sans text-base font-medium tracking-wide hover:bg-secondary/80 hover:border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all duration-500"
        >
          <span className="mr-3 text-xl opacity-70">&#9807;</span>
          Scorpio
        </button>
      </div>
    </div>
  )
}
