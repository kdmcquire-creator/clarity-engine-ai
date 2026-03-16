import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Twitter, Globe } from "lucide-react";
import { Link } from "wouter";
import { getAuthorByName } from "@/data/authors";

interface AuthorBylineProps {
  authorName: string;
  articleCategory?: string;
  articleTitle?: string;
}

export function AuthorByline({
  authorName,
  articleCategory,
  articleTitle,
}: AuthorBylineProps) {
  const author = getAuthorByName(authorName);

  if (!author) {
    return null;
  }

  // Convert author name to slug for URL
  const authorSlug = authorName
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-blue-200 overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex gap-6 items-start">
          {/* Author Image */}
          <div className="flex-shrink-0">
            <img
              src={author.image}
              alt={author.name}
              className="w-20 h-20 rounded-lg object-cover ring-2 ring-blue-200"
            />
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {author.title}
              </Badge>
            </div>

            <p className="text-sm text-slate-700 mb-3 line-clamp-2">
              {author.bio}
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {author.expertise.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-xs bg-white border-blue-200 text-blue-700"
                >
                  {skill}
                </Badge>
              ))}
              {author.expertise.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-white border-blue-200 text-blue-700"
                >
                  +{author.expertise.length - 3} more
                </Badge>
              )}
            </div>

            {/* Social Links & CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex gap-2">
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-slate-600" />
                  </a>
                )}
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4 text-slate-600" />
                  </a>
                )}
                {author.socialLinks.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition"
                    title="Website"
                  >
                    <Globe className="w-4 h-4 text-slate-600" />
                  </a>
                )}
              </div>

              <Link href={`/author/${authorSlug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                >
                  View Profile
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-shrink-0 text-right hidden sm:block">
            <div className="text-2xl font-bold text-blue-600">{author.yearsExperience}</div>
            <div className="text-xs text-slate-600 font-medium">Years Experience</div>
            <div className="mt-3 text-2xl font-bold text-slate-900">{author.articlesPublished}</div>
            <div className="text-xs text-slate-600 font-medium">Articles</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
