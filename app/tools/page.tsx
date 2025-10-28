"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shovel, Droplet, Leaf, Scissors, Lightbulb } from "lucide-react"

interface Tool {
  id: string
  name: string
  category: string
  description: string
  price: string
  icon: React.ReactNode
  recommended: boolean
}

interface SoilType {
  id: string
  name: string
  description: string
  bestFor: string[]
  ingredients: string[]
}

export default function ToolsPage() {
  const tools: Tool[] = [
    {
      id: "1",
      name: "Watering Can",
      category: "watering",
      description: "Essential for precise watering. Look for one with a fine rose for delicate plants.",
      price: "$15-30",
      icon: <Droplet className="w-6 h-6" />,
      recommended: true,
    },
    {
      id: "2",
      name: "Pruning Shears",
      category: "maintenance",
      description: "Sharp, clean cuts promote healthy growth. Stainless steel prevents rust.",
      price: "$20-40",
      icon: <Scissors className="w-6 h-6" />,
      recommended: true,
    },
    {
      id: "3",
      name: "Soil Moisture Meter",
      category: "monitoring",
      description: "Takes the guesswork out of watering. Digital meters are most accurate.",
      price: "$10-25",
      icon: <Lightbulb className="w-6 h-6" />,
      recommended: true,
    },
    {
      id: "4",
      name: "Small Shovel",
      category: "repotting",
      description: "Perfect for transferring soil and repotting plants. Ergonomic handles reduce strain.",
      price: "$12-20",
      icon: <Shovel className="w-6 h-6" />,
      recommended: false,
    },
    {
      id: "5",
      name: "Plant Mister",
      category: "watering",
      description: "Ideal for humidity-loving plants. Provides gentle, even moisture distribution.",
      price: "$8-15",
      icon: <Droplet className="w-6 h-6" />,
      recommended: true,
    },
    {
      id: "6",
      name: "Fertilizer",
      category: "nutrition",
      description: "Balanced NPK ratio (10-10-10) works for most houseplants. Apply monthly during growing season.",
      price: "$5-15",
      icon: <Leaf className="w-6 h-6" />,
      recommended: true,
    },
  ]

  const soilTypes: SoilType[] = [
    {
      id: "1",
      name: "General Purpose Potting Mix",
      description: "Balanced blend suitable for most houseplants. Good drainage and water retention.",
      bestFor: ["Monstera", "Pothos", "Philodendron", "Ficus"],
      ingredients: ["Peat moss or coco coir", "Perlite", "Compost"],
    },
    {
      id: "2",
      name: "Cactus & Succulent Mix",
      description: "Fast-draining mix with minimal water retention. Prevents root rot in drought-tolerant plants.",
      bestFor: ["Snake Plant", "Aloe", "Echeveria", "Jade Plant"],
      ingredients: ["Coarse sand", "Perlite", "Potting soil"],
    },
    {
      id: "3",
      name: "Orchid Mix",
      description: "Specialized blend with bark chips for air circulation. Mimics natural orchid habitat.",
      bestFor: ["Orchids", "Bromeliads"],
      ingredients: ["Orchid bark", "Sphagnum moss", "Perlite"],
    },
    {
      id: "4",
      name: "African Violet Mix",
      description: "Light, fluffy mix that retains moisture while allowing air flow. Slightly acidic pH.",
      bestFor: ["African Violets", "Begonias", "Gloxinia"],
      ingredients: ["Peat moss", "Perlite", "Vermiculite"],
    },
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tools & Recommendations</h1>
          <p className="text-muted-foreground">Essential equipment and soil types for successful plant care</p>
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Essential Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{tool.icon}</div>
                    {tool.recommended && <Badge className="bg-green-100 text-green-800">Recommended</Badge>}
                  </div>
                  <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium text-foreground">Price Range</p>
                    <p className="text-lg font-bold text-primary">{tool.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Soil Types Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Soil Types & Recommendations</h2>
          <div className="space-y-6">
            {soilTypes.map((soil) => (
              <Card key={soil.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{soil.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{soil.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-2">
                      {soil.bestFor.map((plant) => (
                        <Badge key={plant} variant="outline">
                          {plant}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Ingredients</h4>
                    <ul className="space-y-1">
                      {soil.ingredients.map((ingredient) => (
                        <li key={ingredient} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h3 className="text-lg font-bold text-foreground mb-4">Pro Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Always use pots with drainage holes to prevent waterlogging and root rot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Repot plants annually or when they become root-bound (roots visible at soil surface)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Sterilize tools between plants to prevent disease transmission</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Mix your own soil for better control over drainage and nutrients</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Invest in quality tools - they last longer and make plant care easier</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
