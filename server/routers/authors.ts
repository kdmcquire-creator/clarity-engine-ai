export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  articlesCount: number;
  yearsExperience: number;
  specialization: string;
  credentials?: string[];
}

export const authors: Record<string, Author> = {
  'eleanor-vance': {
    id: 'eleanor-vance',
    name: 'Eleanor Vance',
    title: 'SEO Strategist & Content Director',
    bio: 'Eleanor is a seasoned SEO strategist with a passion for turning data into actionable insights. With over 8 years in the industry, she specializes in technical SEO and has helped dozens of agencies scale their content operations. When she\'s not optimizing for search, you\'ll find her writing about SEO trends on her personal blog.',
    expertise: ['Technical SEO', 'Content Strategy', 'Keyword Research', 'Link Building', 'SEO Audits'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/eleanor-vance',
      twitter: 'https://twitter.com/eleanor_seo',
      website: 'https://eleanorseo.com',
    },
    articlesCount: 24,
    yearsExperience: 8,
    specialization: 'Technical SEO & Site Architecture',
    credentials: ['Google Analytics Certified', 'HubSpot Inbound Certified'],
  },
  'david-kim': {
    id: 'david-kim',
    name: 'David Kim',
    title: 'Content Marketing Specialist',
    bio: 'David brings a unique perspective to SEO through his background in journalism and digital marketing. He\'s obsessed with creating content that ranks AND converts. His data-driven approach to content strategy has helped clients increase organic traffic by an average of 300% in their first year.',
    expertise: ['Content Marketing', 'Copywriting', 'User Intent', 'Conversion Optimization', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/david-kim-seo',
      twitter: 'https://twitter.com/david_content',
      website: 'https://davidkim.io',
    },
    articlesCount: 31,
    yearsExperience: 6,
    specialization: 'Content Strategy & User Intent',
    credentials: ['Certified Content Marketer', 'Google Search Console Expert'],
  },
  'marcus-thorne': {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    title: 'Technical SEO Engineer',
    bio: 'Marcus is a technical SEO expert who speaks the language of both marketers and developers. With a background in web development, he understands the technical challenges behind SEO implementation. He\'s passionate about helping teams overcome technical barriers to ranking.',
    expertise: ['Technical SEO', 'Site Speed', 'Core Web Vitals', 'Schema Markup', 'JavaScript SEO'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/marcus-thorne',
      twitter: 'https://twitter.com/marcus_tech_seo',
      website: 'https://marcustechseo.com',
    },
    articlesCount: 18,
    yearsExperience: 7,
    specialization: 'Technical SEO & Performance',
    credentials: ['Certified Web Performance Specialist', 'Google Core Web Vitals Expert'],
  },
  'sarah-chen': {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'E-commerce SEO Specialist',
    bio: 'Sarah specializes in e-commerce SEO and has helped over 50 online stores increase their organic revenue. She combines technical expertise with deep product knowledge to create SEO strategies that drive real sales. Her approach focuses on the entire customer journey, from discovery to conversion.',
    expertise: ['E-commerce SEO', 'Product Optimization', 'Conversion Rate Optimization', 'Marketplace SEO', 'Schema for E-commerce'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-chen-ecom',
      twitter: 'https://twitter.com/sarah_ecom_seo',
      website: 'https://sarahchenseo.com',
    },
    articlesCount: 22,
    yearsExperience: 9,
    specialization: 'E-commerce SEO & Revenue Growth',
    credentials: ['Shopify SEO Expert', 'Conversion Rate Optimization Certified'],
  },
  'james-rodriguez': {
    id: 'james-rodriguez',
    name: 'James Rodriguez',
    title: 'Link Building & Outreach Strategist',
    bio: 'James has built thousands of high-quality backlinks for clients across diverse industries. His strategic approach to link building focuses on relevance and authority. He\'s known for his creative outreach strategies that get results without being spammy.',
    expertise: ['Link Building', 'Outreach Strategy', 'Competitor Analysis', 'Authority Building', 'PR & SEO'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/james-rodriguez-seo',
      twitter: 'https://twitter.com/james_linkbuild',
      website: 'https://jamesrodriguezseo.com',
    },
    articlesCount: 19,
    yearsExperience: 10,
    specialization: 'Link Building & Authority',
    credentials: ['Outreach Specialist Certified', 'Digital PR Expert'],
  },
  'lisa-wang': {
    id: 'lisa-wang',
    name: 'Lisa Wang',
    title: 'Local SEO & Business Growth Consultant',
    bio: 'Lisa specializes in helping local businesses and multi-location enterprises dominate their local search results. Her strategies combine local SEO best practices with community engagement tactics. She\'s helped hundreds of businesses increase foot traffic and local inquiries through SEO.',
    expertise: ['Local SEO', 'Google My Business', 'Citation Building', 'Review Management', 'Local Content'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    social: {
      linkedin: 'https://linkedin.com/in/lisa-wang-local-seo',
      twitter: 'https://twitter.com/lisa_local_seo',
      website: 'https://lisawangseo.com',
    },
    articlesCount: 26,
    yearsExperience: 8,
    specialization: 'Local SEO & Multi-Location Strategy',
    credentials: ['Google My Business Expert', 'Local SEO Certified'],
  },
};

export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getAuthorByName(name: string): (Author & { socialLinks?: any; articlesPublished?: number }) | undefined {
  const author = Object.values(authors).find(a => a.name === name);
  if (author) {
    return {
      ...author,
      socialLinks: author.social,
      articlesPublished: author.articlesCount,
    };
  }
  return undefined;
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
