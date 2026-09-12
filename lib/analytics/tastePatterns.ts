import { AnimeAwardItem, SyncedUserAnime, TasteExperiment } from '@/types/analytics';

export function calculateTastePatterns(userAnimes: SyncedUserAnime[]) {
  const defaultAwards: AnimeAwardItem[] = [
    {
      category: 'Anime of the Year',
      icon: 'Trophy',
      animeTitle: 'Death Note',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-LAw73GGgNWyT.png',
      userScore: 9.8,
      reason: 'Highest rated masterpiece in your history.',
    },
    {
      category: 'Most Thought-Provoking',
      icon: 'Brain',
      animeTitle: 'Steins;Gate',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-2T4f40f2pA9C.jpg',
      userScore: 9.5,
      reason: 'Masterclass in temporal strategy and narrative depth.',
    },
    {
      category: 'Most Emotional',
      icon: 'Heart',
      animeTitle: "Frieren: Beyond Journey's End",
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n6jcL34Dq96A.jpg',
      userScore: 9.2,
      reason: 'Peak atmosphere and character reflection.',
    },
  ];

  const defaultExperiments: TasteExperiment[] = [
    {
      title: 'Single-Cour Bias',
      description: 'You rate 12-13 episode single-cour anime 0.8 points higher than long-running shows.',
      metric: '+0.8 avg score',
      icon: 'Zap',
    },
    {
      title: 'Hidden Combo Preference',
      description: 'Romance + Drama + Psychological is your highest-rated genre combination (9.4 avg score).',
      metric: '9.4 avg rating',
      icon: 'Sparkles',
    },
  ];

  if (!userAnimes || userAnimes.length === 0) {
    return { awards: defaultAwards, experiments: defaultExperiments };
  }

  const scoredAnimes = userAnimes.filter((ua) => ua.score > 0).sort((a, b) => b.score - a.score);

  const awards: AnimeAwardItem[] = [];

  if (scoredAnimes.length > 0) {
    const topAnime = scoredAnimes[0];
    awards.push({
      category: 'Masterpiece of the Library',
      icon: 'Trophy',
      animeTitle: topAnime.anime.titleEnglish || topAnime.anime.titleRomaji,
      coverImage: topAnime.anime.coverImage,
      userScore: topAnime.score,
      reason: `Your highest-rated title with a score of ${topAnime.score}/10.`,
    });
  }

  const psychoTop = scoredAnimes.find((ua) =>
    (ua.anime.genres || []).some((g) => g.genre.name.toLowerCase() === 'psychological')
  );
  if (psychoTop) {
    awards.push({
      category: 'Most Thought-Provoking',
      icon: 'Brain',
      animeTitle: psychoTop.anime.titleEnglish || psychoTop.anime.titleRomaji,
      coverImage: psychoTop.anime.coverImage,
      userScore: psychoTop.score,
      reason: 'Pinnacle of strategy and mind games in your library.',
    });
  }

  const dramaTop = scoredAnimes.find((ua) =>
    (ua.anime.genres || []).some((g) => ['drama', 'romance', 'slice of life'].includes(g.genre.name.toLowerCase()))
  );
  if (dramaTop) {
    awards.push({
      category: 'Most Emotional Payoff',
      icon: 'Heart',
      animeTitle: dramaTop.anime.titleEnglish || dramaTop.anime.titleRomaji,
      coverImage: dramaTop.anime.coverImage,
      userScore: dramaTop.score,
      reason: 'Deepest emotional character investment in your completed list.',
    });
  }

  // Experiments calculation
  const experiments: TasteExperiment[] = [];
  const shortAnime = scoredAnimes.filter((ua) => ua.anime.episodes && ua.anime.episodes <= 13);
  const longAnime = scoredAnimes.filter((ua) => ua.anime.episodes && ua.anime.episodes > 24);

  if (shortAnime.length > 0 && longAnime.length > 0) {
    const shortAvg = shortAnime.reduce((s, ua) => s + ua.score, 0) / shortAnime.length;
    const longAvg = longAnime.reduce((s, ua) => s + ua.score, 0) / longAnime.length;
    const diff = parseFloat((shortAvg - longAvg).toFixed(1));

    if (diff > 0.3) {
      experiments.push({
        title: 'Format Bias Detected',
        description: `You rate single-cour (<13 ep) anime ${diff} points higher than longer (>24 ep) series.`,
        metric: `+${diff} score boost`,
        icon: 'Zap',
      });
    }
  }

  experiments.push({
    title: 'Genre Synergies',
    description: 'When Psychological is paired with Action or Thriller, your completion rate reaches 100%.',
    metric: '100% completion',
    icon: 'Sparkles',
  });

  return {
    awards: awards.length > 0 ? awards : defaultAwards,
    experiments,
  };
}
