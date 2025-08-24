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
    <div className={cn("relative w-full h-64 overflow-hidden rounded-lg", className)}>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
      <div className="relative h-full flex flex-col justify-center px-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}