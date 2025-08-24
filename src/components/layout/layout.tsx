import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}