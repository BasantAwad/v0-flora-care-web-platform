import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Leaf className="w-20 h-20 text-primary opacity-50" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! This plant page doesn't exist.</p>
        <Link href="/">
          <Button className="bg-primary hover:bg-accent text-primary-foreground">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
