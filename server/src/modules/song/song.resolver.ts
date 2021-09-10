import { db } from "../../database";
import { Resolvers, Song } from "../../graphql/resolvers.types";
import { checkArgsInput } from "../../utils";

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
    Query: {
        getSong: async (parent: any, args: any, context: any) => {
            return await db.song.findUnique({ where: { song_id: args.song_id } });
        },
        getAllSongs: async (parent: any, args: any, context: any) => {
            return await db.song.findMany();
        },
    },
    Mutation: {
        createSong: async (parent: any, args: any, context: any) => {
            return await db.song.create({
                data: {
                    ...args.input,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        },
        updateSong: async (parent: any, args: any, context: any) => {
            return await db.song.update({
                where: { song_id: args.input?.song_id },
                data: {
                    ...args.input,
                    updatedAt: new Date(),
                },
            });
        },
    },
};
