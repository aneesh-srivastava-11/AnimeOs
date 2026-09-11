import { NaturalLanguageInsight, SyncedUserAnime } from '@/types/analytics';
import { calculateAnimeDNA } from './animeDNA';
import { calculateScoreStats } from './scoreAnalysis';
import { calculateWatchStats } from './watchAnalysis';

export function generateInsights(userAnimes: SyncedUserAnime[]): NaturalLanguageInsight[] {
  if (!userAnimes || userAnimes.length < 3) {
    return [
      {
        id: 'insufficient-data',
        title: 'Building Your Anime Profile',
        description: 'Synchronize more completed or rated anime to unlock personalized taste insights.',
        category: 'behavior',
        icon: 'Sparkles',
      },
    ];
  }

  const insights: NaturalLanguageInsight[] = [];
  const dna = calculateAnimeDNA(userAnimes);
  const { meanScore } = calculateScoreStats(userAnimes);
  const { completionRate, watchStats } = calculateWatchStats(userAnimes);

  // 1. Top Genre Preference Insight
  if (dna.length > 0) {
    const topGenre = dna[0];
    if (topGenre.percentage >= 25) {
      insights.push({
        id: 'top-genre-dominance',
        title: `Strong Affection for ${topGenre.genre}`,
        description: `${topGenre.genre} accounts for ${topGenre.percentage}% of your top genres. You consistently seek out ${topGenre.genre.toLowerCase()} titles.`,
        category: 'taste',
        icon: 'Flame',
      });
    }
  }

  // 2. Rating Tendency Insight
  if (meanScore > 0) {
    const aniListAvg = 7.2; // Global benchmark average
    const diff = parseFloat((meanScore - aniListAvg).toFixed(1));
    if (diff >= 0.5) {
      insights.push({
        id: 'generous-rater',
        title: 'Generous Critic',
        description: `Your average score of ${meanScore}/10 is ${diff} points higher than the AniList community average (${aniListAvg}). You appreciate what you watch!`,
        category: 'score',
        icon: 'Star',
      });
    } else if (diff <= -0.5) {
      insights.push({
        id: 'strict-critic',
        title: 'Selective & Discerning',
        description: `Your average score of ${meanScore}/10 is ${Math.abs(diff)} points lower than the AniList average (${aniListAvg}). You hold high standards for top ratings.`,
        category: 'score',
        icon: 'ShieldCheck',
      });
    }
  }

  // 3. Completion Rate Insight
  if (completionRate >= 80) {
    insights.push({
      id: 'high-completion',
      title: 'Dedicated Completer',
      description: `You finish ${completionRate}% of all anime you start. Once you begin a show, you almost always see it through to the ending.`,
      category: 'behavior',
      icon: 'CheckCircle2',
    });
  } else if (watchStats.DROPPED > 5 && watchStats.DROPPED > watchStats.COMPLETED * 0.3) {
    insights.push({
      id: 'decisive-dropper',
      title: 'Decisive Dropper',
      description: `You have dropped ${watchStats.DROPPED} shows. You do not hesitate to drop titles that fail to capture your interest early on.`,
      category: 'behavior',
      icon: 'XCircle',
    });
  }

  // 4. Format / Length Preference Insight
  const shortFormatCount = userAnimes.filter((ua) => ua.anime.episodes && ua.anime.episodes <= 13).length;
  if (shortFormatCount > userAnimes.length * 0.5) {
    insights.push({
      id: 'short-form-preference',
      title: 'Single-Cour Specialist',
      description: 'Over 50% of your completed library consists of 12-13 episode single-cour anime.',
      category: 'length',
      icon: 'Clock',
    });
  }

  return insights;
}
