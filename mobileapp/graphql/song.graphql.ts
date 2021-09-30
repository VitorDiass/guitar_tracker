import { gql } from "@apollo/client";
import { SongInput } from "./types";

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

export const SAVE_NEW_SONG = gql`
  mutation CreateSongMutation($createSongInput: SongInput!) {
    createSong(input: $createSongInput) {
      artist_name
    }
  }
`;
