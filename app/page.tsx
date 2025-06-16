"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Grid3X3, LayoutGrid, Check, Target, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Page() {
  const [viewMode, setViewMode] = useState<"cards" | "tiles">("cards")
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({})

  const aiStacks = [
    {
      id: "realtime-persona",
      title: "Realtime Persona Logic",
      description:
        "Advanced conversational AI platform featuring intelligent avatars with natural language processing, emotional intelligence, and contextual memory for enterprise-grade customer interactions.",
      url: "https://anam-demo-version-001.vercel.app/session",
      image: "/pic-1.png",
      category: ["Anam", "D-id"],
      showcase: "Featured Technology",
      features: ["Real-time Processing", "Multi-language Support", "Emotion Recognition"],
    },
    {
      id: "ai-image-generation",
      title: "AI Image Generation",
      description:
        "State-of-the-art generative AI for creating professional-grade visuals, marketing materials, and custom artwork with enterprise security and scalability.",
      url: "https://acolyte-image-demo.vercel.app/chat",
      image: "/pic-2.jpg",
      category: ["gpt-image-1", "flux"],
      showcase: "New Integration",
      features: ["High Resolution Output", "Brand Consistency", "Batch Processing"],
    },
    {
      id: "own",
      title: "Real time voice",
      description: "Advanced voice synthesis and processing platform that combines cutting-edge AI technologies for real-time voice generation and manipulation. Experience natural-sounding voices with emotional depth and precise control over speech characteristics.",
      url: "https://acolyte-voice-demo.vercel.app/",
      image: "/realtime.png",
      category: ["eleven labs", "openai"],
      showcase: "New Technology",
      features: ["Real-time Voice Synthesis", "Emotion Control", "Multi-language Support"],
    },
    {
      id: "background-removal",
      title: "Background Removal",
      description: "Transform your videos and images with our advanced AI-powered background removal tool. Remove backgrounds from videos and images with perfect precision, supporting multiple formats and delivering professional-quality results in seconds.",
      url: "https://unscreen.vercel.app/",
      image: "/background-removal.png",
      category: ["unscreen"],
      showcase: "New Technology",
      features: ["Video Background Removal", "Multiple Format Support", "High-Quality Output"],
    },
  ]

  const getCategoryUrl = (category: string) => {
    switch (category) {
      case "Anam":
        return "https://anam-demo-version-001.vercel.app/session"
      case "D-id":
        return "https://new-avatar-five.vercel.app/"
      case "gpt-image-1":
        return "https://acolyte-image-demo.vercel.app/chat"
      case "eleven labs":
        return "https://acolyte-eleven-labs.vercel.app/chat"
      case "openai":
        return "https://acolyte-openai-tts.vercel.app/chat"
      case "flux":
        return "#" // Coming soon
      case "unscreen":
        return "https://unscreen.vercel.app/"
      default:
        return "#"
    }
  }

  const handleCategoryChange = (stackId: string, category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [stackId]: category
    }))
  }

  const handleDemoClick = (demoId: string) => {
    // Keep this function for future use if needed
  }

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {aiStacks.map((stack, index) => (
        <Card
          key={index}
          className="overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative"
        >
          <div className="relative h-48">
            {stack.image.endsWith(".mp4") ? (
              <video
                src={stack.image}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                autoPlay
                disablePictureInPicture
              />
            ) : (
              <Image 
                src={stack.image || "/placeholder.svg"} 
                alt={stack.title} 
                fill 
                className={stack.id === "background-removal" ? "object-contain" : "object-cover"} 
              />
            )}
          </div>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Select
                value={selectedCategories[stack.id] || stack.category[0]}
                onValueChange={(value) => handleCategoryChange(stack.id, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {stack.category.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">{stack.title}</CardTitle>
            <CardDescription className="text-gray-600 text-sm leading-relaxed">{stack.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link
              href={getCategoryUrl(selectedCategories[stack.id] || stack.category[0])}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDemoClick(stack.id)}
            >
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50" 
                size="sm"
                disabled={selectedCategories[stack.id] === "flux"}
              >
                {selectedCategories[stack.id] === "flux" ? "Coming Soon" : "View Demo"}
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const TileView = () => (
    <div className="space-y-6 max-w-7xl mx-auto">
      {aiStacks.map((stack, index) => (
        <Card
          key={index}
          className="overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative"
        >
          <div className="grid md:grid-cols-4 gap-0">
            <div className="relative h-48 md:h-auto">
              {stack.image.endsWith(".mp4") ? (
                <video
                  src={stack.image}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  autoPlay
                  disablePictureInPicture
                />
              ) : (
                <Image 
                  src={stack.image || "/placeholder.svg"} 
                  alt={stack.title} 
                  fill 
                  className={stack.id === "background-removal" ? "object-contain" : "object-cover"} 
                />
              )}
            </div>
            <div className="md:col-span-3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Select
                    value={selectedCategories[stack.id] || stack.category[0]}
                    onValueChange={(value) => handleCategoryChange(stack.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {stack.category.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <CardTitle className="text-xl font-bold text-gray-900">{stack.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                  {stack.description}
                </CardDescription>
              </div>
              <div className="flex justify-end">
                <Link
                  href={getCategoryUrl(selectedCategories[stack.id] || stack.category[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDemoClick(stack.id)}
                >
                  <Button 
                    variant="outline" 
                    className="border-gray-300 hover:bg-gray-50" 
                    size="sm"
                    disabled={selectedCategories[stack.id] === "flux"}
                  >
                    {selectedCategories[stack.id] === "flux" ? "Coming Soon" : "View Demo"}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">AI Tools Sandbox</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Explore and test different AI platforms and tools in one place
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className={`${
                viewMode === "cards" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              } transition-all duration-200`}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Card View
            </Button>
            <Button
              variant={viewMode === "tiles" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("tiles")}
              className={`${
                viewMode === "tiles" ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              } transition-all duration-200`}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Tile View
            </Button>
          </div>
        </div>

        {/* Dynamic View */}
        {viewMode === "cards" ? <CardView /> : <TileView />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Acolyte Sandbox. All rights reserved.
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">Powered by</span>
              <span className="ml-2 text-sm font-bold text-blue-900">Acolyte Health</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
