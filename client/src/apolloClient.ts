import { ApolloClient,createHttpLink,InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing,incoming){
              return incoming;
            }
          },
          tasks: {
            merge(existing,incoming){
              return incoming;
            }
          },
        }
      }
    }
  })
const httpLink = createHttpLink({
    uri:"http://localhost:5000/"
})

const authLink = setContext((_, {headers})=>{
    return {
        headers:{
            ...headers,
            authorization:localStorage.getItem("token") || ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //cache: new InMemoryCache()
    cache
})

export default client