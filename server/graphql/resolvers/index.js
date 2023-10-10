const usersResolvers = require("./users")
const taskResolvers = require('./tasks')
module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...taskResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...taskResolvers.Mutation
    }
}
