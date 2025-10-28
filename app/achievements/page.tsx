"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Trophy, Star, Leaf } from "lucide-react"

interface UserData {
  username: string
  email: string
  points: number
  badges: string[]
  plants: any[]
}

export default function AchievementsPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [badges, setBadges] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)

      // Define all available badges
      const allBadges = [
        {
          id: "first-plant",
          name: "Green Thumb",
          description: "Add your first plant to the garden",
          icon: "🌱",
          earned: (parsed.plants?.length || 0) > 0,
          earnedDate: parsed.firstPlantDate,
        },
        {
          id: "five-plants",
          name: "Plant Parent",
          description: "Manage 5 plants in your garden",
          icon: "🌿",
          earned: (parsed.plants?.length || 0) >= 5,
          earnedDate: parsed.fivePlantsDate,
        },
        {
          id: "ten-plants",
          name: "Plant Collector",
          description: "Manage 10 plants in your garden",
          icon: "🌳",
          earned: (parsed.plants?.length || 0) >= 10,
          earnedDate: parsed.tenPlantsDate,
        },
        {
          id: "first-identification",
          name: "Plant Detective",
          description: "Identify your first plant",
          icon: "🔍",
          earned: parsed.badges?.includes("first-identification") || false,
          earnedDate: parsed.firstIdentificationDate,
        },
        {
          id: "five-identifications",
          name: "Expert Identifier",
          description: "Identify 5 different plants",
          icon: "🎯",
          earned: parsed.badges?.includes("five-identifications") || false,
          earnedDate: parsed.fiveIdentificationsDate,
        },
        {
          id: "first-diagnosis",
          name: "Plant Doctor",
          description: "Diagnose your first plant health issue",
          icon: "⚕️",
          earned: parsed.badges?.includes("first-diagnosis") || false,
          earnedDate: parsed.firstDiagnosisDate,
        },
        {
          id: "first-post",
          name: "Community Voice",
          description: "Create your first forum post",
          icon: "💬",
          earned: parsed.badges?.includes("first-post") || false,
          earnedDate: parsed.firstPostDate,
        },
        {
          id: "helpful-member",
          name: "Helpful Member",
          description: "Reply to 5 forum discussions",
          icon: "🤝",
          earned: parsed.badges?.includes("helpful-member") || false,
          earnedDate: parsed.helpfulMemberDate,
        },
        {
          id: "points-100",
          name: "Rising Star",
          description: "Earn 100 points",
          icon: "⭐",
          earned: (parsed.points || 0) >= 100,
          earnedDate: parsed.points100Date,
        },
        {
          id: "points-500",
          name: "Plant Master",
          description: "Earn 500 points",
          icon: "👑",
          earned: (parsed.points || 0) >= 500,
          earnedDate: parsed.points500Date,
        },
      ]

      setBadges(allBadges)
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view your achievements</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const earnedBadges = badges.filter((b) => b.earned)
  const lockedBadges = badges.filter((b) => !b.earned)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Achievements</h1>
          <p className="text-muted-foreground">Track your progress and earn badges</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{user.points}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{earnedBadges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{user.plants?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Plants Managed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Earned Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="border-2 border-primary/50 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <h3 className="font-bold text-foreground mb-1">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                      <UIBadge className="bg-primary text-primary-foreground">Earned</UIBadge>
                      {badge.earnedDate && <p className="text-xs text-muted-foreground mt-2">{badge.earnedDate}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Locked Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <Card key={badge.id} className="opacity-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-5xl mb-3 grayscale">{badge.icon}</div>
                      <h3 className="font-bold text-foreground mb-1">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      <UIBadge variant="outline" className="mt-3">
                        Locked
                      </UIBadge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
