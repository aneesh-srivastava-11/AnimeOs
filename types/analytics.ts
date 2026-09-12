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

export interface CharacterMatch {
  characterName: string;
  animeTitle: string;
  matchPercentage: number;
  avatarUrl: string;
  quote: string;
  description: string;
  overlappingTraits: Array<{
    trait: string;
    userScore: number;
    matchScore: number;
  }>;
}

export interface TasteArchetype {
  primary: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    tagline: string;
  };
  secondary: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
  };
}

export interface YouVsAnilistBenchmark {
  genreComparisons: Array<{
    genre: string;
    userPercentage: number;
    anilistPercentage: number;
    multiplier: number;
  }>;
  scoringPersonality: {
    type: 'Generous Critic' | 'Selective & Discerning' | 'Everything-is-an-8' | 'Polarizing Rater' | 'Balanced Evaluator';
    userAverage: number;
    anilistAverage: number;
    difference: number;
    description: string;
  };
}

export interface HotTakeItem {
  id: string;
  animeTitle: string;
  coverImage?: string | null;
  userScore: number;
  anilistScore: number;
  diff: number;
  type: 'underrated_by_you' | 'overrated_by_you' | 'hot_take';
  headline: string;
}

export interface AnimeAwardItem {
  category: string;
  icon: string;
  animeTitle: string;
  coverImage?: string | null;
  userScore: number;
  reason: string;
}

export interface TasteExperiment {
  title: string;
  description: string;
  metric: string;
  icon: string;
}

export interface AnimeExplanation {
  animeId: string;
  title: string;
  userScore: number;
  headline: string;
  summary: string;
  featureMatches: Array<{
    feature: string;
    userPreferenceLevel: 'Very High' | 'High' | 'Moderate' | 'Low';
    percentage: number;
  }>;
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
  characterMatch?: CharacterMatch;
  archetype?: TasteArchetype;
  communityBenchmark?: YouVsAnilistBenchmark;
  hotTakes?: HotTakeItem[];
  awards?: AnimeAwardItem[];
  experiments?: TasteExperiment[];
}

export interface SyncedUserAnime {
  id: string;
  userId: string;
  animeId: string;
  mediaType?: 'ANIME' | 'MANGA';
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
    chapters?: number | null;
    duration?: number | null;
    averageScore?: number | null;
    format?: string | null;
    genres: Array<{ genre: { name: string } }>;
    tags: Array<{ tag: { name: string }; rank?: number | null }>;
    studios: Array<{ studio: { name: string } }>;
  };
}

