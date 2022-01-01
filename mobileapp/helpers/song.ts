export const SongOrderBy : any = {
  song_id: "Id",
  song_name: "Song Name",
  artist_name: "Artist Name",
  createdAt: "Date Created",
  updatedAt: "Date Updated",
  prog_melody: "Melody Prog.",
  prog_rhythm: 'Rhythm Prog.'
};

interface SongKeys {
  [key : string] : string | number | boolean | Date | undefined
}

export interface Song extends SongKeys{
  artist_name: string
  createdAt?: Date
  fromLesson?: boolean
  instrument_type?: number
  links?: string
  prog_melody: number
  prog_rhythm: number
  song_id: string
  song_name: string
  updatedAt?: Date
}


interface SongFormValue {
  artist_name : string
  song_name : string
  prog_melody : number
  prog_rhythm : number
  fromLesson : boolean
  links : string
}



export const SongEditFormValue : SongFormValue = {
  artist_name : '',
  song_name : '',
  prog_melody : 0,
  prog_rhythm : 0,
  fromLesson : false,
  links : ''
}