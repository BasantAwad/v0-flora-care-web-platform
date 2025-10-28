"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Plus } from "lucide-react"
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

export default function MyGardenPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [plants, setPlants] = useState<Plant[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState<"all" | "healthy" | "warning" | "critical">("all")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      setUser(parsed)
      setPlants(parsed.plants || [])
    }
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to view your garden</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredPlants = filter === "all" ? plants : plants.filter((p) => p.healthStatus === filter)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Garden</h1>
          <p className="text-muted-foreground">View and manage all your plants in one place</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Plant
          </Button>

          <div className="flex gap-2 flex-wrap">
            {(["all", "healthy", "warning", "critical"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className={filter === status ? "bg-primary text-primary-foreground" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} onDelete={handleDeletePlant} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Leaf className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {plants.length === 0
                  ? "No plants yet. Start by adding your first plant!"
                  : "No plants match this filter."}
              </p>
              {plants.length === 0 && (
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary hover:bg-accent text-primary-foreground"
                >
                  Add Your First Plant
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Add Plant Modal */}
        {showAddModal && <AddPlantModal onAdd={handleAddPlant} onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  )
}
