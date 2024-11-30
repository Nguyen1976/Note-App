import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import "./firebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

// type Query {//Khi client muốn truy vấn dữ liệu
// }

// type Mutation {//Muốn update and delete data
// }

// type Subscription {//Khi client muốn update data real time
// }

//connecy to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cnjf7.mongodb.net/`;

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); //để sử dụng await ở ngoài thì file phải có tiền tố là .mjs

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];

    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid;

        next();
      })
      .catch((error) => {
        console.error("Invalid token:", error);
        res.status(403).json({ message: "Forbidden" });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
//res.locals chỉ tồn tại trong 1 vòng đời của req
//tham số thứ 2 expressMiddleware là context để có thể chia sẻ cho resolver
// resolver nhận vào context ở tham số thứ 3

mongoose.set("strictQuery", false);
mongoose.connect(URI).then(async () => {
  console.log("Connected to MongoDB");
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log("Server listening on port 4000");
});
