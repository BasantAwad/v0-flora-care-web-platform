import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const base64Data = imageData.split(",")[1]

    const prompt = `You are an expert plant pathologist and horticulturist. Carefully analyze this plant image and determine its health status.

FIRST: Assess if the plant is HEALTHY or has ISSUES.

If the plant appears HEALTHY (vibrant color, firm leaves, no visible damage, no spots/discoloration, no wilting):
Return JSON with:
{
  "isHealthy": true,
  "issue": "Healthy Plant",
  "severity": "none",
  "description": "This plant appears to be in good health with no visible issues detected.",
  "symptoms": [],
  "treatment": {
    "immediate": ["Continue current care routine"],
    "longterm": ["Maintain consistent watering and lighting", "Monitor regularly for any changes"]
  },
  "prevention": ["Keep current care practices", "Monitor soil moisture", "Ensure adequate light"]
}

If the plant has ISSUES (visible damage, spots, discoloration, wilting, pest damage, etc.):
Return JSON with:
{
  "isHealthy": false,
  "issue": "Issue name",
  "severity": "low/medium/high",
  "description": "Detailed description of the problem",
  "symptoms": ["symptom1", "symptom2"],
  "treatment": {
    "immediate": ["step1", "step2"],
    "longterm": ["step1", "step2"]
  },
  "prevention": ["tip1", "tip2"]
}

Be accurate and only report actual visible issues. Do not assume problems that are not visible in the image.`

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
      prompt,
    ])

    const responseText = result.response.text()

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Could not parse AI response")
    }

    const diagnosisData = JSON.parse(jsonMatch[0])

    return Response.json(diagnosisData)
  } catch (error) {
    console.error("Plant diagnosis error:", error)
    return Response.json({ error: "Failed to diagnose plant" }, { status: 500 })
  }
}
