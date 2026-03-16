import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Linkedin, Twitter, Globe, Award } from "lucide-react";
import { getAllAuthors } from "@/data/authors";

export default function Authors() {
  const authors = getAllAuthors();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/authors" className="text-blue-600 font-semibold transition">Authors</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Meet Our Expert Authors</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Learn from industry leaders with decades of combined SEO and content marketing expertise. Each author brings unique insights and proven strategies to help you succeed.
          </p>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link key={author.id} href={`/author/${author.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col group">
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{author.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-3">{author.title}</p>

                  {/* Bio Preview */}
                  <p className="text-slate-700 text-sm mb-4 line-clamp-3 flex-1">
                    {author.bio}
                  </p>

                  {/* Specialization */}
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    <p className="text-xs text-slate-600 font-semibold mb-2">SPECIALIZATION</p>
                    <p className="text-sm font-semibold text-blue-600">{author.specialization}</p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {author.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                      {author.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                          +{author.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{author.yearsExperience}</div>
                      <div className="text-xs text-slate-600">Years Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{author.articlesCount}</div>
                      <div className="text-xs text-slate-600">Articles</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 mb-4">
                    {author.social.linkedin && (
                      <a
                        href={author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-slate-100 hover:bg-blue-100 rounded transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4 text-blue-600" />
                      </a>
                    )}
                    {author.social.twitter && (
                      <a
                        href={author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-slate-100 hover:bg-blue-100 rounded transition"
                        title="Twitter"
                      >
                        <Twitter className="h-4 w-4 text-blue-600" />
                      </a>
                    )}
                    {author.social.website && (
                      <a
                        href={author.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-slate-100 hover:bg-blue-100 rounded transition"
                        title="Website"
                      >
                        <Globe className="h-4 w-4 text-blue-600" />
                      </a>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Profile
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Trust Our Authors?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Industry Experts</h3>
              <p className="text-slate-700">
                Each author brings 6-10 years of hands-on SEO and content marketing experience.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Data-Driven</h3>
              <p className="text-slate-700">
                All strategies are backed by real data and proven results from hundreds of clients.
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certified</h3>
              <p className="text-slate-700">
                Our authors hold multiple industry certifications and continue their education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
