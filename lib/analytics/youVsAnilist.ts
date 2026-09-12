import { SyncedUserAnime, YouVsAnilistBenchmark } from '@/types/analytics';

// Global AniList Community Benchmark Distributions (%)
const ANILIST_GENRE_BENCHMARKS: Record<string, number> = {
  Action: 25,
  Psychological: 11,
  Drama: 18,
  Comedy: 14,
  Romance: 17,
  'Sci-Fi': 9,
  Fantasy: 22,
  Thriller: 8,
  'Slice of Life': 12,
  Mystery: 10,
};

export function calculateYouVsAnilist(userAnimes: SyncedUserAnime[]): YouVsAnilistBenchmark {
  if (!userAnimes || userAnimes.length === 0) {
    return {
      genreComparisons: [
        { genre: 'Psychological', userPercentage: 28, anilistPercentage: 11, multiplier: 2.5 },
        { genre: 'Action', userPercentage: 31, anilistPercentage: 25, multiplier: 1.2 },
        { genre: 'Drama', userPercentage: 22, anilistPercentage: 18, multiplier: 1.2 },
        { genre: 'Romance', userPercentage: 8, anilistPercentage: 17, multiplier: 0.5 },
        { genre: 'Comedy', userPercentage: 6, anilistPercentage: 14, multiplier: 0.4 },
      ],
      scoringPersonality: {
        type: 'Generous Critic',
        userAverage: 8.4,
        anilistAverage: 7.6,
        difference: 0.8,
        description: 'You give out high ratings generously compared to the global AniList community average.',
      },
    };
  }

  // Calculate User Genre Distribution
  const genreCounts: Record<string, number> = {};
  let totalGenreHits = 0;
  const scoredAnimes = userAnimes.filter((ua) => ua.score > 0);
  const meanUserScore =
    scoredAnimes.length > 0
      ? parseFloat(
          (scoredAnimes.reduce((sum, ua) => sum + ua.score, 0) / scoredAnimes.length).toFixed(1)
        )
      : 7.5;

  userAnimes.forEach((ua) => {
    (ua.anime.genres || []).forEach((g) => {
      const name = g.genre.name;
      genreCounts[name] = (genreCounts[name] || 0) + 1;
      totalGenreHits++;
    });
  });

  const targetGenres = ['Psychological', 'Action', 'Drama', 'Romance', 'Comedy', 'Sci-Fi', 'Fantasy'];
  const genreComparisons = targetGenres.map((genre) => {
    const userCount = genreCounts[genre] || 0;
    const userPct = totalGenreHits > 0 ? Math.round((userCount / totalGenreHits) * 100) : 10;
    const anilistPct = ANILIST_GENRE_BENCHMARKS[genre] || 15;
    const multiplier = parseFloat((userPct / Math.max(1, anilistPct)).toFixed(1));

    return {
      genre,
      userPercentage: userPct,
      anilistPercentage: anilistPct,
      multiplier: Math.max(0.1, multiplier),
    };
  });

  genreComparisons.sort((a, b) => b.userPercentage - a.userPercentage);

  // Scoring Personality
  const anilistAvg = 7.4;
  const diff = parseFloat((meanUserScore - anilistAvg).toFixed(1));

  let personalityType: YouVsAnilistBenchmark['scoringPersonality']['type'] = 'Balanced Evaluator';
  let desc = 'Your scoring behavior aligns closely with standard AniList community benchmarks.';

  if (diff >= 0.8) {
    personalityType = 'Generous Critic';
    desc = `Your average rating of ${meanUserScore}/10 is ${diff} points higher than AniList average. You celebrate great shows!`;
  } else if (diff <= -0.6) {
    personalityType = 'Selective & Discerning';
    desc = `Your average rating of ${meanUserScore}/10 is ${Math.abs(diff)} points lower than AniList average. High ratings are earned, not given.`;
  } else {
    // Check if score distribution is clustered around 8
    const countEights = userAnimes.filter((ua) => ua.score >= 7.8 && ua.score <= 8.5).length;
    if (countEights > userAnimes.length * 0.45) {
      personalityType = 'Everything-is-an-8';
      desc = 'Over 45% of your rated shows land precisely in the 8.0 - 8.5 range. 💀';
    }
  }

  return {
    genreComparisons: genreComparisons.slice(0, 5),
    scoringPersonality: {
      type: personalityType,
      userAverage: meanUserScore,
      anilistAverage: anilistAvg,
      difference: diff,
      description: desc,
    },
  };
}
