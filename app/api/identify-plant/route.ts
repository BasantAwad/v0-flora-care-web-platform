import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    // Convert base64 to buffer for Gemini
    const base64Data = imageData.split(",")[1]

    const prompt = `You are an expert botanist. Analyze this plant image and provide:
1. Plant species name (scientific and common name)
2. Confidence level (0-100%)
3. Brief description of the plant
4. Care instructions including:
   - Watering schedule
   - Sunlight requirements
   - Temperature range
   - Humidity preferences
   - Soil type recommendations

Format your response as JSON with this structure:
{
  "species": "Common Name (Scientific Name)",
  "confidence": 85,
  "description": "...",
  "careInstructions": {
    "watering": "...",
    "sunlight": "...",
    "temperature": "...",
    "humidity": "...",
    "soil": "..."
  }
}`

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

    const plantData = JSON.parse(jsonMatch[0])

    return Response.json(plantData)
  } catch (error) {
    console.error("Plant identification error:", error)
    return Response.json({ error: "Failed to identify plant" }, { status: 500 })
  }
}
