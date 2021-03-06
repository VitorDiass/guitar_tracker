import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from "apollo-server";
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { Resolvers } from "./resolvers";




const typeDefs = loadSchemaSync('./**/*.graphql',{
    loaders : [
        new GraphQLFileLoader()
    ]
})


const schema = makeExecutableSchema({
    typeDefs : [...scalarTypeDefs,typeDefs],
    resolvers : [ scalarResolvers, ...Resolvers]
        //Date : GraphQLDate,
})

 
const server = new ApolloServer({schema});

server.listen().then(({url}) => console.log(`server is ready at ${url}`))