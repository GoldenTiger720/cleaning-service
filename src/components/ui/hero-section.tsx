import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  description?: string
  imageUrl: string
  imageAlt: string
  className?: string
  children?: React.ReactNode
}

export function HeroSection({ 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
  className,
  children 
}: HeroSectionProps) {
  return (
    <div className={cn("relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg", className)}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 sm:from-background/90 to-background/70 sm:to-background/50" />
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">{title}</h1>
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl line-clamp-2 sm:line-clamp-none">{description}</p>
        )}
        {children && (
          <div className="mt-3 sm:mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}