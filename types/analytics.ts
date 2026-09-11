export interface AnimeDNAGenre {
  genre: string;
  count: number;
  percentage: number;
  weightedScore: number;
  color: string;
}

export interface ScoreDistributionItem {
  score: number; // 1 - 10
  count: number;
}

export interface WatchStatusBreakdown {
  COMPLETED: number;
  CURRENT: number;
  PLANNING: number;
  PAUSED: number;
  DROPPED: number;
  REPEATING: number;
}

export interface NaturalLanguageInsight {
  id: string;
  title: string;
  description: string;
  category: 'taste' | 'score' | 'behavior' | 'length';
  icon: string;
}

export interface ComputedUserAnalytics {
  totalWatched: number;
  episodesWatched: number;
  hoursWatched: number;
  meanScore: number;
  completionRate: number;
  animeDNA: AnimeDNAGenre[];
  genreStats: AnimeDNAGenre[];
  scoreStats: ScoreDistributionItem[];
  watchStats: WatchStatusBreakdown;
  insights: NaturalLanguageInsight[];
}

export interface SyncedUserAnime {
  id: string;
  userId: string;
  animeId: string;
  status: 'COMPLETED' | 'CURRENT' | 'PLANNING' | 'PAUSED' | 'DROPPED' | 'REPEATING';
  score: number;
  progress: number;
  repeat: number;
  startedAt?: Date | null;
  completedAt?: Date | null;
  anime: {
    id: string;
    anilistId: number;
    titleRomaji: string;
    titleEnglish?: string | null;
    coverImage?: string | null;
    episodes?: number | null;
    duration?: number | null;
    averageScore?: number | null;
    format?: string | null;
    genres: Array<{ genre: { name: string } }>;
    tags: Array<{ tag: { name: string }; rank?: number | null }>;
    studios: Array<{ studio: { name: string } }>;
  };
}
