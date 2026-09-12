import { SyncedUserAnime, TasteArchetype } from '@/types/analytics';

interface ArchetypeDefinition {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tagline: string;
}

const ARCHETYPES: Record<string, ArchetypeDefinition> = {
  ANALYST: {
    title: 'THE ANALYST',
    subtitle: 'Mind Games & Strategy Specialist',
    description: 'You demand anime that makes you think. Mind games, complex moral puzzles, and psychological tension drive your highest scores.',
    icon: 'Brain',
    tagline: 'Intellect Over Instinct',
  },
  WARRIOR: {
    title: 'THE WARRIOR',
    subtitle: 'High Stakes & Action Specialist',
    description: 'Action, progression, and high-adrenaline combat dominate your library. You live for intense showdowns and triumphant climaxes.',
    icon: 'Swords',
    tagline: 'Driven by Conflict & Growth',
  },
  EMOTIONAL: {
    title: 'THE EMOTIONAL',
    subtitle: 'Character Relationships & Payoff',
    description: 'You live for character relationships and profound emotional payoffs. High drama, tearjerkers, and slice-of-life bonds are your domain.',
    icon: 'Heart',
    tagline: 'Heart Over Hype',
  },
  EXPLORER: {
    title: 'THE EXPLORER',
    subtitle: 'World-building & Concept Enthusiast',
    description: 'You constantly chase unique magic systems, grand sci-fi world-building, and unusual concepts that expand your imagination.',
    icon: 'Compass',
    tagline: 'Boundless Curiosity',
  },
  ROMANTIC: {
    title: 'THE ROMANTIC',
    subtitle: 'Emotional Investment Specialist',
    description: 'You apparently enjoy emotional suffering. Romantic tension, slow burns, and relationship dynamics make up your core library.',
    icon: 'Flame',
    tagline: 'Hooked on Connection',
  },
  CRITIC: {
    title: 'THE DISCERNING CRITIC',
    subtitle: 'High Standards & Masterpiece Collector',
    description: 'You hold extremely high standards for top ratings. You seek cinematic direction, airtight pacing, and flawless character writing.',
    icon: 'ShieldCheck',
    tagline: 'Only the Finest Survive',
  },
};

export function calculateTasteArchetypes(userAnimes: SyncedUserAnime[]): TasteArchetype {
  if (!userAnimes || userAnimes.length === 0) {
    return {
      primary: ARCHETYPES.ANALYST,
      secondary: {
        title: ARCHETYPES.CRITIC.title,
        subtitle: ARCHETYPES.CRITIC.subtitle,
        description: ARCHETYPES.CRITIC.description,
        icon: ARCHETYPES.CRITIC.icon,
      },
    };
  }

  const scores = {
    ANALYST: 0,
    WARRIOR: 0,
    EMOTIONAL: 0,
    EXPLORER: 0,
    ROMANTIC: 0,
    CRITIC: 0,
  };

  userAnimes.forEach((ua) => {
    const genres = (ua.anime.genres || []).map((g) => g.genre.name.toLowerCase());
    const weight = ua.score > 0 ? ua.score / 10 : 1;

    if (genres.includes('psychological') || genres.includes('mystery') || genres.includes('thriller')) {
      scores.ANALYST += 2 * weight;
    }
    if (genres.includes('action') || genres.includes('adventure')) {
      scores.WARRIOR += 2 * weight;
    }
    if (genres.includes('drama') || genres.includes('slice of life')) {
      scores.EMOTIONAL += 2 * weight;
    }
    if (genres.includes('sci-fi') || genres.includes('fantasy')) {
      scores.EXPLORER += 2 * weight;
    }
    if (genres.includes('romance')) {
      scores.ROMANTIC += 2.5 * weight;
    }
    if (ua.score >= 9) {
      scores.CRITIC += 1.5;
    }
  });

  const sortedKeys = (Object.keys(scores) as Array<keyof typeof scores>).sort(
    (a, b) => scores[b] - scores[a]
  );

  const primaryKey = sortedKeys[0] || 'ANALYST';
  const secondaryKey = sortedKeys[1] || 'CRITIC';

  const primaryDef = ARCHETYPES[primaryKey] || ARCHETYPES.ANALYST;
  const secondaryDef = ARCHETYPES[secondaryKey] || ARCHETYPES.CRITIC;

  return {
    primary: primaryDef,
    secondary: {
      title: secondaryDef.title,
      subtitle: secondaryDef.subtitle,
      description: secondaryDef.description,
      icon: secondaryDef.icon,
    },
  };
}
