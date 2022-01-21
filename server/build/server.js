"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
//import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
//import { loadSchemaSync } from '@graphql-tools/load';
var schema_1 = require("@graphql-tools/schema");
var apollo_server_1 = require("apollo-server");
var graphql_scalars_1 = require("graphql-scalars");
var resolvers_1 = require("./resolvers");
//const typeDefs = loadSchemaSync('./**/*.graphql',{
/*    loaders : [
        new GraphQLFileLoader()
    ]
}) */
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: __spreadArray([], graphql_scalars_1.typeDefs, true),
    resolvers: __spreadArray([graphql_scalars_1.resolvers], resolvers_1.Resolvers, true)
    //Date : GraphQLDate,
});
var server = new apollo_server_1.ApolloServer({ cors: { origin: '*', methods: 'POST' }, schema: schema });
//
server.listen({ port: process.env.PORT || 4444 }).then(function (_a) {
    var url = _a.url;
    return console.log("server is ready at " + url);
});
//# sourceMappingURL=server.js.map