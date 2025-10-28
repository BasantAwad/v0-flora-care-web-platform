"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Zap, Brain } from "lucide-react"

interface UserData {
  username: string
  email: string
  points: number
  badges: string[]
  gamesPlayed?: number
  highScore?: number
}

export default function GamesPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const games = [
    {
      id: "plant-quiz",
      title: "Plant Care Quiz",
      description: "Test your plant care knowledge with 5 quick questions",
      icon: "🧠",
      difficulty: "Easy",
      reward: 50,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "identification-challenge",
      title: "Identification Challenge",
      description: "Identify 5 plants from images. Get them all right for bonus points!",
      icon: "🔍",
      difficulty: "Medium",
      reward: 100,
      color: "bg-green-50 border-green-200",
    },
    {
      id: "watering-schedule",
      title: "Watering Schedule Master",
      description: "Match plants with their ideal watering frequencies",
      icon: "💧",
      difficulty: "Easy",
      reward: 75,
      color: "bg-cyan-50 border-cyan-200",
    },
    {
      id: "pest-detective",
      title: "Pest Detective",
      description: "Identify common plant pests and their solutions",
      icon: "🐛",
      difficulty: "Hard",
      reward: 150,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "soil-expert",
      title: "Soil Type Expert",
      description: "Learn and match soil types to different plants",
      icon: "🌍",
      difficulty: "Medium",
      reward: 100,
      color: "bg-amber-50 border-amber-200",
    },
    {
      id: "light-conditions",
      title: "Light Conditions Pro",
      description: "Master the art of matching plants to light conditions",
      icon: "☀️",
      difficulty: "Medium",
      reward: 100,
      color: "bg-yellow-50 border-yellow-200",
    },
  ]

  const handlePlayGame = (gameId: string, reward: number) => {
    setActiveGame(gameId)
    setGameScore(reward)
  }

  const handleCompleteGame = () => {
    if (user && gameScore > 0) {
      const updatedUser = {
        ...user,
        points: (user.points || 0) + gameScore,
        gamesPlayed: (user.gamesPlayed || 0) + 1,
        highScore: Math.max(user.highScore || 0, gameScore),
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setActiveGame(null)
      setGameScore(0)
    }
  }

  if (!mounted) return null

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground mb-4 text-lg">Sign in to play games and earn points!</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (activeGame) {
    return <GamePlay gameId={activeGame} reward={gameScore} onComplete={handleCompleteGame} />
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">FloraCare Games</h1>
          </div>
          <p className="text-muted-foreground text-lg">Play games, learn about plants, and earn rewards!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-foreground">{user.points || 0}</p>
                </div>
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Games Played</p>
                  <p className="text-3xl font-bold text-foreground">{user.gamesPlayed || 0}</p>
                </div>
                <Zap className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Score</p>
                  <p className="text-3xl font-bold text-foreground">{user.highScore || 0}</p>
                </div>
                <Brain className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className={`border-2 ${game.color} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{game.icon}</div>
                  <Badge variant="outline">{game.difficulty}</Badge>
                </div>
                <CardTitle className="mt-4">{game.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">+{game.reward} pts</span>
                  </div>
                  <Button
                    onClick={() => handlePlayGame(game.id, game.reward)}
                    className="bg-primary hover:bg-accent text-primary-foreground"
                  >
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">💡 Pro Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Play games regularly to earn points and unlock achievements</p>
            <p>• Combine games with real plant care to become a true plant expert</p>
            <p>• Share your high scores with the community in the forum</p>
            <p>• Earn enough points to unlock special badges and rewards</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Game Play Component
function GamePlay({ gameId, reward, onComplete }: { gameId: string; reward: number; onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const quizzes: Record<string, any> = {
    "plant-quiz": {
      title: "Plant Care Quiz",
      questions: [
        {
          question: "How often should you water a succulent?",
          options: ["Daily", "Weekly", "Every 2-3 weeks", "Monthly"],
          correct: 2,
        },
        {
          question: "What does NPK stand for in fertilizers?",
          options: [
            "Nitrogen, Phosphorus, Potassium",
            "Nitrogen, Phosphate, Kalium",
            "Nitrate, Phosphorus, Potash",
            "None of the above",
          ],
          correct: 0,
        },
        {
          question: "Which plant thrives in low light conditions?",
          options: ["Cactus", "Pothos", "Sunflower", "Tomato"],
          correct: 1,
        },
        {
          question: "What is the ideal humidity for most tropical plants?",
          options: ["20-30%", "40-50%", "60-80%", "90-100%"],
          correct: 2,
        },
        {
          question: "When is the best time to repot a plant?",
          options: ["Winter", "Spring", "Summer", "Fall"],
          correct: 1,
        },
      ],
    },
    "watering-schedule": {
      title: "Watering Schedule Master",
      questions: [
        {
          question: "Aloe Vera watering frequency?",
          options: ["Daily", "Weekly", "Every 2-3 weeks", "Monthly"],
          correct: 2,
        },
        {
          question: "Monstera watering frequency?",
          options: ["Daily", "Weekly", "Every 2 weeks", "Monthly"],
          correct: 1,
        },
        {
          question: "Snake Plant watering frequency?",
          options: ["Daily", "Weekly", "Every 3-4 weeks", "Monthly"],
          correct: 2,
        },
        {
          question: "Fern watering frequency?",
          options: ["Daily", "Every 2-3 days", "Weekly", "Monthly"],
          correct: 1,
        },
        {
          question: "Cactus watering frequency?",
          options: ["Daily", "Weekly", "Every 3-4 weeks", "Monthly"],
          correct: 2,
        },
      ],
    },
    "soil-expert": {
      title: "Soil Type Expert",
      questions: [
        {
          question: "Which soil is best for succulents?",
          options: ["Clay soil", "Sandy/Gritty soil", "Peat moss", "Regular potting soil"],
          correct: 1,
        },
        {
          question: "What does well-draining soil prevent?",
          options: ["Nutrient absorption", "Root rot", "Pest infestation", "Leaf growth"],
          correct: 1,
        },
        {
          question: "Which plants prefer acidic soil?",
          options: ["Cacti", "Blueberries", "Succulents", "Herbs"],
          correct: 1,
        },
        {
          question: "What is the main component of potting soil?",
          options: ["Sand", "Peat moss or coco coir", "Clay", "Gravel"],
          correct: 1,
        },
        {
          question: "How often should you refresh potting soil?",
          options: ["Every year", "Every 2 years", "Every 3-5 years", "Never"],
          correct: 1,
        },
      ],
    },
    "light-conditions": {
      title: "Light Conditions Pro",
      questions: [
        {
          question: "How many hours of direct sunlight does a succulent need?",
          options: ["2-3 hours", "4-6 hours", "8+ hours", "None"],
          correct: 2,
        },
        {
          question: "Which plant tolerates low light best?",
          options: ["Sunflower", "Pothos", "Cactus", "Tomato"],
          correct: 1,
        },
        {
          question: "What does 'indirect light' mean?",
          options: ["No light at all", "Light filtered through a window", "Direct sunlight", "Artificial light only"],
          correct: 1,
        },
        {
          question: "How far from a window should you place a low-light plant?",
          options: ["1 foot", "3-5 feet", "10+ feet", "In a dark closet"],
          correct: 1,
        },
        {
          question: "What is the best window direction for most plants?",
          options: ["North", "South", "East", "West"],
          correct: 1,
        },
      ],
    },
    "pest-detective": {
      title: "Pest Detective",
      questions: [
        {
          question: "What do spider mites look like?",
          options: ["Large brown insects", "Tiny red/yellow dots", "White fuzzy spots", "Black beetles"],
          correct: 1,
        },
        {
          question: "How do you treat mealybugs?",
          options: ["Ignore them", "Neem oil spray", "Increase watering", "Move to sunlight"],
          correct: 1,
        },
        {
          question: "What causes scale insects?",
          options: ["Overwatering", "Low humidity", "Poor air circulation", "All of the above"],
          correct: 3,
        },
        {
          question: "How to prevent fungus gnats?",
          options: ["Water more", "Let soil dry between watering", "Increase humidity", "Move to shade"],
          correct: 1,
        },
        {
          question: "What is the first sign of aphid infestation?",
          options: ["Yellow leaves", "Sticky residue", "Brown spots", "Wilting"],
          correct: 1,
        },
      ],
    },
    "identification-challenge": {
      title: "Identification Challenge",
      questions: [
        {
          question: "Which plant has thick, fleshy leaves?",
          options: ["Fern", "Succulent", "Ivy", "Ficus"],
          correct: 1,
        },
        {
          question: "Monstera is known for its:",
          options: ["Red flowers", "Fenestrated leaves", "Thorns", "Fragrance"],
          correct: 1,
        },
        {
          question: "Snake Plant is also called:",
          options: ["Pothos", "Sansevieria", "Philodendron", "Dracaena"],
          correct: 1,
        },
        {
          question: "Which plant is a climbing vine?",
          options: ["Aloe", "Pothos", "Cactus", "Dracaena"],
          correct: 1,
        },
        {
          question: "Rubber Plant is known for:",
          options: ["Small leaves", "Large glossy leaves", "Flowers", "Thorns"],
          correct: 1,
        },
      ],
    },
  }

  const quiz = quizzes[gameId]
  const questions = quiz.questions
  const isComplete = currentQuestion >= questions.length

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswered(false)
    } else {
      onComplete()
    }
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">
              {percentage === 100 ? "🏆" : percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}
            </div>
            <CardTitle>Game Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Your Score</p>
              <p className="text-4xl font-bold text-primary">
                {score}/{questions.length}
              </p>
              <p className="text-lg font-semibold text-foreground mt-2">{percentage}%</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Points Earned</p>
              <p className="text-2xl font-bold text-primary">+{reward}</p>
            </div>
            <Button onClick={onComplete} className="w-full bg-primary hover:bg-accent text-primary-foreground">
              Back to Games
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>{quiz.title}</CardTitle>
              <Badge variant="outline">
                {currentQuestion + 1}/{questions.length}
              </Badge>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      answered
                        ? index === question.correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-border hover:border-primary hover:bg-secondary"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {answered && (
              <Button onClick={handleNext} className="w-full bg-primary hover:bg-accent text-primary-foreground">
                {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
