import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ReactNode, useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
}