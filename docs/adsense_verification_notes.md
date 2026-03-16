# Google AdSense Code Verification - Key Findings

## Official Google Guidance

From: https://support.google.com/adsense/answer/9274634?hl=en

### Main Requirement
**"The AdSense code" is the name of the HTML snippet you put on your site to get Auto ads and a range of other AdSense features. To get the most out of AdSense, place the AdSense code on every page across your site.**

### Critical Point
The documentation states: "To get the most out of AdSense, place the AdSense code on **every page** across your site."

## What This Means for Clarity Engine

Since Clarity Engine is a **React Single Page Application (SPA)**, there are two approaches:

### Approach 1: Global Head Tag (What I Did) ✅
- Add AdSense code to `client/index.html` in the `<head>` tag
- This serves the code on every route/page of the SPA
- **Pros:** Single placement, serves all pages
- **Cons:** May not be recognized by Google as being on "every page" since it's technically one HTML file

### Approach 2: Per-Page Component Placement (Google's Recommendation)
- Add AdSense code to each React component/page
- Ensures Google sees the code on every distinct page
- **Pros:** Matches Google's "every page" requirement
- **Cons:** Requires multiple placements, potential duplicate code

## Recommendation

For verification purposes, Google likely wants to see the code on multiple distinct pages. Since Clarity Engine is a React SPA, I should:

1. Keep the global placement in `client/index.html` (already done)
2. **ADD:** AdSense code to key page components:
   - Home.tsx
   - Tools.tsx
   - Resources.tsx
   - Pricing.tsx
   - About.tsx

This ensures Google sees the AdSense code when crawling each distinct page of the site.

## Next Steps

Implement per-page AdSense code placement to fully comply with Google's "every page" requirement for verification.
