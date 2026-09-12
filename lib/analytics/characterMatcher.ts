import { CharacterMatch, SyncedUserAnime } from '@/types/analytics';

interface CharacterProfile {
  name: string;
  anime: string;
  anilistMediaId: number;
  avatarUrl: string;
  quote: string;
  description: string;
  weights: {
    psychological: number;
    characterDriven: number;
    darkThemes: number;
    action: number;
    romance: number;
    sciFi: number;
    strategy: number;
    emotional: number;
  };
}

const CHARACTERS: CharacterProfile[] = [
  {
    name: 'L',
    anime: 'Death Note',
    anilistMediaId: 1535,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b71-1W4panC53vfs.png',
    quote: 'Risking your life and doing something that could easily rob you of your life are exact opposites.',
    description: 'Your taste is analytical, highly psychological, and driven by strategy, mind games, and moral ambiguity.',
    weights: {
      psychological: 95,
      characterDriven: 90,
      darkThemes: 85,
      action: 40,
      romance: 10,
      sciFi: 50,
      strategy: 98,
      emotional: 30,
    },
  },
  {
    name: 'Lelouch vi Britannia',
    anime: 'Code Geass',
    anilistMediaId: 1575,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b417-gVLmIJu9phcK.png',
    quote: 'If the king does not lead, how can he expect his subordinates to follow?',
    description: 'You thrive on high-stakes drama, grand strategy, complex characters, and morally gray tactical warfare.',
    weights: {
      psychological: 90,
      characterDriven: 92,
      darkThemes: 80,
      action: 78,
      romance: 35,
      sciFi: 75,
      strategy: 96,
      emotional: 65,
    },
  },
  {
    name: 'Guts',
    anime: 'Berserk',
    anilistMediaId: 33,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b422-XTaiTuvRohsV.png',
    quote: 'He who stumbles and falls, and picks himself up again, is a true warrior.',
    description: 'Your library leans heavily toward intense, dark, visceral narratives with relentless willpower and high stakes.',
    weights: {
      psychological: 80,
      characterDriven: 85,
      darkThemes: 98,
      action: 95,
      romance: 40,
      sciFi: 15,
      strategy: 60,
      emotional: 70,
    },
  },
  {
    name: 'Spike Spiegel',
    anime: 'Cowboy Bebop',
    anilistMediaId: 1,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b1-ChxaldmieFlQ.png',
    quote: 'Whatever happens, happens.',
    description: 'You appreciate cool atmosphere, episodic depth, jazz-infused Sci-Fi, and melancholic character arcs.',
    weights: {
      psychological: 70,
      characterDriven: 90,
      darkThemes: 65,
      action: 82,
      romance: 45,
      sciFi: 90,
      strategy: 55,
      emotional: 75,
    },
  },
  {
    name: 'Frieren',
    anime: 'Frieren: Beyond Journey\'s End',
    anilistMediaId: 154587,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b176754-PCnpqIOkjhFk.png',
    quote: 'It’s what we do with the time after the journey that truly matters.',
    description: 'You savor quiet world-building, profound emotional depth, longevity, and reflective character journeys.',
    weights: {
      psychological: 65,
      characterDriven: 96,
      darkThemes: 40,
      action: 60,
      romance: 30,
      sciFi: 20,
      strategy: 50,
      emotional: 95,
    },
  },
  {
    name: 'Senku Ishigami',
    anime: 'Dr. STONE',
    anilistMediaId: 105333,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b126245-B3cm11ZSyXlN.jpg',
    quote: 'Ten billion percent! Science always wins.',
    description: 'You are fascinated by clever problem-solving, world progression, inventions, and logical creativity.',
    weights: {
      psychological: 75,
      characterDriven: 80,
      darkThemes: 25,
      action: 65,
      romance: 15,
      sciFi: 92,
      strategy: 90,
      emotional: 45,
    },
  },
  {
    name: 'Rintarou Okabe',
    anime: 'Steins;Gate',
    anilistMediaId: 9253,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b35252-DY9TW6pusqeh.png',
    quote: 'El Psy Kongroo.',
    description: 'You love intricate temporal plots, intense psychological tension, sci-fi mechanics, and deep emotional stakes.',
    weights: {
      psychological: 94,
      characterDriven: 90,
      darkThemes: 75,
      action: 45,
      romance: 60,
      sciFi: 96,
      strategy: 88,
      emotional: 85,
    },
  },
  {
    name: 'Satoru Gojo',
    anime: 'Jujutsu Kaisen',
    anilistMediaId: 102783,
    avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b127691-9zqh1xpIubn7.png',
    quote: 'Throughout Heaven and Earth, I alone am the honored one.',
    description: 'You gravitate toward peak modern animation, flashy high-octane battles, swagger, and charismatic leads.',
    weights: {
      psychological: 60,
      characterDriven: 80,
      darkThemes: 70,
      action: 98,
      romance: 20,
      sciFi: 40,
      strategy: 75,
      emotional: 50,
    },
  },
];

export function calculateCharacterMatch(userAnimes: SyncedUserAnime[]): CharacterMatch {
  if (!userAnimes || userAnimes.length === 0) {
    const defaultChar = CHARACTERS[0];
    return {
      characterName: defaultChar.name,
      animeTitle: defaultChar.anime,
      matchPercentage: 90,
      avatarUrl: defaultChar.avatarUrl,
      quote: defaultChar.quote,
      description: defaultChar.description,
      overlappingTraits: [
        { trait: 'Psychological', userScore: 90, matchScore: 95 },
        { trait: 'Strategy', userScore: 88, matchScore: 98 },
        { trait: 'Character-driven', userScore: 85, matchScore: 90 },
      ],
    };
  }

  // Calculate User Taste Profile Vector from user's synced library
  let psychoCount = 0;
  let charDrivenCount = 0;
  let darkCount = 0;
  let actionCount = 0;
  let romanceCount = 0;
  let sciFiCount = 0;

  const total = userAnimes.length;

  userAnimes.forEach((ua) => {
    const genres = (ua.anime.genres || []).map((g) => g.genre.name.toLowerCase());
    const tags = (ua.anime.tags || []).map((t) => t.tag.name.toLowerCase());

    if (genres.includes('psychological') || tags.includes('mind games') || tags.includes('philosophical')) psychoCount++;
    if (genres.includes('drama') || tags.includes('character development')) charDrivenCount++;
    if (genres.includes('horror') || genres.includes('thriller') || tags.includes('dark')) darkCount++;
    if (genres.includes('action')) actionCount++;
    if (genres.includes('romance')) romanceCount++;
    if (genres.includes('sci-fi') || tags.includes('time travel') || tags.includes('space')) sciFiCount++;
  });

  const userVector = {
    psychological: Math.min(100, Math.round((psychoCount / total) * 200)),
    characterDriven: Math.min(100, Math.round((charDrivenCount / total) * 180)),
    darkThemes: Math.min(100, Math.round((darkCount / total) * 200)),
    action: Math.min(100, Math.round((actionCount / total) * 160)),
    romance: Math.min(100, Math.round((romanceCount / total) * 220)),
    sciFi: Math.min(100, Math.round((sciFiCount / total) * 220)),
    strategy: Math.min(100, Math.round(((psychoCount + darkCount) / (total * 2)) * 200)),
    emotional: Math.min(100, Math.round(((charDrivenCount + romanceCount) / (total * 2)) * 200)),
  };

  // Find Best Character Match via weighted distance + library match boosting
  let bestMatch = CHARACTERS[0];
  let bestScore = -Infinity;

  CHARACTERS.forEach((char) => {
    let diffSum = 0;
    const keys = Object.keys(userVector) as Array<keyof typeof userVector>;
    keys.forEach((key) => {
      diffSum += Math.abs(userVector[key] - char.weights[key]);
    });
    // Base similarity score
    let similarity = 100 - diffSum / keys.length;

    // Dynamic Library Boost: If user watched & scored this anime, boost match score
    const matchedUserAnime = userAnimes.find((ua) => ua.anime.anilistId === char.anilistMediaId);
    if (matchedUserAnime) {
      const userRating = matchedUserAnime.score || 8.0;
      similarity += (userRating / 10) * 15; // Up to +15 score boost for shows watched & loved
    }

    if (similarity > bestScore) {
      bestScore = similarity;
      bestMatch = char;
    }
  });

  const matchPercentage = Math.min(99, Math.max(78, Math.round(bestScore)));

  // If user watched the matched anime, check if they have a cover image to use as avatar fallback
  const matchedAnimeInLibrary = userAnimes.find((ua) => ua.anime.anilistId === bestMatch.anilistMediaId);
  const resolvedAvatarUrl = bestMatch.avatarUrl || matchedAnimeInLibrary?.anime.coverImage || '';

  // Extract Top 3 Overlapping Traits
  const traits = [
    { name: 'Psychological stories', user: userVector.psychological, match: bestMatch.weights.psychological },
    { name: 'Character depth', user: userVector.characterDriven, match: bestMatch.weights.characterDriven },
    { name: 'Strategic narratives', user: userVector.strategy, match: bestMatch.weights.strategy },
    { name: 'Action & stakes', user: userVector.action, match: bestMatch.weights.action },
    { name: 'Dark themes', user: userVector.darkThemes, match: bestMatch.weights.darkThemes },
    { name: 'Sci-Fi concepts', user: userVector.sciFi, match: bestMatch.weights.sciFi },
  ];

  traits.sort((a, b) => (b.user + b.match) - (a.user + a.match));

  return {
    characterName: bestMatch.name,
    animeTitle: bestMatch.anime,
    matchPercentage,
    avatarUrl: resolvedAvatarUrl,
    quote: bestMatch.quote,
    description: bestMatch.description,
    overlappingTraits: traits.slice(0, 3).map((t) => ({
      trait: t.name,
      userScore: Math.max(40, t.user),
      matchScore: Math.max(40, t.match),
    })),
  };
}

