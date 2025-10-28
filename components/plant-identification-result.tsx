import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Sun, Thermometer, Wind, Leaf } from "lucide-react"

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

export default function PlantIdentificationResult({ result }: { result: PlantResult }) {
  const confidenceColor =
    result.confidence > 0.9
      ? "bg-green-100 text-green-800"
      : result.confidence > 0.7
        ? "bg-yellow-100 text-yellow-800"
        : "bg-orange-100 text-orange-800"

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{result.species}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{result.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge className={confidenceColor}>{Math.round(result.confidence * 100)}% Confidence</Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Care Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Droplets className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-foreground">Watering</p>
              <p className="text-sm text-muted-foreground">{result.careInstructions.watering}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Sun className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-foreground">Sunlight</p>
              <p className="text-sm text-muted-foreground">{result.careInstructions.sunlight}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Thermometer className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-foreground">Temperature</p>
              <p className="text-sm text-muted-foreground">{result.careInstructions.temperature}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Wind className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-foreground">Humidity</p>
              <p className="text-sm text-muted-foreground">{result.careInstructions.humidity}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-foreground">Soil</p>
              <p className="text-sm text-muted-foreground">{result.careInstructions.soil}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
