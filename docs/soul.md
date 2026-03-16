# User Preferences

- **Expectation Level**: Perfection — zero tolerance for incomplete or broken features
- **Communication Style**: Prefers autonomous problem-solving without constant back-and-forth
- **Email**: moonsmoke.contact@gmail.com
- **Values**: Professional polished output, autonomous execution, clear status updates, complete solutions (not partial fixes), no wasted back-and-forth

---

# Active Project: Clarity Engine

**Description**: Professional SEO & Content Marketing Tool Cluster designed to help entrepreneurs, marketers, and creators rank higher, write better, and grow faster through curated free SEO tools and educational content.

## Key URLs
- **Live URL**: https://clarity-engine.ai
- **Backup URL**: https://seotools-gashekdy.manus.space
- **Project Path**: /home/ubuntu/seo-tool-cluster
- **Latest Checkpoint**: manus-webdev://b38c9f99

## Tech Stack
- React 19 + Tailwind CSS 4 + Express 4 + tRPC 11 + Drizzle ORM
- Database: MySQL/TiDB
- Email: SendGrid (noreply@em7072.clarity-engine.ai)
- Auth: Manus OAuth
- Hosting: Manus Platform with custom domain via Cloudflare DNS
- Domain Registrar: Namecheap

## Key Features Implemented
1. 6 SEO Tools (Keyword Density, Meta Tag Generator, Backlink Analyzer, Content Gap Analyzer, Readability Score, Schema Markup Generator)
2. Email System (Welcome, Password Reset, Weekly Newsletter, Bulk Campaigns, Subscriber Notifications) — all working via SendGrid
3. Email Management (Preference Center, Admin Analytics Dashboard, Drip Campaign Builder)
4. Content Platform (Blog with articles, comments, author profiles, recommended tools)
5. User Authentication (Manus OAuth with admin/user roles)

## Critical Issues (as of March 13, 2026)
1. **Author Bio Placement** — appears at TOP of articles instead of BOTTOM (Article.tsx)
2. **HTML in Teasers** — "Key Insight" cards show raw HTML tags instead of clean text
3. **Browser Tab Title** — fixed in code but NOT deployed (checkpoint b38c9f99 not published)
4. **Welcome Tour Modal** — removed in code but NOT deployed
5. **Broken Tool Links** — fixed in code but NOT deployed
6. **Sticky Header Transparency** — fixed in code but NOT deployed

## Deployment Gap
All code fixes exist in dev but the live site is on a previous checkpoint. Checkpoint b38c9f99 contains all fixes but has NOT been published to production yet.

## Remaining Work
### High Priority
- Republish checkpoint b38c9f99
- Move author bio to bottom of articles (Article.tsx)
- Strip HTML from article teasers
- Verify all fixes on production
- Test email flows end-to-end

### Medium Priority
- Populate blog with more sample articles
- Implement About, Contact, Resources, FAQ pages
- Add search functionality
- Connect analytics to real SendGrid data

### Low Priority (Future)
- Email template visual editor
- Campaign scheduling with timezone support
- A/B testing for emails
- Advanced analytics and reporting

## Affiliate Program Credentials
- **Mangools**: Affiliate ID #a69b590a66aee08840d5414cd, API Key 21e01b031460b1c8499707b7117c58826a9b31519369141c821ee348340faf02
- **SE Ranking**: https://seranking.com/?ga=5009081&source=link
- **Serpstat**: Applied (pending)
- **Surfer SEO**: Applied (pending)
- **Amazon Associates**: Store ID clarityengine-20
- **ShareASale**: Applied (pending)
- **Kit/ConvertKit**: Applied (pending)
- **ActiveCampaign**: Applied (pending)
- **Cloudways**: Applied (pending)
- **PartnerStack**: Profile created

## AdSense
- Publisher ID: pub-5995172189982724
- ads.txt: deployed to site root

## SendGrid Email Templates
- Welcome Email: d-3650aed48e8547668fe798a4fed1bbc5
- Password Reset: d-629dfbab946c462bbbf1b6ffc63f6113
- Weekly Newsletter: d-8174c8327e9b40a4a2dbc0193d1402b4

## Testing Checklist
- Browser tab shows "Clarity Engine"
- No welcome tour modal on homepage
- All 6 tool links work
- Author bio at BOTTOM of articles
- Key Insight cards show clean text (no HTML)
- Sticky header is solid white
- Newsletter subscription works
- Email sending works
- All pages responsive on mobile
- Footer and social media links work

## Lessons for Future Work
- Always verify fixes on LIVE site, not just dev server
- Publish checkpoints immediately after fixes
- Test end-to-end before declaring complete
- Prioritize autonomous problem-solving over asking questions
