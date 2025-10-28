"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface Plant {
  name: string
  species: string
  lastWatered: string
  nextWatering: string
  healthStatus: "healthy" | "warning" | "critical"
  image: string
}

export default function AddPlantModal({
  onAdd,
  onClose,
}: {
  onAdd: (plant: Plant) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    lastWatered: new Date().toISOString().split("T")[0],
    nextWatering: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    healthStatus: "healthy" as const,
    image: "/potted-plant.png",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.species) {
      onAdd(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Plant</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Plant Name</label>
              <Input
                name="name"
                placeholder="e.g., My Monstera"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Species</label>
              <Input
                name="species"
                placeholder="e.g., Monstera Deliciosa"
                value={formData.species}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Watered</label>
              <Input type="date" name="lastWatered" value={formData.lastWatered} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Next Watering</label>
              <Input type="date" name="nextWatering" value={formData.nextWatering} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Health Status</label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="healthy">Healthy</option>
                <option value="warning">Needs Attention</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
                Add Plant
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
