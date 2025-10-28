"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, Leaf } from "lucide-react"
import PlantIdentificationResult from "@/components/plant-identification-result"

interface PlantResult {
  species: string
  confidence: number
  description: string
  careInstructions: {
    watering: string
    sunlight: string
    temperature: string
    humidity: string
    soil: string
  }
}

export default function IdentifyPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PlantResult | null>(null)
  const [error, setError] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
        setError("")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdentify = async () => {
    if (!image) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: image }),
      })

      if (!response.ok) {
        throw new Error("Failed to identify plant")
      }

      const plantData = await response.json()
      setResult(plantData)

      // Update user points
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        userData.points = (userData.points || 0) + 10
        localStorage.setItem("user", JSON.stringify(userData))
      }
    } catch (err) {
      setError("Failed to identify plant. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Identify Your Plant</h1>
          <p className="text-muted-foreground">Upload a photo and our AI will identify your plant species instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Plant Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>

              {image && (
                <div className="space-y-4">
                  <div className="relative w-full h-64 bg-secondary rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Uploaded plant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    onClick={handleIdentify}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Identifying...
                      </>
                    ) : (
                      "Identify Plant"
                    )}
                  </Button>
                </div>
              )}

              {error && <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{error}</div>}
            </CardContent>
          </Card>

          {/* Results Section */}
          <div>
            {result ? (
              <PlantIdentificationResult result={result} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Leaf className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload a plant photo to see identification results</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
