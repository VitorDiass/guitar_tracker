import { db } from "../../database"

export const UserResolver = {
        Query : {
            getAllUsers : async (parent : any, args : any, context: any) => {
                return await db.user.findMany();
            },
        }
}