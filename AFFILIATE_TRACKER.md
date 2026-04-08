# Affiliate Tracker — Moonsmoke Network
> **Master copy.** Mirror this file to each site repo root when updated.
> Last reviewed: 2026-04-07

---

## Account Credentials (IDs only — no passwords stored here)

| Account | ID / Code | Notes |
|---------|-----------|-------|
| Amazon Associates | One account under Moonsmoke | 4 site-specific tracking IDs — see per-site table |
| Awin Publisher ID | `2805304` | Used for all Awin programs |
| SiteGround afcode | `758135cea38bbc354897accd3183d9ff` | Direct SiteGround program (not Awin) |
| FreshBooks publisher | ⚠️ **PLACEHOLDER** — see action items | PH uses `1234567` — invalid |
| Bluehost CJ ID | `7045929` | Impact/CJ network |
| SE Ranking | `ga=5009081` | Direct program — 30% lifetime recurring |
| PartnerStack | Moonsmoke Network | Network re-application pending approval |
| Impact.com | Publisher: Moonsmoke LLC | Semrush pending approval |

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
| **NordVPN** | Impact.com (`offer_id=15`, `aff_id=142338`) | `go.nordvpn.net/aff_c?offer_id=15&aff_id=142338` | 40% CPS | 30 days | PH, FH, CE, LT |
| **NordVPN** | Awin | `awinaffid=2805304` | — | — | All (Awin duplicate, joined 2026-03-30) |
| **SE Ranking** | Direct | `ga=5009081` | 30% lifetime recurring | 120 days | CE |
| **Mangools** | Direct | `ref=a69b590a66aee08840d5414cd` | 30% recurring lifetime | 30 days | CE |

---

### ⏳ Pending Approval

| Program | Network | Status | Date Applied | Sites |
|---------|---------|--------|-------------|-------|
| **Semrush** | Impact.com | Pending | 2026-03-30 | CE |
| **FreshBooks** | Impact.com | Pending | Pre-2026-03-27 | PH, FH |
| **monday.com** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | PH |
| **Pipedrive** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | PH |
| **Brevo** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | PH, CE |
| **PandaDoc** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | LT, PH |
| **Leadpages** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | CE, PH |
| **Unbounce** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | CE, PH |
| **Webflow** | PartnerStack | Pending (queued behind network approval) | 2026-03-30 | CE |

---

### ⚠️ Wired but Broken / Placeholder — Action Required

| Program | Sites | Issue | Fix Needed |
|---------|-------|-------|------------|
| **FreshBooks** | PH, FH | ⏳ Application pending approval — placeholder ID `1234567` in place. Clicks tracked but earning nothing until approved. | Send real publisher ID once approved → update `go/[slug]/route.ts` on both PH and FH (one-liner swap) |
| **Semrush** | CE | Route `/go/semrush` redirects to semrush.com �� no affiliate tracking | ⏳ Applied on Impact.com 2026-03-30 — pending. Fake `?ref=` param removed 2026-04-07. Replace with real tracking link once approved. Also consider BeRush direct ($200/sale). |
| **Surfer SEO** | CE | Route `/go/surfer` redirects to surferseo.com — no affiliate tracking | Fake `?via=` param removed 2026-04-07. Apply at surferseo.com/affiliate-program/ → replace with real partner link once approved. |
| ~~**Moz**~~ | ✅ Fixed 2026-04-07 | Real Impact tracking URL `moz.pxf.io/WOOLbM` wired on CE. `/go/moz` active. |
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
| **Ahrefs** | CE | `https://ahrefs.com/` | **Ahrefs has no public affiliate program** (discontinued). Fake `?ref=` param removed 2026-04-07. Route kept for click tracking only. |

---

### 📋 Programs to Apply For (Not Yet Active)

| Program | Network | Commission | Priority | Notes |
|---------|---------|-----------|---------|-------|
| **Semrush (BeRush)** | Direct | $200/sale, $10/trial, $0.01/signup | 🔴 High | 120-day cookie. Applied on Impact — also apply direct at semrush.com/lp/affiliate-program/en/ for higher payout |
| **Surfer SEO** | Direct | 25% recurring | 🔴 High | 60-day cookie. CE has tools that pair with Surfer. Signup: surferseo.com/affiliate-program/ |
| ~~**Mangools**~~ | ✅ Active | `ref=a69b590a66aee08840d5414cd` | 30% recurring lifetime | Moved to Active & Earning |
| ~~**SE Ranking**~~ | ✅ Active | `ga=5009081` | 30% lifetime recurring | Moved to Active & Earning |
| **ConvertKit (Kit)** | PartnerStack or Direct | 30% recurring 24mo | 🟠 Medium | 90-day cookie. Already on PartnerStack (sending notifications). Signup: kit.com/affiliate |
| **ShareASale** | Network | Varies | 🟡 Low-Medium | Hosts WP Engine, OptinMonster — good for PH/CE |
| **LegalZoom** | CJ or ShareASale | — | 🟠 Medium | High conversion potential for LT — need CJ account |
| **Calendly** | PartnerStack | — | 🟡 Medium | Search on PartnerStack — scheduling tools fit PH |
| **Clio** | Direct | — | 🟠 Medium | LT partner program — check status (user noted may be active) |

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
| `nordvpn` | go.nordvpn.net/aff_c?offer_id=15&aff_id=142338 | ✅ |
| *tool slugs* | tool.affiliateUrl → tool.websiteUrl | Varies per tool |

### Clarity Engine (`clarity-engine.ai/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `semrush` | semrush.com/sem/ | ⚠️ No tracking — Impact pending |
| `ahrefs` | ahrefs.com/ | ❌ No affiliate program |
| `surfer` | surferseo.com/ | ⚠️ No tracking — needs application |
| `moz` | moz.pxf.io/WOOLbM | ✅ Impact approved |
| `mangools` | mangools.com#a69b590a66aee08840d5414cd | ✅ |
| `mangools-kwfinder` | mangools.com/kwfinder#a69b590a66aee08840d5414cd | ✅ |
| `se-ranking` | seranking.com/?ga=5009081 | ✅ |
| `railway` | railway.com?referralCode=IxgLVt | ✅ |
| `amazon` | amazon.com/?tag=clarityengine-20 | ✅ |
| `siteground` | siteground.com/?afcode=758135... | ✅ |
| `nordvpn` | go.nordvpn.net/aff_c?offer_id=15&aff_id=142338 | ✅ |
| *tool slugs* | tool.affiliateUrl (Semrush/Surfer/Ahrefs) | ⚠️ Same placeholder links |

### AI Finance Hub (`aifinancehub.ai/go/[slug]`)
| Slug | Destination | Affiliate? |
|------|-------------|-----------|
| `freshbooks` | freshbooks.pxf.io/c/**1234567**/1064077/13524 | ⚠️ Placeholder ID |
| `cloudways` | cloudways.com/en/?id=2102009 | ✅ |
| `bluehost` | bluehost.sjv.io/c/7045929/1376228/11352 | ✅ |
| `amazon` | amazon.com/?tag=aifinancehub08-20 | ✅ |
| `siteground` | siteground.com/?afcode=758135... | ✅ |
| `nordvpn` | go.nordvpn.net/aff_c?offer_id=15&aff_id=142338 | ✅ |
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
| `nordvpn` | go.nordvpn.net/aff_c?offer_id=15&aff_id=142338 | ✅ |

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

- [x] **NordVPN** — ✅ Wired 2026-03-28 (Impact). Also joined on Awin 2026-03-30.
- [x] **SE Ranking** — ✅ Approved 2026-03-30. `ga=5009081`. Link: `seranking.com/?ga=5009081&source=link`. Wire `/go/se-ranking` on CE.
- [x] **Mangools** — ✅ Approved. ID `a69b590a66aee08840d5414cd` wired on CE.
- [ ] **Semrush** — ⏳ Applied on Impact.com 2026-03-30. Also apply to BeRush direct for $200/sale at semrush.com/lp/affiliate-program/en/
- [ ] **Apply to Surfer SEO affiliate** — 25% recurring. surferseo.com/affiliate-program/
- [ ] **Apply to LegalZoom affiliate** (CJ/ShareASale) — need CJ account first
- [ ] **Check Clio partner program status** — may already be accepted
- [ ] **PartnerStack Network approval** — 7 program applications queued behind network re-approval (monday.com, Pipedrive, Brevo, PandaDoc, Leadpages, Unbounce, Webflow)

### 🟡 Medium — Expand Coverage

- [ ] **Add ConvertKit/Kit affiliate to PH** — already on PartnerStack, also has direct program at kit.com/affiliate
- [ ] **Join ShareASale** — access to WP Engine, OptinMonster, and many SaaS tools relevant to PH/CE
- [ ] **Join CJ Affiliate** — access to LegalZoom and other legal/finance programs
- [ ] **Check Rocket Lawyer affiliate program** — currently a bare URL on LT
- [ ] **Check Spellbook Legal for partner program** — LT reviews them
- [ ] **Search PartnerStack for Calendly, FreshBooks, Notion** — additional PH/FH programs

### 📝 Notes

- **Ahrefs** does not have a public affiliate program (discontinued). Do not list as an affiliate partner.
- **Amazon** requires 3 qualifying sales within first 180 days to avoid account closure. Ensure all 4 tracking IDs have made at least 3 sales.
- **SiteGround** is a direct program — commissions are tiered: 1 sale=$50, 6–10 sales=$75, 11–20=$100, 21+=$125.
- **Awin** programs: always deep-link to a relevant landing page (e.g., `/demo-signup/`) rather than the homepage for better conversion.
- All `/go/` routes log structured click data via `logAffiliateClick()` captured by Cloudflare Workers runtime logs — use this to track which slugs are getting traffic.

---

*Updated: 2026-03-30 — reflects all four live repos + PartnerStack/Awin/Impact applications*
