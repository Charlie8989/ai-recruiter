import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  Brain,
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  Users,
  Target,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,200 Q400,100 800,200 T1600,200"
              fill="none"
              stroke="#b3c0ff"
              strokeWidth="2"
            />
            <path
              d="M0,400 Q400,300 800,400 T1600,400"
              fill="none"
              stroke="#b3c0ff"
              strokeWidth="2"
            />
            <path
              d="M0,600 Q400,500 800,600 T1600,600"
              fill="none"
              stroke="#b3c0ff"
              strokeWidth="2"
            />
          </svg>
        </div>

        <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-[#353562] tracking-tight">
              BOLOBOSS
            </h1>
          </div>
          <Link href="/auth">
            <Button className="bg-[#0A2540]">Sign Up</Button>
          </Link>
        </header>

        <section className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-32">
          <div className="text-center max-w-4xl">
            <p className="text-[#353562] text-xl mb-4 font-medium">Your</p>
            <h2 className="text-[#353562] text-7xl font-bold mb-6 leading-tight">
              AI Interview Coach !
            </h2>
            <p className="text-[#1E3A5F] text-lg italic mb-12">
              Practice smarter. Get instant feedback. Speak like a boss
            </p>

            <div className="flex items-center justify-center gap-6">
              <Link href="/auth">
                <Button className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white px-10 py-6 text-lg rounded-md font-medium">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <ChevronDown className="w-12 h-12 text-[#353562] animate-bounce" />
          </div>
        </section>
      </div>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-[#353562] mb-4">
              How It Works
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Master your interview skills with AI-powered practice sessions and
              real-time feedback
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#b3c0ff] bg-[#f0f0ff] hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-[#353562] mb-4">
                  Choose Your Role
                </h4>
                <p className="text-gray-700">
                  Select from various job roles and industries. Our AI adapts to
                  your specific career path and interview needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#b3c0ff] bg-[#f0f0ff] hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-[#353562] mb-4">
                  Practice Live
                </h4>
                <p className="text-gray-700">
                  Engage in realistic AI-powered interviews. Answer questions
                  naturally and get instant responses just like a real
                  interview.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#b3c0ff] bg-[#f0f0ff] hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-[#353562] mb-4">
                  Get Feedback
                </h4>
                <p className="text-gray-700">
                  Receive detailed analysis of your performance. Identify
                  strengths and areas for improvement with actionable insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Choose BoloBoss?
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The most comprehensive AI interview preparation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h5 className="text-xl font-bold text-white mb-2">
                24/7 Availability
              </h5>
              <p className="text-gray-300">
                Practice anytime, anywhere at your own pace
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h5 className="text-xl font-bold text-white mb-2">
                Expert Feedback
              </h5>
              <p className="text-gray-300">
                AI trained on thousands of successful interviews
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h5 className="text-xl font-bold text-white mb-2">
                Multiple Industries
              </h5>
              <p className="text-gray-300">
                Tailored questions for every career field
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#353562] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h5 className="text-xl font-bold text-white mb-2">
                Track Progress
              </h5>
              <p className="text-gray-300">
                Monitor improvement over time with analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-[#353562] mb-6">
                Real-Time AI Analysis
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                Our advanced AI technology evaluates your responses in
                real-time, providing instant feedback on your communication
                skills, content quality, and interview performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#353562] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">
                      Answer Quality Assessment
                    </h5>
                    <p className="text-gray-600">
                      Get scored on relevance, clarity, and depth of your
                      responses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#353562] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">
                      Communication Skills
                    </h5>
                    <p className="text-gray-600">
                      Improve your articulation, pace, and professional language
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#353562] flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">
                      Personalized Tips
                    </h5>
                    <p className="text-gray-600">
                      Receive custom recommendations for your specific role
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f0f0ff] border-2 border-[#b3c0ff] rounded-lg p-8">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-[#353562]" />
                    <span className="font-bold text-gray-900">Question:</span>
                  </div>
                  <p className="text-gray-700">
                    Tell me about a challenging project you worked on.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-[#0A2540]" />
                    <span className="font-bold text-gray-900">
                      Your Answer:
                    </span>
                  </div>
                  <p className="text-gray-700 italic">
                    AI listens and analyzes your response...
                  </p>
                </div>
                <div className="bg-[#353562] rounded-lg p-4 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-bold">Instant Feedback:</span>
                  </div>
                  <p className="text-sm">
                    Great structure! Consider adding specific metrics to
                    strengthen your impact.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded text-xs">
                      Score: 8.5/10
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded text-xs">
                      Clarity: Excellent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[#f0f0ff]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-[#353562] mb-6">
            Ready to Ace Your Next Interview?
          </h3>
          <p className="text-gray-700 text-lg mb-10">
            Join thousands of professionals who have improved their interview
            skills with BoloBoss. Start practicing today and land your dream
            job.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Button className="bg-[#353562] hover:bg-[#353562]/90 text-white w-full px-12 py-6 text-lg rounded-md font-medium">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0A2540] text-white py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">BOLOBOSS</h4>
              <p className="text-gray-300 text-sm">
                Your AI-powered interview coach for career success.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="hover:text-white transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="hover:text-white transition-colors"
                  >
                    Interview Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-left text-gray-400 text-sm">
            <p className="text-white font-bold text-lg"> Code By CHARLIE ❤️ </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
