import { fetchAniListGraphQL } from '../anilist/client';
import { GET_RECOMMENDED_MEDIA } from '../anilist/queries';
import { ComputedUserAnalytics, SyncedUserAnime } from '@/types/analytics';

export interface RecommendedAnimeCard {
  id: string;
  anilistId: number;
  titleRomaji: string;
  titleEnglish?: string;
  coverImage?: string;
  description?: string;
  format?: string;
  episodes?: number;
  averageScore?: number;
  matchScore: number; // e.g. 94 for 94%
  whyExplanation: string;
  genres: string[];
  siteUrl?: string;
}

export const CANDIDATE_RECOMMENDATIONS_MOCK: RecommendedAnimeCard[] = [
  {
    id: 'rec-1',
    anilistId: 19,
    titleRomaji: 'Monster',
    titleEnglish: 'Monster',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx19-9k95zWw556Z9.png',
    description: 'Dr. Kenzo Tenma is a brilliant Japanese brain surgeon working in Germany. When faced with a choice to save a young boy or the city mayor, he saves the boy—only to realize years later the boy grew into a ruthless mastermind.',
    format: 'TV',
    episodes: 74,
    averageScore: 88,
    matchScore: 96,
    whyExplanation: 'You rated psychological thrillers like Death Note and Steins;Gate 9.0+ and prefer mature, character-driven mysteries.',
    genres: ['Psychological', 'Drama', 'Mystery'],
    siteUrl: 'https://anilist.co/anime/19/Monster',
  },
  {
    id: 'rec-2',
    anilistId: 21519,
    titleRomaji: 'Kimi no Na wa.',
    titleEnglish: 'Your Name.',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-Xj1k58D6EAEz.png',
    description: 'Mitsuha and Taki are two strangers living different lives. But when Mitsuha makes a wish to leave her mountain town, they mysteriously begin swapping bodies in their sleep.',
    format: 'MOVIE',
    episodes: 1,
    averageScore: 88,
    matchScore: 91,
    whyExplanation: 'Matches your top Romance & Supernatural preferences with high global rating consensus.',
    genres: ['Romance', 'Drama', 'Supernatural'],
    siteUrl: 'https://anilist.co/anime/21519/Your-Name',
  },
  {
    id: 'rec-3',
    anilistId: 21459,
    titleRomaji: 'Boku dake ga Inai Machi',
    titleEnglish: 'ERASED',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-2C7lYqWqC2wG.jpg',
    description: 'Satoru Fujinuma is sent back 18 years in time to prevent a tragedy that took his mother and classmates.',
    format: 'TV',
    episodes: 12,
    averageScore: 82,
    matchScore: 89,
    whyExplanation: 'Matches your preference for 12-episode single-cour psychological time-travel thrillers.',
    genres: ['Psychological', 'Mystery', 'Supernatural'],
    siteUrl: 'https://anilist.co/anime/21459/ERASED',
  },
  {
    id: 'rec-4',
    anilistId: 10087,
    titleRomaji: 'Fate/Zero',
    titleEnglish: 'Fate/Zero',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx10087-a2E5H0eQWz3P.jpg',
    description: 'Seven mages summon legendary heroic spirits to fight to the death in a battle for the wish-granting Holy Grail.',
    format: 'TV',
    episodes: 13,
    averageScore: 84,
    matchScore: 87,
    whyExplanation: 'Shares your high rating for Studio Madhouse / Ufotable high-stakes action and dark fantasy themes.',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    siteUrl: 'https://anilist.co/anime/10087/FateZero',
  },
];

export async function getPersonalizedRecommendations(
  userAnimes: SyncedUserAnime[],
  analytics: ComputedUserAnalytics
): Promise<RecommendedAnimeCard[]> {
  const topGenres = analytics.animeDNA.map((g) => g.genre);
  const watchedAnilistIds = new Set(userAnimes.map((ua) => ua.anime.anilistId));

  if (topGenres.length === 0) {
    return CANDIDATE_RECOMMENDATIONS_MOCK;
  }

  try {
    const data = await fetchAniListGraphQL<{
      Page: {
        media: Array<{
          id: number;
          title: { romaji: string; english?: string };
          description?: string;
          episodes?: number;
          format?: string;
          averageScore?: number;
          coverImage?: { large?: string; medium?: string };
          genres: string[];
          siteUrl?: string;
        }>;
      };
    }>(GET_RECOMMENDED_MEDIA, { genres: topGenres.slice(0, 3), perPage: 12 });

    const rawCandidates = data.Page?.media || [];
    const candidates = rawCandidates.filter((m) => !watchedAnilistIds.has(m.id));

    if (candidates.length === 0) return CANDIDATE_RECOMMENDATIONS_MOCK;

    return candidates.slice(0, 6).map((c) => {
      const matchingGenres = c.genres.filter((g) => topGenres.includes(g));
      const genreMatchBonus = matchingGenres.length * 15;
      const scoreBonus = (c.averageScore || 70) * 0.4;
      const matchScore = Math.min(99, Math.max(70, Math.round(genreMatchBonus + scoreBonus)));

      return {
        id: `rec-${c.id}`,
        anilistId: c.id,
        titleRomaji: c.title.romaji,
        titleEnglish: c.title.english || c.title.romaji,
        coverImage: c.coverImage?.large || c.coverImage?.medium || undefined,
        description: c.description || 'No description available.',
        format: c.format || 'TV',
        episodes: c.episodes || 12,
        averageScore: c.averageScore || 75,
        matchScore,
        whyExplanation: `Matches your top preferences for ${matchingGenres.join(' & ')} with an average AniList score of ${c.averageScore || 75}/100.`,
        genres: c.genres,
        siteUrl: c.siteUrl || `https://anilist.co/anime/${c.id}`,
      };
    });
  } catch (error) {
    console.warn('Using recommendation fallback due to API error:', error);
    return CANDIDATE_RECOMMENDATIONS_MOCK;
  }
}
