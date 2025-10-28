"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, LogOut, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/identify", label: "Identify" },
    { href: "/diagnose", label: "Diagnose" },
    { href: "/forum", label: "Community" },
    { href: "/my-garden", label: "Garden" },
    { href: "/games", label: "Games" },
    { href: "/achievements", label: "Achievements" },
    { href: "/finder", label: "Stores" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Enhanced with better styling */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-2xl text-primary hover:text-accent transition-colors duration-200 flex-shrink-0"
          >
            <div className="bg-primary/10 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="hidden sm:inline">FloraCare</span>
          </Link>

          {/* Desktop Navigation - Improved styling with active states */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Better spacing and styling */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && !isLoading && (
              <>
                {user ? (
                  <>
                    <Link href="/profile">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-foreground hover:text-primary hover:bg-secondary font-medium"
                      >
                        {user.username || user.email}
                      </Button>
                    </Link>
                    <div className="w-px h-6 bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="font-medium">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="bg-primary hover:bg-accent text-primary-foreground font-medium">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button - Better styling */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced with better styling */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 flex-col border-t border-border">
              {mounted && !isLoading && (
                <>
                  {user ? (
                    <>
                      <Link href="/profile" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start font-medium">
                          {user.username || user.email}
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 font-medium"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start font-medium">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button
                          size="sm"
                          className="w-full justify-start bg-primary hover:bg-accent text-primary-foreground font-medium"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
