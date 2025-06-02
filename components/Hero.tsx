"use client"
import { Button } from "@/components/ui/button";
import {
  Play,
  Upload,
  Monitor,
  Video,
  Users,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Recording",
      description:
        "Start recording in seconds with our optimized capture technology",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description:
        "Your videos are encrypted and stored securely with enterprise-grade protection",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global CDN",
      description:
        "Lightning-fast video delivery worldwide with our global content network",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Share, comment, and collaborate on videos with your entire team",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Vidiew has revolutionized how we create and share product demos. The quality is incredible!",
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The easiest screen recording tool I've ever used. Perfect for design reviews and tutorials.",
    },
    {
      name: "Emily Watson",
      role: "Engineering Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Our team productivity increased 40% since we started using Vidiew for code reviews.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-20 flex items-center border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Vidiew
          </span>
        </Link>
        <nav className="ml-auto flex gap-8">
         
          <Button
            
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-indigo-600"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </Button>
          {/* <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          >
            Get Started
          </Button> */}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="px-4 lg:px-6 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm border border-indigo-200">
                <Star className="w-4 h-4 text-indigo-200 fill-indigo-600" />
                <span className="text-indigo-200 font-medium ">
                  Rated Screen Recording Tool
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-slate-900">Create Amazing</span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Video Content
                  </span>
                  <br />
                  <span className="text-slate-900">In Seconds</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  Record your screen, webcam, or both with crystal-clear
                  quality. Share instantly with powerful collaboration tools
                  that make video creation effortless.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white border-0 h-14 text-lg font-semibold shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105"
                >
                  <Monitor className="w-5 h-5 mr-2" />
                  Start Recording Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 h-14 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-indigo-300"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Video
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">2M+</div>
                  <div className="text-sm text-slate-600">Videos Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">50K+</div>
                  <div className="text-sm text-slate-600">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Demo Video */}
            <div className="mt-20 max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200 p-8 shadow-2xl">
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]"></div>
                    <div className="text-center space-y-4 z-10">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <div>
                        <p className="text-white text-xl font-semibold">
                          See Vidiew in Action
                        </p>
                        <p className="text-slate-300">
                          Watch how easy it is to create professional videos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 lg:px-6 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Everything You Need to Create
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful features designed to make video creation simple, fast,
                and professional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-4 lg:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1  gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Vidiew</span>
              </div>
              <p className="text-slate-400">
                The easiest way to create and share professional videos.
              </p>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2025 Vidiew. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
