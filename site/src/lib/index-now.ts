/**
 * IndexNow protocol client — submits URLs to search engines for faster recrawl.
 *
 * IndexNow is supported directly by Bing and Yandex, and Google has stated it
 * uses IndexNow signals as input to its crawling system (though Google doesn't
 * publicly participate in the protocol directly). Submitting via IndexNow
 * primes the fastest-moving parts of the search ecosystem.
 *
 * Cost: free. No API key. Rate limits: reasonable (10k URLs per request).
 *
 * Protocol spec: https://www.indexnow.org/documentation
 *
 * Setup requirement: each host must publish a file at /<key>.txt containing
 * the key verbatim, so search engines can verify the submitter owns the host.
 * This is done via a route handler at app/[key].txt/route.ts (see indexNowKey).
 */

/**
 * The shared IndexNow key for all Moonsmoke sites. This is not a secret — it
 * just needs to match between the submission and the verification file served
 * on the host. Regenerate with any 8-128 char alphanumeric string.
 */
export const INDEX_NOW_KEY = "mn7f3c9b2e5a1d8f4b6c0e9d7a2f5b1c";

/**
 * Submit a batch of URLs to IndexNow for faster recrawl.
 *
 * @param host - the hostname (e.g. "aiproductivityhub.co") without scheme
 * @param urls - array of fully qualified URLs to submit (must all be on `host`)
 * @returns true on success, false otherwise
 */
export async function submitToIndexNow(
  host: string,
  urls: string[],
): Promise<{ success: boolean; status?: number; error?: string }> {
  if (urls.length === 0) {
    return { success: true };
  }

  // Validate all URLs are on the expected host (IndexNow rejects mixed-host batches)
  for (const url of urls) {
    try {
      const u = new URL(url);
      if (u.hostname !== host) {
        return {
          success: false,
          error: `URL ${url} is not on host ${host}`,
        };
      }
    } catch {
      return { success: false, error: `Invalid URL: ${url}` };
    }
  }

  const body = {
    host,
    key: INDEX_NOW_KEY,
    keyLocation: `https://${host}/${INDEX_NOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    // IndexNow returns 200 or 202 on success
    if (res.ok || res.status === 202) {
      return { success: true, status: res.status };
    }

    return {
      success: false,
      status: res.status,
      error: `IndexNow ${res.status}: ${await res.text()}`,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
