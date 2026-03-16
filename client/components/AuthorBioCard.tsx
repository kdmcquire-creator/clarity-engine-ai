import React from 'react';
import { Mail, Linkedin, Twitter, Globe } from 'lucide-react';

interface AuthorBio {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

const authorBios: Record<string, AuthorBio> = {
  'Eleanor Vance': {
    name: 'Eleanor Vance',
    title: 'SEO Strategy Director',
    bio: 'Eleanor has 8+ years of experience in SEO strategy and content optimization. She specializes in enterprise-level SEO implementations and has helped 50+ companies achieve top rankings for competitive keywords.',
    avatar: '👩‍💼',
    email: 'eleanor@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/eleanor-vance',
    twitter: 'https://twitter.com/eleanor_vance',
  },
  'Marcus Thorne': {
    name: 'Marcus Thorne',
    title: 'Technical SEO Expert',
    bio: 'Marcus is a technical SEO specialist with 10+ years of experience. He focuses on site architecture, crawlability, and Core Web Vitals optimization. His clients average 40% traffic increases within 6 months.',
    avatar: '👨‍💻',
    email: 'marcus@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/marcus-thorne',
    twitter: 'https://twitter.com/marcus_thorne',
  },
  'Sophia Chen': {
    name: 'Sophia Chen',
    title: 'Content Marketing Lead',
    bio: 'Sophia leads our content strategy team with 7+ years of experience in creating SEO-optimized content. She has written 200+ articles that rank in Google\'s top 10 for competitive keywords.',
    avatar: '👩‍🎓',
    email: 'sophia@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/sophia-chen',
    twitter: 'https://twitter.com/sophia_chen',
  },
  'David Kim': {
    name: 'David Kim',
    title: 'Link Building Specialist',
    bio: 'David specializes in strategic link building and has built 10,000+ high-quality backlinks for clients across various industries. He focuses on sustainable, white-hat link acquisition strategies.',
    avatar: '👨‍🔬',
    email: 'david@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/david-kim',
    twitter: 'https://twitter.com/david_kim',
  },
  'Isabella Rossi': {
    name: 'Isabella Rossi',
    title: 'Analytics & Data Specialist',
    bio: 'Isabella brings 6+ years of data analytics expertise to SEO. She specializes in conversion rate optimization and using data to drive strategic decisions. Her clients see an average 35% increase in conversions.',
    avatar: '📊',
    email: 'isabella@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/isabella-rossi',
    twitter: 'https://twitter.com/isabella_rossi',
  },
  'Jamal Adebayo': {
    name: 'Jamal Adebayo',
    title: 'Local SEO Expert',
    bio: 'Jamal specializes in local SEO and has helped 200+ businesses dominate their local search results. He focuses on Google My Business optimization, local citations, and review management.',
    avatar: '🗺️',
    email: 'jamal@clarity-engine.ai',
    linkedin: 'https://linkedin.com/in/jamal-adebayo',
    twitter: 'https://twitter.com/jamal_adebayo',
  },
};

interface AuthorBioCardProps {
  authorName: string;
  layout?: 'card' | 'inline' | 'expanded';
}

// Card layout (end of article)
export const AuthorBioCard: React.FC<AuthorBioCardProps> = ({ authorName, layout = 'card' }) => {
  const author = authorBios[authorName];

  if (!author) return null;

  if (layout === 'inline') {
    return (
      <div className="flex items-center gap-4 py-4 px-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-4xl">{author.avatar}</div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900">{author.name}</div>
          <div className="text-sm text-slate-600">{author.title}</div>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{author.bio}</p>
        </div>
      </div>
    );
  }

  if (layout === 'expanded') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200 my-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 text-center">
            <div className="text-8xl mb-4">{author.avatar}</div>
            <h3 className="text-xl font-bold text-slate-900">{author.name}</h3>
            <p className="text-sm text-blue-600 font-medium mt-1">{author.title}</p>
          </div>
          <div className="flex-1">
            <p className="text-slate-700 leading-relaxed mb-6">{author.bio}</p>
            <div className="flex flex-wrap gap-3">
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              )}
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card layout
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 my-8">
      <div className="flex gap-4">
        <div className="text-5xl flex-shrink-0">{author.avatar}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
          <p className="text-sm text-blue-600 font-medium mb-3">{author.title}</p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">{author.bio}</p>
          <div className="flex flex-wrap gap-2">
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium text-slate-700 transition"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium text-slate-700 transition"
              >
                <Linkedin className="h-3 w-3" />
                LinkedIn
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium text-slate-700 transition"
              >
                <Twitter className="h-3 w-3" />
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Author grid (for team page or resources overview)
export const AuthorGrid: React.FC = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {Object.entries(authorBios).map(([name, author]) => (
      <div key={name} className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition text-center">
        <div className="text-6xl mb-4">{author.avatar}</div>
        <h3 className="font-bold text-slate-900 mb-1">{author.name}</h3>
        <p className="text-sm text-blue-600 font-medium mb-3">{author.title}</p>
        <p className="text-xs text-slate-600 line-clamp-3 mb-4">{author.bio}</p>
        <div className="flex justify-center gap-2">
          {author.linkedin && (
            <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded transition">
              <Linkedin className="h-4 w-4 text-slate-600 hover:text-blue-600" />
            </a>
          )}
          {author.twitter && (
            <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-100 rounded transition">
              <Twitter className="h-4 w-4 text-slate-600 hover:text-blue-600" />
            </a>
          )}
          {author.email && (
            <a href={`mailto:${author.email}`} className="p-2 hover:bg-slate-100 rounded transition">
              <Mail className="h-4 w-4 text-slate-600 hover:text-blue-600" />
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
);
