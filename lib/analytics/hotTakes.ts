import { HotTakeItem, SyncedUserAnime } from '@/types/analytics';

export function calculateHotTakes(userAnimes: SyncedUserAnime[]): HotTakeItem[] {
  if (!userAnimes || userAnimes.length === 0) {
    return [
      {
        id: 'ht-1',
        animeTitle: 'Demon Slayer: Kimetsu no Yaiba',
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0Cl8Ch1.jpg',
        userScore: 6.5,
        anilistScore: 8.5,
        diff: -2.0,
        type: 'overrated_by_you',
        headline: 'You gave Demon Slayer a 6.5 while AniList users average 8.5.',
      },
      {
        id: 'ht-2',
        animeTitle: 'Monster',
        coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx19-9k95zWw556Z9.png',
        userScore: 9.8,
        anilistScore: 8.8,
        diff: 1.0,
        type: 'underrated_by_you',
        headline: 'You rated Monster a 9.8, appreciating it far more than the average viewer.',
      },
    ];
  }

  const ratedAnimes = userAnimes.filter((ua) => ua.score > 0 && ua.anime.averageScore);
  const items: HotTakeItem[] = [];

  ratedAnimes.forEach((ua) => {
    const userScore10 = ua.score;
    const aniListScore10 = parseFloat(((ua.anime.averageScore || 70) / 10).toFixed(1));
    const diff = parseFloat((userScore10 - aniListScore10).toFixed(1));

    if (diff <= -1.5) {
      items.push({
        id: `ht-${ua.id}`,
        animeTitle: ua.anime.titleEnglish || ua.anime.titleRomaji,
        coverImage: ua.anime.coverImage,
        userScore: userScore10,
        anilistScore: aniListScore10,
        diff,
        type: 'overrated_by_you',
        headline: `You gave ${ua.anime.titleEnglish || ua.anime.titleRomaji} a ${userScore10} while AniList average is ${aniListScore10}.`,
      });
    } else if (diff >= 1.2) {
      items.push({
        id: `ht-${ua.id}`,
        animeTitle: ua.anime.titleEnglish || ua.anime.titleRomaji,
        coverImage: ua.anime.coverImage,
        userScore: userScore10,
        anilistScore: aniListScore10,
        diff,
        type: 'underrated_by_you',
        headline: `You rated ${ua.anime.titleEnglish || ua.anime.titleRomaji} a ${userScore10}, championing it above community consensus (${aniListScore10}).`,
      });
    }
  });

  items.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  return items.slice(0, 4);
}
