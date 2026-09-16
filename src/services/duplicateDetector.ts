import { Project } from '../types';

/**
 * Calculates Haversine distance in meters between two lat/lng coordinates
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Tokenizes and calculates Jaccard / Cosine term overlap similarity (0 to 100%)
 */
export function calculateTextSimilarity(text1: string, text2: string): number {
  const stopWords = new Set([
    'of', 'the', 'in', 'and', 'at', 'for', 'to', 'a', 'an', 'with', 'under', 'by', 'on', 'construction', 'installation', 'setup'
  ]);

  const cleanTokens = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));

  const tokens1 = cleanTokens(text1);
  const tokens2 = cleanTokens(text2);

  if (tokens1.length === 0 || tokens2.length === 0) return 0;

  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  let intersection = 0;
  for (const item of set1) {
    if (set2.has(item)) {
      intersection++;
    }
  }

  const union = new Set([...tokens1, ...tokens2]).size;
  const jaccard = (intersection / union) * 100;

  // Add weight if exact key phrases match (e.g. "community hall", "water filtration")
  const keyPhrases = ['community hall', 'solar', 'road', 'smart classroom', 'diagnostic', 'drain', 'gym'];
  let phraseBonus = 0;
  const t1Lower = text1.toLowerCase();
  const t2Lower = text2.toLowerCase();
  for (const phrase of keyPhrases) {
    if (t1Lower.includes(phrase) && t2Lower.includes(phrase)) {
      phraseBonus += 15;
      break;
    }
  }

  return Math.min(100, parseFloat((jaccard + phraseBonus).toFixed(1)));
}

export interface DuplicateDetectionMatch {
  matchedProject: Project;
  geoDistanceMeters: number;
  textSimilarityPct: number;
  timeProximityDays: number;
  duplicateScore: number; // 0 - 25
  explanation: string;
}

export function detectDuplicates(
  targetProject: Project,
  allProjects: Project[]
): DuplicateDetectionMatch | null {
  let highestMatch: DuplicateDetectionMatch | null = null;
  let maxScore = 0;

  for (const p of allProjects) {
    if (p.id === targetProject.id) continue;

    const geoDistance = calculateHaversineDistance(
      targetProject.lat,
      targetProject.lng,
      p.lat,
      p.lng
    );

    const textSim = calculateTextSimilarity(targetProject.title, p.title);

    const d1 = new Date(targetProject.sanctionDate).getTime();
    const d2 = new Date(p.sanctionDate).getTime();
    const timeProximityDays = Math.abs(Math.round((d1 - d2) / (1000 * 60 * 60 * 24)));

    // Duplicate detection composite heuristic:
    // Close distance (< 500m) + high text similarity (> 50%) -> high risk of duplicate
    let score = 0;
    if (geoDistance <= 100 && textSim >= 70) {
      score = 24; // Critical duplicate
    } else if (geoDistance <= 250 && textSim >= 60) {
      score = 20;
    } else if (geoDistance <= 500 && textSim >= 50) {
      score = 15;
    } else if (geoDistance <= 1000 && textSim >= 50) {
      score = 9;
    } else if (textSim >= 80) {
      score = 8;
    } else {
      score = 2;
    }

    if (score > maxScore) {
      maxScore = score;
      let explanation = '';
      if (score >= 20) {
        explanation = `High duplicate alert: Matched with ${p.id} ("${p.title}") only ${geoDistance}m away with ${textSim}% semantic similarity, sanctioned within ${timeProximityDays} days.`;
      } else if (score >= 10) {
        explanation = `Moderate spatial/thematic overlap with ${p.id} located ${geoDistance}m away.`;
      } else {
        explanation = `Low similarity with surrounding works. No duplicate cluster identified.`;
      }

      highestMatch = {
        matchedProject: p,
        geoDistanceMeters: geoDistance,
        textSimilarityPct: textSim,
        timeProximityDays,
        duplicateScore: score,
        explanation
      };
    }
  }

  return highestMatch;
}
