"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Droplets, AlertCircle, MessageSquare, Trophy } from "lucide-react"

interface Notification {
  id: string
  type: "watering" | "health" | "forum" | "achievement"
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: React.ReactNode
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load or create notifications
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Create sample notifications
      const sampleNotifications: Notification[] = [
        {
          id: "1",
          type: "watering",
          title: "Time to Water",
          message: "Your Monstera is due for watering today",
          timestamp: new Date().toLocaleString(),
          read: false,
          icon: <Droplets className="w-5 h-5 text-blue-600" />,
        },
        {
          id: "2",
          type: "achievement",
          title: "Badge Earned!",
          message: "You earned the 'Green Thumb' badge for adding your first plant",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleString(),
          read: false,
          icon: <Trophy className="w-5 h-5 text-yellow-600" />,
        },
        {
          id: "3",
          type: "forum",
          title: "New Reply",
          message: "Someone replied to your forum post about plant propagation",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
          read: true,
          icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
        },
        {
          id: "4",
          type: "health",
          title: "Health Alert",
          message: "Your Pothos is showing signs of overwatering",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleString(),
          read: true,
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        },
      ]
      setNotifications(sampleNotifications)
      localStorage.setItem("notifications", JSON.stringify(sampleNotifications))
    }
  }, [])

  const handleMarkAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view notifications</p>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your plant care reminders and community activity</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-lg px-3 py-1">{unreadCount}</Badge>
          )}
        </div>

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <div className="mb-6">
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${
                  !notification.read ? "bg-primary/5 border-primary/50" : ""
                } hover:shadow-md`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{notification.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
