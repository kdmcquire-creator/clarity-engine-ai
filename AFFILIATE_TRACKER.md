# Affiliate Tracker — Moonsmoke Network
> **Master copy.** Mirror this file to each site repo root when updated.
> Last reviewed: 2026-03-27

---

## Account Credentials (IDs only — no passwords stored here)

| Account | ID / Code | Notes |
|---------|-----------|-------|
| Amazon Associates | One account under Moonsmoke | 4 site-specific tracking IDs — see per-site table |
| Awin Publisher ID | `2805304` | Used for all Awin programs |
| SiteGround afcode | `758135cea38bbc354897accd3183d9ff` | Direct SiteGround program (not Awin) |
| FreshBooks publisher | ⚠️ **PLACEHOLDER** — see action items | PH uses `1234567` — invalid |
| Bluehost CJ ID | `7045929` | Impact/CJ network |

---

## Sites

| Site | Domain | Repo | Amazon Tag | Go-route base |
|------|--------|------|------------|---------------|
| AI Productivity Hub (PH) | aiphub.ai | `ai-productivity-hub` | `aiphubsite-20` | `/go/[slug]` |
| Clarity Engine (CE) | clarity-engine.ai | `clarity-engine-ai` | `clarityengine-20` | `/go/[slug]` |
| AI Finance Hub (FH) | aifinancehub.ai | `ai-finance-hub` | `aifinancehub08-20` | `/go/[slug]` |
| LegalTech AI Hub (LT) | legaltech-ai-hub.com | `legaltech-ai-hub` | `legaltechhub-20` | `/go/[slug]` |

---

## Program Registry

### ✅ Active & Earning

| Program | Network | Tracking ID / Code | Commission | Cookie | Sites Active |
|---------|---------|-------------------|-----------|--------|-------------|
| **Amazon Associates** | Amazon | `aiphubsite-20` | 1–10% by category | 24 hrs | PH, CE, FH, LT |
| **Amazon Associates** | Amazon | `clarityengine-20` | 1–10% by category | 24 hrs | CE |
| **Amazon Associates** | Amazon | `aifinancehub08-20` | 1–10% by category | 24 hrs | FH |
| **Amazon Associates** | Amazon | `legaltechhub-20` | 1–10% by category | 24 hrs | LT |
| **SiteGround** | Direct | `afcode=758135cea38bbc354897accd3183d9ff` | $50–$100+/sale tiered | 60 days | PH, CE, FH, LT |
| **CyberSuite SaaS** | Awin (`awinmid=67878`) | `awinaffid=2805304` | — | — | PH |
| **ViralCanvas.ai** | Awin (`awinmid=124372`) | `awinaffid=2805304` | — | — | PH |
| **Resso.ai** | Awin (`awinmid=85741`) | `awinaffid=2805304` | — | — | PH |
| **Cloudways** | Direct | `id=2102009` | $30+7% recurring or up to $125/sale | 90 days | FH |
| **Bluehost** | Impact.com | `sjv.io/NG93NP` | $65/sale | 90 days | PH, FH |

---

### ⚠️ Wired but Broken / Placeholder — Action Required

| Program | Sites | Issue | Fix Needed |
|---------|-------|-------|------------|
| **FreshBooks** | PH, FH | ⏳ Application pending approval — placeholder ID `1234567` in place. Clicks tracked but earning nothing until approved. | Send real publisher ID once approved → update `go/[slug]/route.ts` on both PH and FH (one-liner swap) |
| **Semrush** | CE | Link uses `?ref=clarityengine` — not a real affiliate link, earns nothing | Apply at semrush.com/lp/affiliate-program/ (requires ~1,500 mo. visitors) → replace with real BeRush link |
| **Surfer SEO** | CE | Link uses `?via=clarityengine` — not a real affiliate link | Apply at surferseo.com/affiliate-program/ → replace with real partner link |
| **Moz** | CE | Link uses `?ref=clarityengine` — not tracked | Check Moz partner program status → update or remove |
| ~~**Mangools**~~ | ✅ Fixed 2026-03-27 | ID `a69b590a66aee08840d5414cd`. Links use `#id` fragment (not `?ref=`). `/go/mangools` + `/go/mangools-kwfinder` wired on CE. |

---

### 🔗 Non-Affiliate Links (bare URLs, no commission)

These slugs are in `/go/` routes for click tracking, but the destinations have no affiliate tracking. They should be replaced with real affiliate links when available.

| Program | Sites | Current URL | Next Step |
|---------|-------|-------------|-----------|
| LegalZoom | LT | `https://www.legalzoom.com` | Apply to LegalZoom affiliate via CJ or ShareASale |
| Rocket Lawyer | LT | `https://www.rocketlawyer.com` | Apply to Rocket Lawyer affiliate program |
| Clio | LT | `https://www.clio.com` | Clio has a partner program — apply |
| Harvey | LT | `https://www.harvey.ai` | No public affiliate program yet |
| Ironclad | LT | `https://ironcladapp.com` | No public affiliate program — enterprise-only |
| Casetext | LT | `https://casetext.com/cocounsel` | Acquired by Thomson Reuters — no affiliate program |
| Spellbook | LT | `https://www.spellbook.legal` | Check for partner program |
| **Ahrefs** | CE | `https://ahrefs.com/?ref=clarityengine` | **Ahrefs has no public affiliate program** (discontinued) — remove CE link or replace with Semrush as alternative |

---

### 📋 Programs to Apply For (Not Yet Active)

| Program | Network | Commission | Priority | Notes |
|---------|---------|-----------|---------|-------|
| **Semrush (BeRush)** | Direct | $200/sale, $10/trial, $0.01/signup | 🔴 High | 120-day cookie. Requires ~1,500 mo. visitors. Signup: semrush.com/lp/affiliate-program/en/ |
| **Surfer SEO** | Direct | 25% recurring | 🔴 High | 60-day cookie. CE has tools that pair with Surfer. Signup: surferseo.com/affiliate-program/ |
| **Mangools** | Direct | `ref=a69b590a66aee08840d5414cd` | 30% recurring lifetime | 30 days | CE |
| **SE Ranking** | Direct | 30% lifetime | 🟠 Medium | 120-day cookie. Signup: seranking.com/affiliate.html |
| **ConvertKit (Kit)** | Direct | 30% recurring 24mo | 🟠 Medium | 90-day cookie. Good for PH audience. Signup: kit.com/affiliate |
| **ShareASale** | Network | Varies | 🟡 Low-Medium | Hosts WP Engine, OptinMonster — good for PH/CE |
| **FreshBooks (real ID)** | Direct | — | 🔴 Urgent | Fix placeholder ID in PH + FH |
| **LegalZoom** | CJ or ShareASale | — | 🟠 Medium | High conversion potential for LT |

---

## /go/ Slug → URL Map (All Sites)

### AI Productivity Hub (`aiphub.ai/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `freshbooks` | freshbooks.pxf.io/c/**1234567**/1064077/13524 | ⚠️ Placeholder ID |
| `cloudways` | cloudways.com/en/?id=2102009 | ✅ |
| `bluehost` | bluehost.sjv.io/c/7045929/1376228/11352 | ✅ |
| `amazon` | amazon.com/?tag=aiphubsite-20 | ✅ |
| `cybersuite` | awin1.com → cybersuite.com/demo-signup/ | ✅ Awin 67878 |
| `viralcanvas` | awin1.com → viralcanvas.ai/ | ✅ Awin 124372 |
| `resso` | awin1.com → resso.ai/signup | ✅ Awin 85741 |
| `siteground` | siteground.com/?afcode=758135... | ✅ |
| *tool slugs* | tool.affiliateUrl → tool.websiteUrl | Varies per tool |

### Clarity Engine (`clarity-engine.ai/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `semrush` | semrush.com/sem/?ref=clarityengine | ⚠️ Not a real affiliate link |
| `ahrefs` | ahrefs.com/?ref=clarityengine | ❌ Ahrefs has no affiliate program |
| `surfer` | surferseo.com/?via=clarityengine | ⚠️ Not a real affiliate link |
| `moz` | moz.com/?ref=clarityengine | ⚠️ Not a real affiliate link |
| `mangools` | mangools.com/?ref=clarityengine | ⚠️ Not a real affiliate link |
| `amazon` | amazon.com/?tag=clarityengine-20 | ✅ |
| `siteground` | siteground.com/?afcode=758135... | ✅ |
| *tool slugs* | tool.affiliateUrl (Semrush/Surfer/Ahrefs) | ⚠️ Same placeholder links |

### AI Finance Hub (`aifinancehub.ai/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `freshbooks` | freshbooks.pxf.io/c/**1234567**/1064077/13524 | ⚠️ Placeholder ID |
| `cloudways` | cloudways.com/en/?id=2102009 | ✅ |
| `bluehost` | bluehost.sjv.io/c/7045929/1376228/11352 | ✅ |
| `amazon` | amazon.com/?tag=aifinancehub08-20 | ✅ |
| `siteground` | siteground.com/?afcode=758135... | ✅ |
| *tool slugs* | tool.affiliateUrl → tool.websiteUrl | Varies per tool |

### LegalTech AI Hub (`legaltech-ai-hub.com/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `legalzoom` | legalzoom.com | ❌ No affiliate tracking |
| `rocket-lawyer` | rocketlawyer.com | ❌ No affiliate tracking |
| `clio` | clio.com | ❌ No affiliate tracking |
| `harvey` | harvey.ai | ❌ No affiliate program |
| `ironclad` | ironcladapp.com | ❌ No affiliate program |
| `casetext` | casetext.com/cocounsel | ❌ No affiliate program |
| `spellbook` | spellbook.legal | ❌ Check for program |
| `amazon` | amazon.com/?tag=legaltechhub-20 | ✅ |
| `siteground` | siteground.com/?afcode=758135... | ✅ |

---

## Banner Placements

### SiteGround Banners

| Site | Banner | Size | Placement |
|------|--------|------|-----------|
| CE | `SiteGroundLeaderboard` | 728×90 | Blog post page — above article body |
| CE | `SiteGroundHalfPage` | 300×600 | Tool detail page — below AffiliateBlock |
| CE | `SiteGroundBanner` | 250×250 | Blog posts (pre-existing component) |
| PH | `SiteGroundLeaderboard` | 728×90 | BlogArticle — above content sections |
| PH | `SiteGroundHalfPage` | 300×600 | Tool detail page — below AffiliateBlock |
| FH | `SiteGroundLeaderboard` | 728×90 | BlogArticle — above content sections |
| FH | `SiteGroundHalfPage` | 300×600 | Tool detail page — below AffiliateBlock |
| LT | `SiteGroundLeaderboard` | 728×90 | Reviews page — above content; Guides page — above content |
| LT | `SiteGroundHalfPage` | 300×600 | Tool detail page — sidebar below AdUnit |

**SiteGround image codes:**
- Leaderboard 728×90: `afimagecode=dbf1f6606fab3a2536eb979db0d019d4`
- Half-page 300×600: `afimagecode=01a540cef1c8cc8b31d5b910c8d729ec`
- Square 250×250: `afimagecode=9ab348200789c1a9052691eb4ac50064`

### Amazon Associate Links
All four site footers include the required FTC disclosure:
> 🛒 Amazon Associate · As an Amazon Associate I earn from qualifying purchases.

Click-through goes to `/go/amazon` → site-specific tracking tag.

---

## Action Items (Priority Order)

### 🔴 Urgent — Revenue Leakage

- [ ] **FreshBooks — awaiting approval** — Application submitted, pending. Placeholder `1234567` is live. Once approved: send publisher ID → update both PH + FH `go/[slug]/route.ts` in one shot.
- [ ] **Fix CE SEO tool links** — Semrush, Surfer, Moz, Mangools all use fake `?ref=` params. Apply for real programs and replace with tracked links.
- [ ] **Remove Ahrefs link from CE** — Ahrefs has no public affiliate program. Replace with Semrush as the alternative recommendation.

### 🟠 High Value — Apply Now

- [ ] **Apply to Semrush BeRush** — $200/sale. Check if CE traffic qualifies at semrush.com/lp/affiliate-program/en/
- [ ] **Apply to Surfer SEO affiliate** — 25% recurring. surferseo.com/affiliate-program/
- [x] **Mangools** — ✅ Approved. ID `a69b590a66aee08840d5414cd` wired. Banners: KWFinder, SERPChecker, SiteProfiler (250×250 iframes).
- [ ] **Apply to LegalZoom affiliate** (CJ/ShareASale) — LT has 16 reviews and 16 guides that naturally reference LegalZoom

### 🟡 Medium — Expand Coverage

- [ ] **Add ConvertKit/Kit affiliate to PH** — PH audience (productivity/AI tools) = good fit
- [ ] **Join ShareASale** — access to WP Engine, OptinMonster, and many SaaS tools relevant to PH/CE
- [ ] **Check Rocket Lawyer affiliate program** — currently a bare URL on LT
- [ ] **Check Spellbook Legal for partner program** — LT reviews them

### 📝 Notes

- **Ahrefs** does not have a public affiliate program (discontinued). Do not list as an affiliate partner.
- **Amazon** requires 3 qualifying sales within first 180 days to avoid account closure. Ensure all 4 tracking IDs have made at least 3 sales.
- **SiteGround** is a direct program — commissions are tiered: 1 sale=$50, 6–10 sales=$75, 11–20=$100, 21+=$125.
- **Awin** programs: always deep-link to a relevant landing page (e.g., `/demo-signup/`) rather than the homepage for better conversion.
- All `/go/` routes log structured click data via `logAffiliateClick()` captured by Cloudflare Workers runtime logs — use this to track which slugs are getting traffic.

---

*Updated: 2026-03-27 — reflects all four live repos*
