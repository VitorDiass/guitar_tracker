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

export const SAVE_NEW_SONG = gql`
  mutation CreateSongMutation($createSongInput: SongInput!) {
    createSong(input: $createSongInput) {
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

export const SAVE_EDIT_SONG = gql`
  mutation EditSongMutation($editSongInput: SongInput!){
    updateSong(input: $editSongInput){
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
`

export const DELETE_SONG = gql`
  mutation DeleteSongMutation($deleteSongInput: DeleteSongInput!){
    deleteSong(input: $deleteSongInput){
      song_id
    }
  }
`