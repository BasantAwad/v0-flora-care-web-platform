import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Eye, ThumbsUp } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  createdAt: string
  replies: number
  views: number
  likes: number
}

export default function ForumPostCard({ post }: { post: ForumPost }) {
  const categoryColor: Record<string, string> = {
    "care-tips": "bg-green-100 text-green-800",
    "pest-control": "bg-red-100 text-red-800",
    "plant-identification": "bg-blue-100 text-blue-800",
    "general-discussion": "bg-purple-100 text-purple-800",
  }

  return (
    <Link href={`/forum/${post.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{post.content.substring(0, 100)}...</p>
            </div>
            <Badge className={categoryColor[post.category] || "bg-gray-100 text-gray-800"}>
              {post.category.replace("-", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>By {post.author}</span>
              <span>{post.createdAt}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
