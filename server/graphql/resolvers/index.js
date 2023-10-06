const usersResolvers = require("./users")
const messagesResolvers = require('./messages')
module.exports = {
    Query: {
        ...messagesResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResolvers.Mutation
    }
}
