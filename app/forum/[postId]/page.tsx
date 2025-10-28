"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, ThumbsUp } from "lucide-react"

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
}

interface Reply {
  id: string
  content: string
  author: string
  authorId: string
  createdAt: string
  likes: number
}

export default function ForumPostPage() {
  const params = useParams()
  const postId = params.postId as string
  const [post, setPost] = useState<ForumPost | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyContent, setReplyContent] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const savedPosts = localStorage.getItem("forumPosts")
    if (savedPosts) {
      const posts = JSON.parse(savedPosts)
      const found = posts.find((p: ForumPost) => p.id === postId)
      if (found) {
        setPost({ ...found, views: found.views + 1 })
      }
    }

    const savedReplies = localStorage.getItem(`forumReplies_${postId}`)
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies))
    }
  }, [postId])

  const handleReply = () => {
    if (!replyContent.trim() || !user) return

    const newReply: Reply = {
      id: Date.now().toString(),
      content: replyContent,
      author: user.username,
      authorId: user.id,
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
    }

    const updatedReplies = [...replies, newReply]
    setReplies(updatedReplies)
    localStorage.setItem(`forumReplies_${postId}`, JSON.stringify(updatedReplies))

    // Update post reply count
    if (post) {
      const savedPosts = localStorage.getItem("forumPosts")
      if (savedPosts) {
        const posts = JSON.parse(savedPosts)
        const updated = posts.map((p: ForumPost) => (p.id === postId ? { ...p, replies: p.replies + 1 } : p))
        localStorage.setItem("forumPosts", JSON.stringify(updated))
        setPost({ ...post, replies: post.replies + 1 })
      }
    }

    // Award points
    if (user) {
      const updated = { ...user, points: (user.points || 0) + 5 }
      localStorage.setItem("user", JSON.stringify(updated))
      setUser(updated)
    }

    setReplyContent("")
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const categoryColor: Record<string, string> = {
    "care-tips": "bg-green-100 text-green-800",
    "pest-control": "bg-red-100 text-red-800",
    "plant-identification": "bg-blue-100 text-blue-800",
    "general-discussion": "bg-purple-100 text-purple-800",
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/forum" className="flex items-center gap-2 text-primary hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        {/* Post */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
              <Badge className={categoryColor[post.category] || "bg-gray-100 text-gray-800"}>
                {post.category.replace("-", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">{post.content}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.replies} replies</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} likes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Replies ({replies.length})</h2>
          <div className="space-y-4">
            {replies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{reply.author}</p>
                      <p className="text-sm text-muted-foreground">{reply.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{reply.likes}</span>
                    </div>
                  </div>
                  <p className="text-foreground">{reply.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        {user ? (
          <Card>
            <CardHeader>
              <CardTitle>Add Your Reply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                placeholder="Share your thoughts..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
              <Button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="bg-primary hover:bg-accent text-primary-foreground"
              >
                Post Reply
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-muted-foreground mb-4">Sign in to reply to this discussion</p>
              <Link href="/login">
                <Button className="bg-primary hover:bg-accent text-primary-foreground">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
