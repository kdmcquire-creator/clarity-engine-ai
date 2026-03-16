import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, CheckCircle, Lock, BookOpen, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const certifications = [
  {
    id: "keyword-master",
    name: "Keyword Research Master",
    description: "Master keyword research and analysis techniques",
    icon: "🔍",
    difficulty: "Beginner",
    duration: "2 hours",
    lessons: 5,
    quiz: { questions: 10, passingScore: 80 },
    completed: true,
    earnedDate: "2026-02-15",
  },
  {
    id: "content-optimizer",
    name: "Content Optimization Expert",
    description: "Learn to optimize content for search engines and users",
    icon: "✍️",
    difficulty: "Intermediate",
    duration: "3 hours",
    lessons: 7,
    quiz: { questions: 15, passingScore: 85 },
    completed: true,
    earnedDate: "2026-02-28",
  },
  {
    id: "technical-seo",
    name: "Technical SEO Specialist",
    description: "Master technical SEO implementation and auditing",
    icon: "⚙️",
    difficulty: "Advanced",
    duration: "4 hours",
    lessons: 10,
    quiz: { questions: 20, passingScore: 85 },
    completed: false,
    progress: 65,
  },
  {
    id: "link-builder",
    name: "Link Building Strategist",
    description: "Build effective backlink strategies",
    icon: "🔗",
    difficulty: "Intermediate",
    duration: "3 hours",
    lessons: 8,
    quiz: { questions: 12, passingScore: 80 },
    completed: false,
    progress: 0,
  },
  {
    id: "analytics-pro",
    name: "Analytics & Reporting Pro",
    description: "Master SEO analytics and reporting",
    icon: "📊",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    lessons: 6,
    quiz: { questions: 10, passingScore: 80 },
    completed: false,
    progress: 0,
  },
  {
    id: "ecommerce-seo",
    name: "E-commerce SEO Master",
    description: "Optimize e-commerce sites for search engines",
    icon: "🛒",
    difficulty: "Advanced",
    duration: "4 hours",
    lessons: 9,
    quiz: { questions: 18, passingScore: 85 },
    completed: false,
    progress: 0,
  },
];

export default function Certifications() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Sign In Required</h1>
          <p className="text-slate-600 mb-8">Please sign in to access certifications.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completedCount = certifications.filter((c) => c.completed).length;
  const inProgressCount = certifications.filter((c) => !c.completed && c.progress && c.progress > 0).length;

  const handleStartCertification = (certId: string) => {
    toast.success("Starting certification course...");
    setSelectedCert(certId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Clarity Engine Certifications</h1>
          <p className="text-slate-600">Master SEO with our comprehensive certification programs and earn badges to showcase your expertise.</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Certifications Earned</h3>
              <Award className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
            <p className="text-xs text-slate-500 mt-2">of {certifications.length} available</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">In Progress</h3>
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{inProgressCount}</p>
            <p className="text-xs text-slate-500 mt-2">courses active</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Learning Hours</h3>
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">12.5</p>
            <p className="text-xs text-slate-500 mt-2">total completed</p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Available Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{cert.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-900">{cert.name}</h3>
                      <p className="text-sm text-slate-600">{cert.description}</p>
                    </div>
                  </div>
                  {cert.completed && <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-slate-600">Difficulty:</span>
                    <p className="font-semibold text-slate-900">{cert.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Duration:</span>
                    <p className="font-semibold text-slate-900">{cert.duration}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Lessons:</span>
                    <p className="font-semibold text-slate-900">{cert.lessons}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Quiz:</span>
                    <p className="font-semibold text-slate-900">{cert.quiz.questions} questions</p>
                  </div>
                </div>

                {!cert.completed && cert.progress !== undefined && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-600">Progress</span>
                      <span className="text-sm font-semibold text-slate-900">{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {cert.completed ? (
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/certifications/${cert.id}`}>View Certificate</Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Retake Quiz
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleStartCertification(cert.id)}
                    className="w-full"
                  >
                    {cert.progress && cert.progress > 0 ? "Continue Course" : "Start Course"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Badge Showcase */}
        <div className="mt-16 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications
              .filter((c) => c.completed)
              .map((cert) => (
                <div key={cert.id} className="text-center">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 text-5xl shadow-lg">
                    {cert.icon}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">{cert.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">Earned {cert.earnedDate}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
