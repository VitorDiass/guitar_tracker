import { ApolloServer, gql } from "apollo-server";
import { db } from "./database";
import path from 'path';
import { loadSchemaSync, } from '@graphql-tools/load';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { Resolvers } from "./resolvers";

import {makeExecutableSchema} from '@graphql-tools/schema'
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers, DateTimeResolver, GraphQLDateTime, GraphQLDate} from 'graphql-scalars';

const typeDefs = loadSchemaSync('./**/*.graphql',{
    loaders : [
        new GraphQLFileLoader()
    ]
})

/* const resolvers = {
    Query : {
        getAllUsers : async (parent : any, args : any, context: any) => {
            return await db.user.findMany();
        },
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
}; */


const schema = makeExecutableSchema({
    typeDefs : [...scalarTypeDefs,typeDefs],
    resolvers : [ scalarResolvers, ...Resolvers]
        //Date : GraphQLDate,
})

/* typeDefs,
resolvers : Resolvers */
 
const server = new ApolloServer({schema});

server.listen().then(({url}) => console.log(`server is ready at ${url}`))