"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Grid3X3, LayoutGrid, Check, Target, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Page() {
  const [viewMode, setViewMode] = useState<"cards" | "tiles">("cards")
  const [visitedDemos, setVisitedDemos] = useState<Set<string>>(new Set())

  const aiStacks = [
    {
      id: "realtime-persona",
      title: "Realtime Persona Logic",
      description:
        "Advanced conversational AI platform featuring intelligent avatars with natural language processing, emotional intelligence, and contextual memory for enterprise-grade customer interactions.",
      url: "https://anam-demo-version-001.vercel.app/",
      image: "/pic-1.png",
      category: "Conversational AI",
      showcase: "Featured Technology",
      features: ["Real-time Processing", "Multi-language Support", "Emotion Recognition"],
    },
    {
      id: "ai-image-generation",
      title: "AI Image Generation",
      description:
        "State-of-the-art generative AI for creating professional-grade visuals, marketing materials, and custom artwork with enterprise security and scalability.",
      url: "https://acolyte-image-demo.vercel.app/",
      image: "/pic-2.jpg",
      category: "Computer Vision",
      showcase: "New Integration",
      features: ["High Resolution Output", "Brand Consistency", "Batch Processing"],
    },
    {
      id: "video-creation",
      title: "Video Creation Studio",
      description:
        "Professional video synthesis platform leveraging cutting-edge AI for automated content creation, training materials, and marketing campaigns.",
      url: "https://acolyte-veo-v3-demo.vercel.app/",
      image: "/video-1.mp4",
      category: "Media Generation",
      showcase: "Trending Solution",
      features: ["4K Output", "Custom Branding", "API Integration"],
    },
  ]

  // Load visited demos from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("acolyte-visited-demos")
    if (saved) {
      setVisitedDemos(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save visited demos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("acolyte-visited-demos", JSON.stringify(Array.from(visitedDemos)))
  }, [visitedDemos])

  const handleDemoClick = (demoId: string) => {
    setVisitedDemos((prev) => new Set([...prev, demoId]))
  }

  const completionPercentage = Math.round((visitedDemos.size / aiStacks.length) * 100)

  const getShowcaseColor = (showcase: string) => {
    switch (showcase) {
      case "Featured Technology":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "New Integration":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Trending Solution":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const ProgressBanner = () => (
    <div className="container mx-auto px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-1">Your Learning Journey</h2>
            <p className="text-white/90 text-xs max-w-2xl mx-auto">
              Track your progress as you explore our AI technology showcase and expand your knowledge of cutting-edge
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Target className="h-4 w-4 text-white/80" />
              </div>
              <div className="text-sm font-semibold">Exploration Progress</div>
              <div className="text-xs text-white/80">
                {visitedDemos.size} of {aiStacks.length} demos explored
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-white/80" />
              </div>
              <div className="text-sm font-semibold">Knowledge Gained</div>
              <div className="text-xs text-white/80">
                {visitedDemos.size > 0
                  ? `${visitedDemos.size} technology${visitedDemos.size > 1 ? " areas" : " area"} mastered`
                  : "Ready to start learning"}
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Award className="h-4 w-4 text-white/80" />
              </div>
              <div className="text-sm font-semibold">Achievement Level</div>
              <div className="text-xs text-white/80">
                {completionPercentage === 0
                  ? "Beginner"
                  : completionPercentage < 50
                    ? "Explorer"
                    : completionPercentage < 100
                      ? "Advanced"
                      : "Expert"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">Overall Completion</div>
              <div className="text-xs opacity-90">Keep exploring to unlock more insights</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold">{completionPercentage}%</div>
              <div className="w-32 bg-white/20 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {aiStacks.map((stack, index) => {
        const isVisited = visitedDemos.has(stack.id)
        return (
          <Card
            key={index}
            className={`overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative ${
              isVisited ? "ring-2 ring-teal-200" : ""
            }`}
          >
            {isVisited && (
              <div className="absolute top-4 right-4 z-10 bg-teal-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
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
                <Image src={stack.image || "/placeholder.svg"} alt={stack.title} fill className="object-cover" />
              )}
              <div className="absolute top-4 left-4">
                <Badge className={`text-xs ${getShowcaseColor(stack.showcase)}`}>{stack.showcase}</Badge>
              </div>
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {stack.category}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">{stack.title}</CardTitle>
              <CardDescription className="text-gray-600 text-sm leading-relaxed">{stack.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-6">
                {stack.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-600">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <Link
                href={stack.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDemoClick(stack.id)}
              >
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50" size="sm">
                  View Demo
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const TileView = () => (
    <div className="space-y-6 max-w-7xl mx-auto">
      {aiStacks.map((stack, index) => {
        const isVisited = visitedDemos.has(stack.id)
        return (
          <Card
            key={index}
            className={`overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative ${
              isVisited ? "ring-2 ring-teal-200" : ""
            }`}
          >
            {isVisited && (
              <div className="absolute top-4 right-4 z-10 bg-teal-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
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
                  <Image src={stack.image || "/placeholder.svg"} alt={stack.title} fill className="object-cover" />
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={`text-xs ${getShowcaseColor(stack.showcase)}`}>{stack.showcase}</Badge>
                </div>
              </div>
              <div className="md:col-span-3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {stack.category}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-gray-900">{stack.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                    {stack.description}
                  </CardDescription>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                    {stack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={stack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDemoClick(stack.id)}
                  >
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-50" size="sm">
                      View Demo
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Acolyte Sandbox</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Enterprise-grade artificial intelligence solutions designed for modern businesses. Explore our
              comprehensive suite of AI technologies that drive innovation, enhance productivity, and deliver measurable
              results across industries.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Featured Technology
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                New Integration
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Trending Solution
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Banner */}
      <ProgressBanner />

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

        {/* Coming Soon Section */}
        <div className="mt-12">
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">More AI Tools Coming Soon</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-3xl mx-auto">
              We're continuously exploring and evaluating the latest AI technologies to bring you cutting-edge
              solutions. Our team is working on integrating new tools for natural language processing, computer vision,
              automation, and advanced analytics that will revolutionize how we work and innovate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <div className="text-base font-semibold text-blue-300 mb-2">Analytics & Reporting</div>
                <div className="text-sm text-gray-300">Advanced data visualization and business intelligence tools</div>
              </div>
              <div className="p-3">
                <div className="text-base font-semibold text-green-300 mb-2">Language Processing</div>
                <div className="text-sm text-gray-300">Natural language understanding and text analysis solutions</div>
              </div>
              <div className="p-3">
                <div className="text-base font-semibold text-purple-300 mb-2">Workflow Automation</div>
                <div className="text-sm text-gray-300">Intelligent process automation and integration platforms</div>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              Stay tuned for updates as we continue to expand our AI technology showcase
            </div>
          </div>
        </div>
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
