# Clarity Engine AI

![Clarity Engine](assets/branding/Website_Hero_Header_Mockup.jpg)

Clarity Engine is a professional SEO & Content Marketing Tool Cluster designed to help entrepreneurs, marketers, and creators rank higher, write better, and grow faster. It provides a curated suite of free SEO tools and educational content, serving as a comprehensive ecosystem that combines functional utility with actionable insights.

Live Site: [clarity-engine.ai](https://clarity-engine.ai)

## Tech Stack

The platform is built on a modern, high-performance web stack:

- **Frontend**: React 19, Tailwind CSS 4
- **Backend**: Express 4, tRPC 11
- **Database**: Drizzle ORM, MySQL/TiDB
- **Email Infrastructure**: SendGrid
- **Authentication**: Manus OAuth
- **Hosting**: Manus Platform with custom domain via Cloudflare DNS

## Features Overview

Clarity Engine offers a robust set of features designed for SEO professionals and content creators:

- **17 Free SEO Tools**: A mix of frontend utilities (Keyword Density, Meta Tag Generator, Readability Score) and AI-powered analyzers (Content Gap, Backlink Analysis, Competitor Tracking).
- **Content Platform**: A library of 35+ in-depth articles, guides, and tool comparisons with integrated author profiles and related content recommendations.
- **Email Marketing System**: Automated workflows including welcome series, drip campaigns, and weekly newsletters powered by SendGrid.
- **Admin Dashboard**: Comprehensive backend interface for managing analytics, email campaigns, user reviews, and affiliate tracking.
- **Monetization Infrastructure**: Built-in contextual affiliate placements (Mangools, SE Ranking, Amazon) and Google AdSense integration.
- **SEO Optimized**: Full implementation of meta tags, Open Graph, JSON-LD structured data, canonical URLs, and dynamic sitemaps.

For a complete breakdown of all features, development history, and monetization strategies, please see the [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md).

## Setup Instructions

### Prerequisites
- Node.js (v22+)
- pnpm or npm
- MySQL/TiDB database
- SendGrid account (for email features)
- Manus OAuth credentials

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/dbname

# Authentication (Manus OAuth)
MANUS_CLIENT_ID=your_client_id
MANUS_CLIENT_SECRET=your_client_secret
AUTH_SECRET=your_auth_secret

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@clarity-engine.ai

# Application
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### Installation & Database Setup

1. Install dependencies:
```bash
npm install
```

2. Push the database schema:
```bash
npm run db:push
```

3. (Optional) Seed the database with initial articles:
```bash
node scripts/seed-articles.mjs
```

### Running the Application

Start the development server (runs both frontend and backend concurrently):
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment

Clarity Engine is currently deployed on the Manus Platform. 

- **Live URL**: https://clarity-engine.ai
- **Backup URL**: https://clarity-engine.ai
- **DNS**: Managed via Cloudflare

To deploy updates, push changes to the main branch or use the Manus deployment pipeline. Ensure all environment variables are properly configured in the production environment.

## License

This project is proprietary and confidential. All rights reserved.
