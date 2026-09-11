const ANILIST_GRAPHQL_URL = 'https://graphql.anilist.co';

export interface AniListGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; status?: number }>;
}

export async function fetchAniListGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  accessToken?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(ANILIST_GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 0 }, // No caching for direct user sync calls
  });

  if (response.status === 429) {
    throw new Error('AniList API rate limit reached. Please wait a minute and try again.');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AniList GraphQL error (${response.status}): ${errorText}`);
  }

  const result: AniListGraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(`AniList GraphQL Error: ${result.errors[0].message}`);
  }

  if (!result.data) {
    throw new Error('No data returned from AniList API');
  }

  return result.data;
}
