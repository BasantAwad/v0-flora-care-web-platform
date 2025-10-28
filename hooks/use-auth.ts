"use client"

import { useEffect, useState } from "react"

export interface User {
  id: number
  email: string
  username?: string
  points?: number
  badges?: string[]
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  return { user, isLoading, logout }
}
