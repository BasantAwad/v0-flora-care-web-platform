"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Droplets, AlertCircle } from "lucide-react"

interface Plant {
  id: string
  name: string
  species: string
  lastWatered: string
  nextWatering: string
  healthStatus: "healthy" | "warning" | "critical"
  image: string
}

export default function PlantCard({ plant, onDelete }: { plant: Plant; onDelete: (id: string) => void }) {
  const statusColor =
    plant.healthStatus === "healthy"
      ? "bg-green-100 text-green-800"
      : plant.healthStatus === "warning"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"

  const statusIcon =
    plant.healthStatus === "critical" ? <AlertCircle className="w-4 h-4" /> : <Droplets className="w-4 h-4" />

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="w-full h-48 bg-secondary overflow-hidden">
        <img
          src={plant.image || "/placeholder.svg?height=200&width=300"}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{plant.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{plant.species}</p>
          </div>
          <Badge className={statusColor}>
            {statusIcon}
            <span className="ml-1 capitalize">{plant.healthStatus}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className="text-muted-foreground">Last Watered</p>
          <p className="font-medium text-foreground">{plant.lastWatered}</p>
        </div>
        <div className="text-sm">
          <p className="text-muted-foreground">Next Watering</p>
          <p className="font-medium text-foreground">{plant.nextWatering}</p>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(plant.id)}
          className="w-full flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Remove Plant
        </Button>
      </CardContent>
    </Card>
  )
}
