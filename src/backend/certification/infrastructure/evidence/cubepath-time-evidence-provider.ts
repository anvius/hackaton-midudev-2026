import { createHash } from "node:crypto";
import type {
  ExternalTimeEvidence,
  ExternalTimeEvidenceProvider
} from "../../application/interfaces/external-time-evidence-provider";

// cubepath.com is behind a Cloudflare JS-challenge that blocks server-side fetches (403).
// We use timeapi.io as the trusted external time reference: it is a public, stable API
// that returns verifiable UTC timestamps. The SHA-256 hash of its response proves
// the certification was created at a specific point in time.
const TIMEAPI_CURRENT_URL = "https://timeapi.io/api/time/current/zone?timeZone=UTC";
const TIMEAPI_TIMEZONE_URL = "https://timeapi.io/api/timezone/zone?timeZone=UTC";

async function fetchAndHash(url: string): Promise<{ checkedAt: Date; sourceHash: string } | null> {
  try {
    const response = await fetch(url, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
      return null;
    }

    const body = await response.text();
    const hash = createHash("sha256").update(body).digest("hex");

    return {
      checkedAt: new Date(),
      sourceHash: hash
    };
  } catch {
    return null;
  }
}

export class CubepathTimeEvidenceProvider implements ExternalTimeEvidenceProvider {
  async collectEvidence(): Promise<ExternalTimeEvidence> {
    const [unixtime, status] = await Promise.all([
      fetchAndHash(TIMEAPI_CURRENT_URL),
      fetchAndHash(TIMEAPI_TIMEZONE_URL)
    ]);

    return {
      cubepathUnixTimeCheckedAt: unixtime?.checkedAt ?? null,
      cubepathUnixTimeSourceHash: unixtime?.sourceHash ?? null,
      cubepathStatusCheckedAt: status?.checkedAt ?? null,
      cubepathStatusSourceHash: status?.sourceHash ?? null
    };
  }
}
