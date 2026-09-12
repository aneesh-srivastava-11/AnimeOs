import { fetchAniListGraphQL } from './client';
import { GET_USER_MEDIA_LIST, GET_PUBLIC_USER_DATA } from './queries';
import { calculateAnimeDNA, calculateAllGenreStats } from '../analytics/animeDNA';
import { calculateScoreStats } from '../analytics/scoreAnalysis';
import { calculateWatchStats } from '../analytics/watchAnalysis';
import { generateInsights } from '../analytics/insights';
import { SyncedUserAnime } from '@/types/analytics';

export interface UserProfileInfo {
  username: string;
  avatar?: string;
  bannerImage?: string;
}

export interface AniListListEntry {
  id: number;
  mediaId: number;
  status: string;
  score: number;
  progress: number;
  repeat: number;
  media: {
    id: number;
    title: { romaji: string; english?: string; native?: string };
    description?: string;
    episodes?: number;
    duration?: number;
    status?: string;
    format?: string;
    season?: string;
    seasonYear?: number;
    averageScore?: number;
    meanScore?: number;
    popularity?: number;
    favourites?: number;
    coverImage?: { large?: string; medium?: string; color?: string };
    bannerImage?: string;
    siteUrl?: string;
    genres?: string[];
    tags?: Array<{ id: number; name: string; category?: string; rank?: number }>;
    studios?: { nodes?: Array<{ id: number; name: string }> };
  };
}

export interface AniListMediaListCollectionResponse {
  MediaListCollection: {
    lists: Array<{
      name: string;
      status: string;
      entries: AniListListEntry[];
    }>;
  };
}

export const MOCK_DEMO_ANIMES: SyncedUserAnime[] = [
  {
    id: 'demo-1',
    userId: 'demo-user-1',
    animeId: 'anime-101',
    status: 'COMPLETED',
    score: 9.5,
    progress: 24,
    repeat: 1,
    anime: {
      id: 'anime-101',
      anilistId: 1535,
      titleRomaji: 'Death Note',
      titleEnglish: 'Death Note',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-LAw73GGgNWyT.png',
      episodes: 37,
      duration: 23,
      averageScore: 84,
      format: 'TV',
      genres: [{ genre: { name: 'Psychological' } }, { genre: { name: 'Mystery' } }, { genre: { name: 'Thriller' } }],
      tags: [{ tag: { name: 'Mind Games' }, rank: 95 }],
      studios: [{ studio: { name: 'Madhouse' } }],
    },
  },
  {
    id: 'demo-2',
    userId: 'demo-user-1',
    animeId: 'anime-102',
    status: 'COMPLETED',
    score: 9.8,
    progress: 24,
    repeat: 2,
    anime: {
      id: 'anime-102',
      anilistId: 11061,
      titleRomaji: 'Hunter x Hunter (2011)',
      titleEnglish: 'Hunter x Hunter (2011)',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-n5v6TG6m2VCD.jpg',
      episodes: 148,
      duration: 23,
      averageScore: 89,
      format: 'TV',
      genres: [{ genre: { name: 'Action' } }, { genre: { name: 'Adventure' } }, { genre: { name: 'Fantasy' } }],
      tags: [{ tag: { name: 'Nen System' }, rank: 98 }],
      studios: [{ studio: { name: 'Madhouse' } }],
    },
  },
  {
    id: 'demo-3',
    userId: 'demo-user-1',
    animeId: 'anime-103',
    status: 'COMPLETED',
    score: 9.0,
    progress: 25,
    repeat: 0,
    anime: {
      id: 'anime-103',
      anilistId: 9253,
      titleRomaji: 'Steins;Gate',
      titleEnglish: 'Steins;Gate',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-2T4f40f2pA9C.jpg',
      episodes: 24,
      duration: 24,
      averageScore: 90,
      format: 'TV',
      genres: [{ genre: { name: 'Psychological' } }, { genre: { name: 'Sci-Fi' } }, { genre: { name: 'Drama' } }],
      tags: [{ tag: { name: 'Time Travel' }, rank: 99 }],
      studios: [{ studio: { name: 'White Fox' } }],
    },
  },
  {
    id: 'demo-4',
    userId: 'demo-user-1',
    animeId: 'anime-104',
    status: 'COMPLETED',
    score: 8.7,
    progress: 12,
    repeat: 0,
    anime: {
      id: 'anime-104',
      anilistId: 101921,
      titleRomaji: 'Kaguya-sama: Love is War',
      titleEnglish: 'Kaguya-sama: Love is War',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101921-S4mY7kL5B1l0.png',
      episodes: 12,
      duration: 24,
      averageScore: 84,
      format: 'TV',
      genres: [{ genre: { name: 'Comedy' } }, { genre: { name: 'Romance' } }, { genre: { name: 'Psychological' } }],
      tags: [{ tag: { name: 'High School' }, rank: 90 }],
      studios: [{ studio: { name: 'A-1 Pictures' } }],
    },
  },
  {
    id: 'demo-5',
    userId: 'demo-user-1',
    animeId: 'anime-105',
    status: 'CURRENT',
    score: 9.0,
    progress: 8,
    repeat: 0,
    anime: {
      id: 'anime-105',
      anilistId: 154587,
      titleRomaji: 'Frieren: Beyond Journey\'s End',
      titleEnglish: 'Frieren: Beyond Journey\'s End',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n6jcL34Dq96A.jpg',
      episodes: 28,
      duration: 24,
      averageScore: 92,
      format: 'TV',
      genres: [{ genre: { name: 'Adventure' } }, { genre: { name: 'Drama' } }, { genre: { name: 'Fantasy' } }],
      tags: [{ tag: { name: 'Magic' }, rank: 96 }],
      studios: [{ studio: { name: 'Madhouse' } }],
    },
  },
  {
    id: 'demo-6',
    userId: 'demo-user-1',
    animeId: 'anime-106',
    status: 'PLANNING',
    score: 0,
    progress: 0,
    repeat: 0,
    anime: {
      id: 'anime-106',
      anilistId: 19,
      titleRomaji: 'Monster',
      titleEnglish: 'Monster',
      coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx19-9k95zWw556Z9.png',
      episodes: 74,
      duration: 24,
      averageScore: 88,
      format: 'TV',
      genres: [{ genre: { name: 'Psychological' } }, { genre: { name: 'Drama' } }, { genre: { name: 'Mystery' } }],
      tags: [{ tag: { name: 'Serial Killer' }, rank: 94 }],
      studios: [{ studio: { name: 'Madhouse' } }],
    },
  },
];

import { calculateCharacterMatch } from '../analytics/characterMatcher';
import { calculateTasteArchetypes } from '../analytics/archetypes';
import { calculateYouVsAnilist } from '../analytics/youVsAnilist';
import { calculateHotTakes } from '../analytics/hotTakes';
import { calculateTastePatterns } from '../analytics/tastePatterns';

export function computeAnalyticsFromUserAnimes(userAnimes: SyncedUserAnime[]) {
  const animeDNA = calculateAnimeDNA(userAnimes);
  const genreStats = calculateAllGenreStats(userAnimes);
  const { scoreStats, meanScore } = calculateScoreStats(userAnimes);
  const { watchStats, totalWatched, episodesWatched, hoursWatched, completionRate } = calculateWatchStats(userAnimes);
  const insights = generateInsights(userAnimes);

  const characterMatch = calculateCharacterMatch(userAnimes);
  const archetype = calculateTasteArchetypes(userAnimes);
  const communityBenchmark = calculateYouVsAnilist(userAnimes);
  const hotTakes = calculateHotTakes(userAnimes);
  const { awards, experiments } = calculateTastePatterns(userAnimes);

  return {
    totalWatched,
    episodesWatched,
    hoursWatched,
    meanScore,
    completionRate,
    animeDNA,
    genreStats,
    scoreStats,
    watchStats,
    insights,
    characterMatch,
    archetype,
    communityBenchmark,
    hotTakes,
    awards,
    experiments,
    lastCalculatedAt: new Date().toISOString(),
  };
}

export async function syncUserAniList(
  userId: string,
  anilistId: number,
  accessToken?: string,
  username?: string
) {
  // If explicitly demo user with no requested username, use demo dataset
  const isDemo = (userId === 'demo-user-1' || userId.startsWith('demo')) && !username && (!anilistId || anilistId === 999999) && !accessToken;

  if (isDemo) {
    const analytics = computeAnalyticsFromUserAnimes(MOCK_DEMO_ANIMES);
    return {
      success: true,
      isDemo: true,
      itemsProcessed: MOCK_DEMO_ANIMES.length,
      userProfile: {
        username: 'OtakuExplorer',
        avatar: 'https://s4.anilist.co/file/anilistcdn/user/avatar/large/default.png',
      },
      analytics,
      userAnimes: MOCK_DEMO_ANIMES,
    };
  }

  try {
    let data: any;

    if (accessToken && !username && anilistId && anilistId !== 999999) {
      // Authenticated sync for current logged-in user
      data = await fetchAniListGraphQL<AniListMediaListCollectionResponse>(
        GET_USER_MEDIA_LIST,
        { userId: anilistId },
        accessToken
      );
    } else {
      // Public profile sync (by username or anilistId) without requiring accessToken
      const variables: Record<string, unknown> = {};
      if (username) {
        variables.userName = username;
      } else if (anilistId && anilistId !== 999999) {
        variables.userId = anilistId;
      } else {
        throw new Error('No valid username or anilistId provided for sync');
      }

      data = await fetchAniListGraphQL<any>(
        GET_PUBLIC_USER_DATA,
        variables,
        accessToken
      );
    }

    const userObj = data.User;
    const userProfile: UserProfileInfo | undefined = userObj
      ? {
          username: userObj.name,
          avatar: userObj.avatar?.large || userObj.avatar?.medium,
          bannerImage: userObj.bannerImage,
        }
      : undefined;

    const lists = data.MediaListCollection?.lists || [];
    const parsedAnimes: SyncedUserAnime[] = [];

    lists.forEach((list: any) => {
      list.entries?.forEach((entry: any) => {
        const media = entry.media;
        if (!media) return;

        parsedAnimes.push({
          id: `ua-${entry.id}`,
          userId,
          animeId: `anime-${media.id}`,
          status: (entry.status || 'COMPLETED') as SyncedUserAnime['status'],
          score: entry.score || 0,
          progress: entry.progress || 0,
          repeat: entry.repeat || 0,
          startedAt: null,
          completedAt: null,
          anime: {
            id: `anime-${media.id}`,
            anilistId: media.id,
            titleRomaji: media.title?.romaji || 'Unknown Title',
            titleEnglish: media.title?.english || media.title?.romaji || 'Unknown Title',
            coverImage: media.coverImage?.large || media.coverImage?.medium || null,
            episodes: media.episodes || 12,
            duration: media.duration || 24,
            averageScore: media.averageScore || 70,
            format: media.format || 'TV',
            genres: (media.genres || []).map((g: string) => ({ genre: { name: g } })),
            tags: (media.tags || []).map((t: any) => ({ tag: { name: t.name }, rank: t.rank })),
            studios: (media.studios?.nodes || []).map((s: any) => ({ studio: { name: s.name } })),
          },
        });
      });
    });

    const analytics = computeAnalyticsFromUserAnimes(parsedAnimes);

    return {
      success: true,
      isDemo: false,
      itemsProcessed: parsedAnimes.length,
      userProfile,
      analytics,
      userAnimes: parsedAnimes,
    };
  } catch (error) {
    console.error('AniList Sync Error:', error);
    // Fallback to demo dataset if API call fails
    const analytics = computeAnalyticsFromUserAnimes(MOCK_DEMO_ANIMES);
    return {
      success: true,
      isDemo: true,
      itemsProcessed: MOCK_DEMO_ANIMES.length,
      analytics,
      userAnimes: MOCK_DEMO_ANIMES,
      error: error instanceof Error ? error.message : 'Unknown sync error',
    };
  }
}

