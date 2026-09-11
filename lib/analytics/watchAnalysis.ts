import { SyncedUserAnime, WatchStatusBreakdown } from '@/types/analytics';

export function calculateWatchStats(userAnimes: SyncedUserAnime[]): {
  watchStats: WatchStatusBreakdown;
  totalWatched: number;
  episodesWatched: number;
  hoursWatched: number;
  completionRate: number;
} {
  const watchStats: WatchStatusBreakdown = {
    COMPLETED: 0,
    CURRENT: 0,
    PLANNING: 0,
    PAUSED: 0,
    DROPPED: 0,
    REPEATING: 0,
  };

  let totalEpisodes = 0;
  let totalMinutes = 0;

  userAnimes.forEach((ua) => {
    const status = ua.status as keyof WatchStatusBreakdown;
    if (watchStats[status] !== undefined) {
      watchStats[status]++;
    }

    const progress = ua.progress || 0;
    const duration = ua.anime?.duration || 24; // Default 24 mins if unknown

    totalEpisodes += progress;
    totalMinutes += progress * duration;
  });

  const totalStarted = watchStats.COMPLETED + watchStats.CURRENT + watchStats.PAUSED + watchStats.DROPPED;
  const completionRate = totalStarted > 0 ? Math.round((watchStats.COMPLETED / totalStarted) * 100) : 0;
  const hoursWatched = parseFloat((totalMinutes / 60).toFixed(1));

  return {
    watchStats,
    totalWatched: watchStats.COMPLETED,
    episodesWatched: totalEpisodes,
    hoursWatched,
    completionRate,
  };
}
