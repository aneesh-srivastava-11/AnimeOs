import { ScoreDistributionItem, SyncedUserAnime } from '@/types/analytics';

export function calculateScoreStats(userAnimes: SyncedUserAnime[]): {
  scoreStats: ScoreDistributionItem[];
  meanScore: number;
} {
  const distributionMap: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0,
  };

  let scoreSum = 0;
  let scoreCount = 0;

  userAnimes.forEach((ua) => {
    if (ua.score && ua.score > 0) {
      // Normalize 100-point or decimal scores to 1-10
      const roundedScore = Math.min(10, Math.max(1, Math.round(ua.score > 10 ? ua.score / 10 : ua.score)));
      distributionMap[roundedScore] = (distributionMap[roundedScore] || 0) + 1;
      scoreSum += ua.score > 10 ? ua.score / 10 : ua.score;
      scoreCount++;
    }
  });

  const meanScore = scoreCount > 0 ? parseFloat((scoreSum / scoreCount).toFixed(1)) : 0;

  const scoreStats = Object.keys(distributionMap).map((key) => ({
    score: parseInt(key, 10),
    count: distributionMap[parseInt(key, 10)],
  }));

  return { scoreStats, meanScore };
}
