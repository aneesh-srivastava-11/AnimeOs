export const SAVE_MEDIA_LIST_ENTRY = `
  mutation ($mediaId: Int, $status: MediaListStatus, $score: Float, $progress: Int) {
    SaveMediaListEntry (mediaId: $mediaId, status: $status, score: $score, progress: $progress) {
      id
      mediaId
      status
      score(format: POINT_10_DECIMAL)
      progress
      updatedAt
    }
  }
`;
