import express from "express";
import connectionToDatabase from "./src/db/connection.js";
import deserializeUser from "./src/middleware/deserializeuser.middleware.js";
import cors from "cors";
import routeFunc from "./src/route/route.js";
import { config } from "dotenv";
import { createServer } from "http";
import { initSocket } from "./src/socket.js";

config();
const app = express();
app.use((req, res, next)=>{
  console.log(req.originalUrl);
  next();
})
const server = createServer(app);
app.use(express.json());

app.use(deserializeUser);
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(deserializeUser);

// setup routes
routeFunc(app);

// initialize socket.io
const io = initSocket(server);
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, async () => {
  try {
    console.log(`http://${HOST}:${PORT}`);
    connectionToDatabase();
  } catch (error) {
  }
});