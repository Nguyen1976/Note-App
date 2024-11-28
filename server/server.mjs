import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";

const app = express();
const httpServer = http.createServer(app);

// type Query {//Khi client muốn truy vấn dữ liệu
// }

// type Mutation {//Muốn update and delete data
// }

// type Subscription {//Khi client muốn update data real time
// }
const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author
  }

  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder]
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
  },
  Folder: {
    author: (parent, args) => {
      // `parent` là đối tượng `Folder` hiện tại, có thể chứa các thông tin khác
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
  },
};
//resolver and schema (2 kiến thức cơ bản của graphQL)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //để sử dụng await ở ngoài thì file phải có tiền tố là .mjs

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("Server listening on port 4000");
