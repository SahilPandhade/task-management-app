const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { startStandaloneServer } = require('@apollo/server/standalone')
const http = require('http')
const dotenv = require('dotenv')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled')
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const express = require('express')
const pkg = require('body-parser')
const { json } = pkg;
const cors = require('cors')
const path = require('path')

async function startApolloServer() {
    if (process.env.NODE_ENV !== "production") {
        dotenv.config()
    }
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            process.env.NODE_ENV !== "production" ?
                ApolloServerPluginLandingPageLocalDefault() :
                ApolloServerPluginLandingPageDisabled()
        ],
    })
    console.log(path.resolve(path.join(__dirname,"..",".."),'client','dist','index.html'))
    if(process.env.NODE_ENV == "production") {
        app.use(express.static('client/build'))
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(path.join(__dirname,"..",".."),'client','dist','index.html'))
        })
    }

    await server.start();
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {}),
    );
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => {
            console.log("Connected to mongo")
            // return server.listen({port: process.env.PORT})
            // return startStandaloneServer(server,{
            //     listen:{port:process.env.PORT,
            //     }
            // })
            return new Promise(() => httpServer.listen({ port: process.env.PORT }, ()=>{
                console.log("Server running at 5000",)
            }));
        })
        // .then((res) => {
        //     console.log(`server running at ${res}`)
        // })
}
startApolloServer()
