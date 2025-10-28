"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Leaf, Droplets, Sun, AlertCircle } from "lucide-react"
import PlantCard from "@/components/plant-card"
import AddPlantModal from "@/components/add-plant-modal"

interface Plant {
  id: string
  name: string
  species: string
  lastWatered: string
  nextWatering: string
  healthStatus: "healthy" | "warning" | "critical"
  image: string
}

interface UserData {
  username: string
  email: string
  points: number
  badges: string[]
  plants: Plant[]
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [plants, setPlants] = useState<Plant[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setPlants(parsed.plants || [])
    }
    setIsLoading(false)
  }, [])

  const handleAddPlant = (newPlant: Omit<Plant, "id">) => {
    const plant: Plant = {
      ...newPlant,
      id: Date.now().toString(),
    }
    const updatedPlants = [...plants, plant]
    setPlants(updatedPlants)

    if (user) {
      const updated = { ...user, plants: updatedPlants, points: (user.points || 0) + 5 }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
    }
    setShowAddModal(false)
  }

  const handleDeletePlant = (id: string) => {
    const updatedPlants = plants.filter((p) => p.id !== id)
    setPlants(updatedPlants)

    if (user) {
      const updated = { ...user, plants: updatedPlants }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view your dashboard</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const healthyCount = plants.filter((p) => p.healthStatus === "healthy").length
  const warningCount = plants.filter((p) => p.healthStatus === "warning").length
  const criticalCount = plants.filter((p) => p.healthStatus === "critical").length

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.username}!</h1>
          <p className="text-muted-foreground">Manage your plant collection and track their health</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{plants.length}</p>
                <p className="text-sm text-muted-foreground">Total Plants</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Sun className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{healthyCount}</p>
                <p className="text-sm text-muted-foreground">Healthy</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{warningCount}</p>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{user.points}</p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Plant Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Plant
          </Button>
        </div>

        {/* Plants Grid */}
        {plants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onDelete={handleDeletePlant} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No plants yet. Start by adding your first plant!</p>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-primary hover:bg-accent text-primary-foreground"
              >
                Add Your First Plant
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Plant Modal */}
        {showAddModal && <AddPlantModal onAdd={handleAddPlant} onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  )
}
