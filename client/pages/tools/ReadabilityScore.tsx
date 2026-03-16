import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface ReadabilityMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordsPerSentence: number;
  averageWordsPerParagraph: number;
  fleschKincaidGrade: number;
  fleschReadingEase: number;
  readabilityLevel: string;
}

export default function ReadabilityScore() {
  const [text, setText] = useState("");
  const [metrics, setMetrics] = useState<ReadabilityMetrics | null>(null);

  const calculateReadability = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    // Count words
    const words = text.match(/\b\w+\b/g) || [];
    const wordCount = words.length;

    // Count sentences (rough estimate)
    const sentences = text.match(/[.!?]+/g) || [];
    const sentenceCount = Math.max(1, sentences.length);

    // Count paragraphs
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
    const paragraphCount = Math.max(1, paragraphs.length);

    // Calculate averages
    const averageWordsPerSentence = wordCount / sentenceCount;
    const averageWordsPerParagraph = wordCount / paragraphCount;

    // Flesch-Kincaid Grade Level
    const syllables = countSyllables(text);
    const fleschKincaidGrade =
      0.39 * (wordCount / sentenceCount) +
      11.8 * (syllables / wordCount) -
      15.59;

    // Flesch Reading Ease
    const fleschReadingEase =
      206.835 -
      1.015 * (wordCount / sentenceCount) -
      84.6 * (syllables / wordCount);

    // Determine readability level
    let readabilityLevel = "";
    if (fleschReadingEase >= 90) readabilityLevel = "Very Easy";
    else if (fleschReadingEase >= 80) readabilityLevel = "Easy";
    else if (fleschReadingEase >= 70) readabilityLevel = "Fairly Easy";
    else if (fleschReadingEase >= 60) readabilityLevel = "Standard";
    else if (fleschReadingEase >= 50) readabilityLevel = "Fairly Difficult";
    else if (fleschReadingEase >= 30) readabilityLevel = "Difficult";
    else readabilityLevel = "Very Difficult";

    setMetrics({
      wordCount,
      sentenceCount,
      paragraphCount,
      averageWordsPerSentence: Math.round(averageWordsPerSentence * 10) / 10,
      averageWordsPerParagraph: Math.round(averageWordsPerParagraph * 10) / 10,
      fleschKincaidGrade: Math.round(fleschKincaidGrade * 10) / 10,
      fleschReadingEase: Math.round(fleschReadingEase * 10) / 10,
      readabilityLevel,
    });

    toast.success("Readability analysis complete");
  };

  const countSyllables = (text: string): number => {
    const words = text.match(/\b\w+\b/g) || [];
    let syllableCount = 0;

    words.forEach((word) => {
      syllableCount += estimateSyllables(word);
    });

    return Math.max(1, syllableCount);
  };

  const estimateSyllables = (word: string): number => {
    word = word.toLowerCase();
    let count = 0;
    const vowels = "aeiouy";
    let previousWasVowel = false;

    for (let i = 0; i < word.length; i++) {
      const isVowel = vowels.includes(word[i]);
      if (isVowel && !previousWasVowel) {
        count++;
      }
      previousWasVowel = isVowel;
    }

    // Adjust for silent e
    if (word.endsWith("e")) {
      count--;
    }

    // Ensure at least 1 syllable
    return Math.max(1, count);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-blue-50 border-blue-200";
    if (score >= 40) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            SEO Toolkit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/tools">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Readability Score Analyzer
            </h1>
            <p className="text-lg text-slate-600">
              Measure the readability of your content using industry-standard formulas. Ensure your content is accessible to your target audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Paste Your Content</h2>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your article, blog post, or any text content here..."
                  rows={12}
                  className="mb-4"
                />

                <Button
                  onClick={calculateReadability}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Analyze Readability
                </Button>
              </Card>
            </div>

            {/* Results Sidebar */}
            <div className="space-y-6">
              {metrics && (
                <>
                  {/* Main Score */}
                  <Card
                    className={`p-6 border ${getScoreBgColor(metrics.fleschReadingEase)}`}
                  >
                    <div className="text-center">
                      <p className="text-sm text-slate-600 mb-2">Flesch Reading Ease</p>
                      <p
                        className={`text-5xl font-bold ${getScoreColor(
                          metrics.fleschReadingEase
                        )}`}
                      >
                        {metrics.fleschReadingEase}
                      </p>
                      <p className="text-lg font-semibold text-slate-900 mt-3">
                        {metrics.readabilityLevel}
                      </p>
                    </div>
                  </Card>

                  {/* Grade Level */}
                  <Card className="p-6 bg-white border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">Grade Level</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {metrics.fleschKincaidGrade}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Flesch-Kincaid Grade Level
                    </p>
                  </Card>

                  {/* Statistics */}
                  <Card className="p-6 bg-white border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-4">Statistics</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Words</span>
                        <span className="font-semibold text-slate-900">
                          {metrics.wordCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sentences</span>
                        <span className="font-semibold text-slate-900">
                          {metrics.sentenceCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Paragraphs</span>
                        <span className="font-semibold text-slate-900">
                          {metrics.paragraphCount}
                        </span>
                      </div>
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-slate-600">Avg Words/Sentence</span>
                          <span className="font-semibold text-slate-900">
                            {metrics.averageWordsPerSentence}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Avg Words/Paragraph</span>
                          <span className="font-semibold text-slate-900">
                            {metrics.averageWordsPerParagraph}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Tips */}
                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Improvement Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>• Keep sentences under 15 words</li>
                      <li>• Use short paragraphs (3-5 sentences)</li>
                      <li>• Aim for grade level 8-10</li>
                      <li>• Use simple, common words</li>
                    </ul>
                  </Card>
                </>
              )}

              {!metrics && (
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <p className="text-slate-600 text-center">
                    Paste your content and click "Analyze Readability" to see detailed metrics.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 SEO Toolkit. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
