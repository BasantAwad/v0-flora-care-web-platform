"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Mail, Award, LogOut } from "lucide-react"

interface UserProfile {
  username: string
  email: string
  id: number
  points: number
  badges: string[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ username: "", email: "" })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setFormData({ username: parsed.username, email: parsed.email })
    }
  }, [])

  const handleSave = () => {
    if (user) {
      const updated = { ...user, ...formData }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view your profile</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Username</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-primary hover:bg-accent text-primary-foreground">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium text-foreground">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{user.points}</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-accent" />
                  <p className="text-sm text-muted-foreground">Badges</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{user.badges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button onClick={handleLogout} variant="destructive" className="w-full flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
