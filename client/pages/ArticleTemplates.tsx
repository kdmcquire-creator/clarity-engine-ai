import { ArrowRight, BookOpen, TrendingUp, Users, Lightbulb, CheckCircle, Quote, BarChart3, Clock, User as UserIcon } from 'lucide-react';

export interface ArticleTemplateProps {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  excerpt?: string;
}

export type TemplateType = 'hero-sidebar' | 'timeline' | 'card-grid' | 'split-screen' | 'infographic' | 'expert-interview' | 'scrollytelling' | 'data-dashboard';

// ============================================================================
// TEMPLATE 1: Hero + Sidebar (Feature-rich, editorial layout)
// ============================================================================
export const HeroSidebarTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-white">
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
        <div className="flex items-center gap-6 text-slate-300">
          <div className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <span className="text-sm">{readTime} min read</span>
        </div>
      </div>
    </div>

    {/* Content Grid */}
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 py-16">
      {/* Main Content */}
      <div className="md:col-span-2">
        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:col-span-1">
        <div className="sticky top-20 space-y-6">
          {/* Quick Summary Box */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Key Takeaways
            </h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Actionable insights for immediate implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Data-driven strategies backed by research</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Proven techniques from industry leaders</span>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold mb-2">Ready to Apply These Strategies?</h3>
            <p className="text-sm text-blue-100 mb-4">Use our free SEO tools to implement these techniques on your website.</p>
            <button className="w-full bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition font-semibold text-sm">
              Explore Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 2: Timeline Layout (Step-by-step process guide)
// ============================================================================
export const TimelineTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">{title}</h1>
        <div className="flex items-center justify-center gap-4 text-slate-600">
          <span>{author}</span>
          <span>•</span>
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-12 mb-16">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex gap-8">
            {/* Timeline Marker */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                {step}
              </div>
              {step < 5 && <div className="w-1 h-24 bg-gradient-to-b from-blue-400 to-blue-200 mt-4" />}
            </div>

            {/* Step Content */}
            <div className="pb-8 pt-2 flex-grow">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Step {step}: Key Process Point</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{content.slice(0, 250)}...</p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm cursor-pointer hover:gap-3 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Content */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 3: Card Grid Layout (Visual blocks for key concepts)
// ============================================================================
export const CardGridTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-white py-16">
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">{title}</h1>
        <p className="text-lg text-slate-600">{author} • {new Date(date).toLocaleDateString()} • {readTime} min read</p>
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Lightbulb, title: 'Key Insight 1', color: 'blue' },
          { icon: TrendingUp, title: 'Key Insight 2', color: 'green' },
          { icon: Users, title: 'Key Insight 3', color: 'purple' },
          { icon: CheckCircle, title: 'Key Insight 4', color: 'blue' },
          { icon: BookOpen, title: 'Key Insight 5', color: 'orange' },
          { icon: ArrowRight, title: 'Key Insight 6', color: 'red' },
        ].map((item, idx) => {
          const colorMap = {
            blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
            green: 'from-green-50 to-green-100 border-green-200 text-green-600',
            purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600',
            orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
            red: 'from-red-50 to-red-100 border-red-200 text-red-600',
          };
          const Icon = item.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${colorMap[item.color as keyof typeof colorMap]} p-6 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer group`}>
              <div className="w-12 h-12 bg-white rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className={`h-6 w-6 ${item.color === 'blue' ? 'text-blue-600' : item.color === 'green' ? 'text-green-600' : item.color === 'purple' ? 'text-purple-600' : item.color === 'orange' ? 'text-orange-600' : 'text-red-600'}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-700">{content.slice(0, 80)}...</p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="bg-slate-50 p-8 rounded-lg">
        <div className="prose prose-lg max-w-none text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 4: Split Screen (Comparison layout)
// ============================================================================
export const SplitScreenTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="max-w-6xl mx-auto px-4 py-16">
      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
        {category}
      </span>
      <h1 className="text-5xl font-bold text-slate-900 mb-6">{title}</h1>
      <div className="flex items-center gap-4 text-slate-600">
        <span>{author}</span>
        <span>•</span>
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{readTime} min read</span>
      </div>
    </div>

    {/* Split Screen Comparison */}
    <div className="bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Best Practices */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition">
            <h3 className="text-3xl font-bold text-green-900 mb-6 flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Best Practices
            </h3>
            <ul className="space-y-4">
              {['Strategy 1: Proven approach', 'Strategy 2: Industry standard', 'Strategy 3: Recommended technique', 'Strategy 4: High ROI method'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-lg border-l-4 border-red-600 shadow-lg hover:shadow-xl transition">
            <h3 className="text-3xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">✕</span>
              Common Mistakes
            </h3>
            <ul className="space-y-4">
              {['Mistake 1: Avoid this approach', 'Mistake 2: Common pitfall', 'Mistake 3: Costly error', 'Mistake 4: Frequent oversight'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl mt-0.5 flex-shrink-0">•</span>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Content */}
        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <div className="prose prose-lg max-w-none text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 5: Infographic Style (Data-heavy, visual statistics)
// ============================================================================
export const InfographicTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 py-16">
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Header */}
      <div className="text-center mb-16 text-white">
        <span className="inline-block px-4 py-2 bg-white bg-opacity-20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
          {category}
        </span>
        <h1 className="text-6xl font-bold mb-6 leading-tight">{title}</h1>
        <p className="text-xl text-blue-100">{author} • {new Date(date).toLocaleDateString()} • {readTime} min read</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        {[
          { stat: '87%', label: 'Improvement Rate' },
          { stat: '3.2x', label: 'ROI Increase' },
          { stat: '156%', label: 'Traffic Boost' },
          { stat: '42 days', label: 'Time to Results' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white bg-opacity-15 backdrop-blur-md p-8 rounded-lg text-center text-white border border-white border-opacity-30 hover:bg-opacity-25 transition group cursor-pointer">
            <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">{item.stat}</div>
            <div className="text-blue-100 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow-2xl p-12">
        <div className="prose prose-lg max-w-none text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 6: Expert Interview (Q&A format)
// ============================================================================
export const ExpertInterviewTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-white py-16">
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="mb-16">
        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">{title}</h1>
        <div className="flex items-center gap-4 text-slate-600 mb-8">
          <span className="font-semibold">Expert: {author}</span>
          <span>•</span>
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
          <p className="text-slate-700 italic">An in-depth conversation with industry experts about the latest trends and best practices in SEO and content marketing.</p>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="space-y-8 mb-16">
        {[1, 2, 3, 4, 5].map((q) => (
          <div key={q} className="border-l-4 border-purple-600 pl-6">
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-start gap-2">
                <span className="text-purple-600 font-bold">Q{q}:</span>
                <span>What is your perspective on question {q}?</span>
              </h3>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 leading-relaxed mb-4">{content.slice(0, 300)}...</p>
              <div className="flex items-start gap-2 text-slate-600">
                <Quote className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                <p className="italic text-slate-700">Key insight from the expert response</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Content */}
      <div className="bg-slate-50 p-8 rounded-lg">
        <div className="prose prose-lg max-w-none text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 7: Scrollytelling (Narrative with visual progression)
// ============================================================================
export const ScrollytellingTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
    <div className="max-w-4xl mx-auto px-4">
      {/* Sticky Header */}
      <div className="mb-32 sticky top-20 z-10">
        <span className="inline-block px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-6xl font-bold mb-6 leading-tight">{title}</h1>
        <p className="text-xl text-slate-300">{author} • {new Date(date).toLocaleDateString()} • {readTime} min read</p>
      </div>

      {/* Narrative Sections */}
      <div className="space-y-32">
        {[1, 2, 3, 4].map((section) => (
          <div key={section} className="relative">
            {/* Visual Marker */}
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900" />
            
            {/* Section Content */}
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition">
              <h2 className="text-3xl font-bold mb-4">Chapter {section}: Journey Point</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{content.slice(0, 250)}...</p>
              <div className="flex items-center gap-2 text-blue-400 font-semibold cursor-pointer hover:gap-3 transition-all">
                Continue reading <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Content */}
      <div className="mt-32 bg-slate-800 p-8 rounded-lg">
        <div className="prose prose-invert prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE 8: Data Dashboard (Analytics-focused)
// ============================================================================
export const DataDashboardTemplate: React.FC<ArticleTemplateProps> = ({
  title,
  content,
  author,
  date,
  category,
  readTime,
}) => (
  <div className="min-h-screen bg-slate-50 py-16">
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-16">
        <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
          {category}
        </span>
        <h1 className="text-5xl font-bold text-slate-900 mb-6">{title}</h1>
        <div className="flex items-center gap-4 text-slate-600 mb-8">
          <span>{author}</span>
          <span>•</span>
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {[
          { title: 'Key Metric 1', value: '2.4M', change: '+12%', color: 'blue' },
          { title: 'Key Metric 2', value: '87%', change: '+5%', color: 'green' },
          { title: 'Key Metric 3', value: '$45K', change: '+23%', color: 'purple' },
          { title: 'Key Metric 4', value: '156', change: '+8%', color: 'orange' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 hover:shadow-lg transition">
            <p className="text-slate-600 text-sm font-medium mb-2">{metric.title}</p>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-slate-900">{metric.value}</div>
              <div className="text-green-600 font-semibold text-sm">{metric.change}</div>
            </div>
            <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: '75%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { label: 'Trend Analysis', icon: TrendingUp },
          { label: 'Performance Insights', icon: BarChart3 },
          { label: 'Recommendations', icon: Lightbulb },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-indigo-600" />
                <h3 className="font-bold text-slate-900">{item.label}</h3>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{content.slice(0, 120)}...</p>
            </div>
          );
        })}
      </div>

      {/* Full Content */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none text-slate-700">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// TEMPLATE SELECTOR COMPONENT
// ============================================================================
interface TemplateRendererProps extends ArticleTemplateProps {
  templateType?: TemplateType;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateType = 'hero-sidebar',
  ...props
}) => {
  const templates: Record<TemplateType, React.ComponentType<ArticleTemplateProps>> = {
    'hero-sidebar': HeroSidebarTemplate,
    'timeline': TimelineTemplate,
    'card-grid': CardGridTemplate,
    'split-screen': SplitScreenTemplate,
    'infographic': InfographicTemplate,
    'expert-interview': ExpertInterviewTemplate,
    'scrollytelling': ScrollytellingTemplate,
    'data-dashboard': DataDashboardTemplate,
  };

  const Template = templates[templateType];
  return <Template {...props} />;
};

// ============================================================================
// TEMPLATE METADATA FOR SELECTION UI
// ============================================================================
export const TEMPLATE_METADATA: Record<TemplateType, { name: string; description: string; icon: string; cta: string }> = {
  'hero-sidebar': {
    name: 'Keyword Insights',
    description: 'Editorial layout with main content and sidebar callouts',
    icon: '🔍',
    cta: 'See how different perspectives on the same content drive engagement and help readers find exactly what they need.',
  },
  'timeline': {
    name: 'Ranking Roadmap',
    description: 'Step-by-step process guide with visual progression',
    icon: '🗺️',
    cta: 'Follow the journey from research to results. Our tools help you navigate every step and track your progress.',
  },
  'card-grid': {
    name: 'SEO Essentials',
    description: 'Visual blocks for key concepts and ideas',
    icon: '⚙️',
    cta: 'Break down complex SEO into digestible insights. Our tools make it easy to understand and apply each concept.',
  },
  'split-screen': {
    name: 'Best Practices vs Pitfalls',
    description: 'Side-by-side comparison of best practices vs mistakes',
    icon: '⚖️',
    cta: 'Learn what works and what doesn\'t. Our tools help you avoid costly mistakes and maximize your clicks.',
  },
  'infographic': {
    name: 'Data-Driven Strategy',
    description: 'Data-heavy layout with statistics and visual impact',
    icon: '📊',
    cta: 'Numbers tell the story. See how data shapes winning SEO strategies with our analytics tools.',
  },
  'expert-interview': {
    name: 'Expert Perspectives',
    description: 'Q&A format with expert insights and quotes',
    icon: '💡',
    cta: 'Learn from industry leaders. Our tools empower you to implement expert strategies and boost your rankings.',
  },
  'scrollytelling': {
    name: 'Content Evolution',
    description: 'Narrative-driven with visual progression',
    icon: '📖',
    cta: 'Watch your content strategy unfold. Our tools guide you through each phase of optimization and growth.',
  },
  'data-dashboard': {
    name: 'Performance Metrics',
    description: 'Analytics-focused with metrics and performance data',
    icon: '📈',
    cta: 'Track what matters. Our tools give you real-time insights to drive clicks, engagement, and conversions.',
  },
};
