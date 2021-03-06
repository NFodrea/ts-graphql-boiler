// import "reflect-metadata";
import { resolvers } from './resolvers';
import {createConnection} from "typeorm";
import { ApolloServer }  from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import * as express from 'express';
import * as session from 'express-session';

const startServer = async () => {
    const server = new ApolloServer({
        // These will be defined for both new or existing servers
        typeDefs,
        resolvers,
        context: ({req}: any) =>({req})
      });

      //ensure we have a db connection before server starts
      await createConnection();
      
      const app = express();

      app.use(
        session({
          secret: "asdjlfkaasdfkjlads",
          resave: false,
          saveUninitialized: false
        })
      );
      
      server.applyMiddleware({ app, cors: {
        credentials: true,
        origin: "http://localhost:3001"    
      }
    }); // app is from an existing express app
      
      app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
      )
}
startServer();
