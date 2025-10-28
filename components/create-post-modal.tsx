"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface CreatePostModalProps {
  onCreate: (post: any) => void
  onClose: () => void
  user: any
}

export default function CreatePostModal({ onCreate, onClose, user }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general-discussion",
  })

  const categories = [
    { value: "care-tips", label: "Care Tips" },
    { value: "pest-control", label: "Pest Control" },
    { value: "plant-identification", label: "Plant Identification" },
    { value: "general-discussion", label: "General Discussion" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.content) {
      onCreate({
        title: formData.title,
        content: formData.content,
        category: formData.category,
        author: user.username,
        authorId: user.id,
        createdAt: new Date().toLocaleDateString(),
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create New Discussion</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                name="title"
                placeholder="What's your question or topic?"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                name="content"
                placeholder="Provide details about your question or topic..."
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
                Create Discussion
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
