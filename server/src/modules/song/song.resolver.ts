import { db } from "../../database";
import { SongResolvers } from "../../graphql/resolvers.types";


export const SongResolver : SongResolvers = {
    Query: {
        getSong: async (parent: any, args: any, context: any) => {
            return await db.song.findUnique({ where: { song_id : args.song_id} });
        },
        getAllSongs: async (parent: any, args: any, context: any) => {
            return await db.song.findMany();
        },
    },
    Mutation: {
        createSong: async (parent: any, args: any, context: any) => {
           const res = await db.song.create({
                data: {
                    ...args.input,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            console.log(res);
            return res;
        },
        updateSong: async (parent: any, args: any, context: any) => {
            const res = await db.song.update({
                where: { song_id: args.input?.song_id },
                data: {
                    ...args.input,
                    updatedAt: new Date(),
                },
            });
            console.log(res);
            return res;
        },
        deleteSong : async(parent: any, args: any, context: any) => {
            return await db.song.delete({
                where : {song_id : args.input.song_id}
            })
        }
    },
};
