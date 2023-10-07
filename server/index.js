const {ApolloServer} = require('@apollo/server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const  {startStandaloneServer} = require('@apollo/server/standalone')
require('dotenv').config()
const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true})
    .then( ()=>{
        console.log("Connected to mongo")
        // return server.listen({port: process.env.PORT})
        return startStandaloneServer(server,{
            listen:{port:process.env.PORT}
        })
    })
    .then((res)=>{
        console.log(`server running at ${res.url}`)
    })