import { gql } from "@apollo/client";

export const GET_ALL_SONGS = gql`
  query getAllSongs {
    getAllSongs {
      song_id
      artist_name
      song_name
      prog_melody
      prog_rhythm
      fromLesson
      instrument_type
      links
      updatedAt
      createdAt
    }
  }
`;
