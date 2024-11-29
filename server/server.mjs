import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";
import mongoose from "mongoose";
import "dotenv/config";

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
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String,
  }

  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String): Note
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      //trả về all folder
      return fakeData.folders;
    },
    folder: (parent, args) => {
      //Trả về một folder cụ thể dựa trên folderId được truyền từ client.
      const folderId = args.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: (parent, args) => {
      //giải quyết liên kết giữa Foder và Author
      // `parent` là đối tượng `Folder` hiện tại, có thể chứa các thông tin khác
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
};
//resolver and schema (2 kiến thức cơ bản của graphQL)

//connecy to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cnjf7.mongodb.net/`;

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //để sử dụng await ở ngoài thì file phải có tiền tố là .mjs

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.set("strictQuery", false);
mongoose.connect(URI).then(async () => {
  console.log("Connected to MongoDB");
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log("Server listening on port 4000");
});
