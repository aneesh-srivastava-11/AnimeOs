export const GET_VIEWER_PROFILE = `
  query {
    Viewer {
      id
      name
      avatar {
        large
        medium
      }
      bannerImage
      about
    }
  }
`;

export const GET_USER_MEDIA_LIST = `
  query ($userId: Int) {
    MediaListCollection(userId: $userId, type: ANIME) {
      lists {
        name
        isCustomList
        status
        entries {
          id
          mediaId
          status
          score(format: POINT_10_DECIMAL)
          progress
          repeat
          updatedAt
          createdAt
          startedAt {
            year
            month
            day
          }
          completedAt {
            year
            month
            day
          }
          media {
            id
            title {
              romaji
              english
              native
            }
            description(asHtml: false)
            episodes
            duration
            status
            format
            season
            seasonYear
            averageScore
            meanScore
            popularity
            favourites
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            siteUrl
            genres
            tags {
              id
              name
              category
              isAdult
              rank
            }
            studios(isMain: true) {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RECOMMENDED_MEDIA = `
  query ($genres: [String], $tags: [String], $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(genre_in: $genres, tag_in: $tags, type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC]) {
        id
        title {
          romaji
          english
        }
        description(asHtml: false)
        episodes
        duration
        format
        averageScore
        popularity
        coverImage {
          large
          medium
          color
        }
        genres
        tags {
          name
        }
        siteUrl
      }
    }
  }
`;
