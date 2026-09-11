import { AnimeDNAGenre, SyncedUserAnime } from '@/types/analytics';

const GENRE_COLORS: Record<string, string> = {
  Action: '#EF4444', // Red-500
  Psychological: '#8B5CF6', // Purple-500
  Drama: '#F59E0B', // Amber-500
  Comedy: '#10B981', // Emerald-500
  Romance: '#EC4899', // Pink-500
  'Sci-Fi': '#06B6D4', // Cyan-500
  Fantasy: '#3B82F6', // Blue-500
  Thriller: '#6366F1', // Indigo-500
  'Slice of Life': '#A855F7', // Purple-500
  Mystery: '#14B8A6', // Teal-500
  Supernatural: '#6B7280', // Gray-500
  Adventure: '#F97316', // Orange-500
  Horror: '#DC2626', // Red-600
  Sports: '#84CC16', // Lime-500
  Mecha: '#0284C7', // Sky-600
  Music: '#F43F5E', // Rose-500
};

const DEFAULT_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#06B6D4'];

export function calculateAnimeDNA(userAnimes: SyncedUserAnime[]): AnimeDNAGenre[] {
  if (!userAnimes || userAnimes.length === 0) return [];

  const genreCounts: Record<string, number> = {};
  const genreScoreSums: Record<string, number> = {};
  const genreScoreCounts: Record<string, number> = {};

  userAnimes.forEach((ua) => {
    // We analyze completed, watching, and user-scored anime
    if (ua.status === 'COMPLETED' || ua.status === 'CURRENT' || ua.score > 0) {
      const genres = ua.anime.genres || [];
      genres.forEach((g) => {
        const name = g.genre.name;
        genreCounts[name] = (genreCounts[name] || 0) + 1;

        if (ua.score > 0) {
          genreScoreSums[name] = (genreScoreSums[name] || 0) + ua.score;
          genreScoreCounts[name] = (genreScoreCounts[name] || 0) + 1;
        }
      });
    }
  });

  const totalEntries = Object.values(genreCounts).reduce((a, b) => a + b, 0);
  if (totalEntries === 0) return [];

  const rawGenres = Object.keys(genreCounts).map((genre, idx) => {
    const count = genreCounts[genre];
    const percentage = Math.round((count / totalEntries) * 100);
    const avgScore = genreScoreCounts[genre]
      ? parseFloat((genreScoreSums[genre] / genreScoreCounts[genre]).toFixed(1))
      : 0;

    return {
      genre,
      count,
      percentage,
      weightedScore: avgScore,
      color: GENRE_COLORS[genre] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
    };
  });

  // Sort by highest count / percentage
  rawGenres.sort((a, b) => b.count - a.count);

  // Return top 5 for main DNA profile, normalized to sum ~100%
  const topGenres = rawGenres.slice(0, 5);
  const topTotal = topGenres.reduce((acc, g) => acc + g.count, 0);

  return topGenres.map((g) => ({
    ...g,
    percentage: Math.round((g.count / topTotal) * 100),
  }));
}

export function calculateAllGenreStats(userAnimes: SyncedUserAnime[]): AnimeDNAGenre[] {
  if (!userAnimes || userAnimes.length === 0) return [];

  const genreCounts: Record<string, number> = {};
  const genreScoreSums: Record<string, number> = {};
  const genreScoreCounts: Record<string, number> = {};

  userAnimes.forEach((ua) => {
    const genres = ua.anime.genres || [];
    genres.forEach((g) => {
      const name = g.genre.name;
      genreCounts[name] = (genreCounts[name] || 0) + 1;
      if (ua.score > 0) {
        genreScoreSums[name] = (genreScoreSums[name] || 0) + ua.score;
        genreScoreCounts[name] = (genreScoreCounts[name] || 0) + 1;
      }
    });
  });

  const total = Object.values(genreCounts).reduce((a, b) => a + b, 0);

  return Object.keys(genreCounts)
    .map((genre, idx) => ({
      genre,
      count: genreCounts[genre],
      percentage: Math.round((genreCounts[genre] / total) * 100),
      weightedScore: genreScoreCounts[genre]
        ? parseFloat((genreScoreSums[genre] / genreScoreCounts[genre]).toFixed(1))
        : 0,
      color: GENRE_COLORS[genre] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
    }))
    .sort((a, b) => b.count - a.count);
}
