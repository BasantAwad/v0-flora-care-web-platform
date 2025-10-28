import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Lightbulb, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About FloraCare</h1>
          <p className="text-lg text-muted-foreground">
            Empowering plant parents with AI-powered care and community support
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Target className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Mission</h2>
                <p className="text-muted-foreground">
                  To transform plant care from a daunting challenge into a rewarding, gamified experience by combining
                  cutting-edge AI technology with a supportive community of plant enthusiasts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Leaf className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Promoting indoor gardening and plant care to create greener, healthier living spaces
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Lightbulb className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging AI and machine learning to provide personalized, intelligent plant care guidance
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building a supportive network where plant parents can learn, share, and grow together
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">What We Offer</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">AI-Powered Plant Identification</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a photo and instantly identify your plant species with detailed care instructions tailored to
                  your location and season.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">Health Diagnosis & Treatment</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered diagnosis for plant health issues including pests, diseases, and nutrient deficiencies,
                  with actionable treatment plans.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">Personal Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Track all your plants in one place with care schedules, health history, and personalized reminders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">Community Forum</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with thousands of plant enthusiasts, share experiences, ask questions, and learn from experts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">Gamification & Achievements</h3>
                <p className="text-sm text-muted-foreground">
                  Earn badges and points for plant care milestones, community contributions, and learning achievements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-2">Local Store Finder</h3>
                <p className="text-sm text-muted-foreground">
                  Discover nearby nurseries, greenhouses, and garden centers to find plants, supplies, and expert
                  advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Team</h2>
          <p className="text-muted-foreground mb-6">
            FloraCare is built by a passionate team of plant enthusiasts, AI engineers, and community builders dedicated
            to making plant care accessible to everyone.
          </p>
          <p className="text-sm text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Contact us at support@floracare.com
          </p>
        </div>
      </div>
    </div>
  )
}
