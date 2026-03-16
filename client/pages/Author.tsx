import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Linkedin, Twitter, Globe, BookOpen, Award } from "lucide-react";
import { getAuthorById, getAllAuthors } from "@/data/authors";

export default function Author() {
  const [match, params] = useRoute("/author/:id");

  if (!match) return null;

  const author = getAuthorById(params?.id);

  if (!author) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
              <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
              <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
              <Link href="/authors" className="text-slate-600 hover:text-slate-900 transition">Authors</Link>
            </div>
          </div>
        </nav>

        <div className="container py-24 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Author Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">The author you're looking for doesn't exist.</p>
          <Link href="/authors">
            <Button>← Back to Authors</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/authors" className="text-slate-600 hover:text-slate-900 transition">Authors</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container">
          <Link href="/authors">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Authors
            </Button>
          </Link>
        </div>
      </div>

      {/* Author Profile */}
      <div className="container max-w-4xl py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Author Image & Info */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <img
                src={author.image}
                alt={author.name}
                className="w-full rounded-xl shadow-lg mb-6 aspect-square object-cover"
              />
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{author.name}</h1>
              <p className="text-lg text-blue-600 font-semibold mb-4">{author.title}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">{author.yearsExperience}</div>
                  <div className="text-xs text-slate-600">Years Experience</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">{author.articlesCount}</div>
                  <div className="text-xs text-slate-600">Articles Published</div>
                </Card>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {author.social.linkedin && (
                  <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                )}
                {author.social.twitter && (
                  <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                  </a>
                )}
              </div>

              {author.social.website && (
                <a href={author.social.website} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Author Bio & Details */}
          <div className="md:col-span-2">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
              <p className="text-lg text-slate-700 leading-relaxed">{author.bio}</p>
            </div>

            <Separator className="my-8" />

            {/* Specialization */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">Specialization</h3>
              </div>
              <p className="text-lg text-slate-700 font-semibold text-blue-600">{author.specialization}</p>
            </div>

            <Separator className="my-8" />

            {/* Expertise */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {author.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Credentials */}
            {author.credentials && author.credentials.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Credentials & Certifications</h3>
                <ul className="space-y-3">
                  {author.credentials.map((credential) => (
                    <li key={credential} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-700 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-slate-700 font-medium">{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="my-8" />

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Read {author.name}'s Articles</h3>
              <p className="text-slate-700 mb-6">
                Explore {author.articlesCount} in-depth articles on {author.specialization.toLowerCase()} and related topics.
              </p>
              <Link href={`/resources?author=${author.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Authors */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Other Expert Authors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {getAllAuthors()
              .filter((a) => a.id !== author.id)
              .slice(0, 3)
              .map((relatedAuthor) => (
                <Link key={relatedAuthor.id} href={`/author/${relatedAuthor.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
                    <img
                      src={relatedAuthor.image}
                      alt={relatedAuthor.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{relatedAuthor.name}</h3>
                      <p className="text-sm text-blue-600 font-semibold mb-3">{relatedAuthor.title}</p>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-4">{relatedAuthor.bio}</p>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{relatedAuthor.yearsExperience} years exp.</span>
                        <span>{relatedAuthor.articlesCount} articles</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
