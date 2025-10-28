import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Lightbulb } from "lucide-react"

interface DiagnosisResult {
  issue: string
  severity: "low" | "medium" | "high"
  description: string
  symptoms: string[]
  treatment: {
    immediate: string[]
    longterm: string[]
  }
  prevention: string[]
}

export default function PlantDiagnosisResult({ result }: { result: DiagnosisResult }) {
  const severityColor =
    result.severity === "high"
      ? "bg-red-100 text-red-800"
      : result.severity === "medium"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800"

  const severityIcon =
    result.severity === "high" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{result.issue}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{result.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge className={severityColor}>
              {severityIcon}
              <span className="ml-1 capitalize">{result.severity} Severity</span>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-primary rounded-full" />
                {symptom}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Treatment Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Immediate Actions</h4>
            <ul className="space-y-1">
              {result.treatment.immediate.map((action, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Long-term Care</h4>
            <ul className="space-y-1">
              {result.treatment.longterm.map((action, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.prevention.map((tip, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
