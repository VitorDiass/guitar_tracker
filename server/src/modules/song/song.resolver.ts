import { db } from "../../database"
import { Resolvers, Song } from "../../graphql/resolvers.types";

/* export const SongResolver = () => {
    return {
        Query : {
            getSong : async (parent : any, args : any, context: any) => {
                return await db.song.findUnique({where : {song_id : args.id}})
            }
        },
        Mutation : {
            createSong : async (parent : any, args : any, context: any) => {
                return await db.song.create({data : {
                    song_name : args.song_name
                }})
            }
        }
    }
}
 */
export const SongResolver = {
    Query : {
        getSong : async (parent : any, args : any, context: any)=>{
            return await db.song.findUnique({where : {song_id : args.id}});
        },
        getAllSongs : async (parent : any, args : any, context: any) => {
            return await db.song.findMany();
        }
    },
    Mutation : {
        createSong : async (parent : any, args : any, context: any) => {
            return await db.song.create({data : {
                song_name : args.input.song_name,
                artist_name : args.input.artist_name,
                createdAt : new Date(),
                updatedAt : new Date()
            }})
        }
    }
}