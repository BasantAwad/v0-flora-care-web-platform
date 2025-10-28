"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, MessageSquare } from "lucide-react"
import ForumPostCard from "@/components/forum-post-card"
import CreatePostModal from "@/components/create-post-modal"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  category: string
  createdAt: string
  replies: number
  views: number
  likes: number
  isApproved: boolean
}

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [user, setUser] = useState<any>(null)

  const categories = ["all", "care-tips", "pest-control", "plant-identification", "general-discussion"]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load posts from localStorage
    const savedPosts = localStorage.getItem("forumPosts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      // Initialize with sample posts
      const samplePosts: ForumPost[] = [
        {
          id: "1",
          title: "Best way to propagate Pothos?",
          content: "I have a beautiful Pothos plant and want to propagate it. What's the best method?",
          author: "PlantLover123",
          authorId: "1",
          category: "care-tips",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          replies: 5,
          views: 42,
          likes: 8,
          isApproved: true,
        },
        {
          id: "2",
          title: "Help! My Monstera has brown spots",
          content: "My Monstera has developed brown spots on the leaves. Is this a disease or overwatering?",
          author: "GreenThumb",
          authorId: "2",
          category: "pest-control",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          replies: 3,
          views: 28,
          likes: 5,
          isApproved: true,
        },
        {
          id: "3",
          title: "Identifying this mystery plant",
          content: "Found this plant at a thrift store but no label. Can anyone help identify it?",
          author: "PlantDetective",
          authorId: "3",
          category: "plant-identification",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          replies: 7,
          views: 56,
          likes: 12,
          isApproved: true,
        },
      ]
      setPosts(samplePosts)
      localStorage.setItem("forumPosts", JSON.stringify(samplePosts))
    }
  }, [])

  const handleCreatePost = (newPost: Omit<ForumPost, "id" | "replies" | "views" | "likes" | "isApproved">) => {
    const post: ForumPost = {
      ...newPost,
      id: Date.now().toString(),
      replies: 0,
      views: 0,
      likes: 0,
      isApproved: true,
    }
    const updatedPosts = [post, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts))

    // Award points for creating post
    if (user) {
      const updated = { ...user, points: (user.points || 0) + 10 }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
    }

    setShowCreateModal(false)
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory && post.isApproved
  })

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
          <p className="text-muted-foreground">Connect with plant enthusiasts and share your knowledge</p>
        </div>

        {/* Create Post Button */}
        <div className="mb-8">
          {user ? (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Discussion
            </Button>
          ) : (
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground mb-2">Sign in to create a discussion</p>
              <Link href="/login">
                <Button size="sm" className="bg-primary hover:bg-accent text-primary-foreground">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-8">
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary border-border"
          />

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-primary text-primary-foreground" : ""}
              >
                {cat.replace("-", " ").charAt(0).toUpperCase() + cat.replace("-", " ").slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <ForumPostCard key={post.id} post={post} />)
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No discussions found. Be the first to start one!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <CreatePostModal onCreate={handleCreatePost} onClose={() => setShowCreateModal(false)} user={user} />
        )}
      </div>
    </div>
  )
}
