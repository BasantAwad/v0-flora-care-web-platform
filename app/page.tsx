import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Camera, Heart, Users, MapPin, Trophy } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "AI Plant Identification",
      description: "Upload a photo and instantly identify your plant species with AI-powered recognition.",
    },
    {
      icon: Heart,
      title: "Health Diagnosis",
      description: "Detect pests, diseases, and nutrient issues. Get personalized treatment recommendations.",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with plant enthusiasts, share tips, and get advice from experienced growers.",
    },
    {
      icon: MapPin,
      title: "Local Store Finder",
      description: "Discover nearby nurseries, greenhouses, and plant stores in your area.",
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Earn badges and points for maintaining healthy plants and helping the community.",
    },
    {
      icon: Leaf,
      title: "Personal Dashboard",
      description: "Track all your plants, care schedules, and health history in one place.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Welcome to FloraCare</h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            The AI-powered community for smart plant parenting. Identify plants, diagnose health issues, and connect
            with fellow plant lovers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/identify">
              <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
                Start Identifying Plants
              </Button>
            </Link>
            <Link href="/forum">
              <Button size="lg" variant="outline">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Powerful Features for Plant Parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Plant Care?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of plant parents who are growing healthier, happier plants with FloraCare.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-secondary">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
