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
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var load_1 = require("@graphql-tools/load");
var schema_1 = require("@graphql-tools/schema");
var apollo_server_1 = require("apollo-server");
var graphql_scalars_1 = require("graphql-scalars");
var resolvers_1 = require("./resolvers");
var typeDefs = (0, load_1.loadSchemaSync)('./**/*.graphql', {
    loaders: [
        new graphql_file_loader_1.GraphQLFileLoader()
    ]
});
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: __spreadArray(__spreadArray([], graphql_scalars_1.typeDefs, true), [typeDefs], false),
    resolvers: __spreadArray([graphql_scalars_1.resolvers], resolvers_1.Resolvers, true)
    //Date : GraphQLDate,
});
var server = new apollo_server_1.ApolloServer({ schema: schema });
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("server is ready at " + url);
});
//# sourceMappingURL=server.js.map