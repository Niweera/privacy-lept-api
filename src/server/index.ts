import { Server as IOServer, Socket } from "socket.io";
import http, { Server } from "http";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../utilities/interfaces";
import type { Application } from "express";
import express from "express";
import Middleware from "../middleware";
import Controller from "../controllers";
import ErrorHandlingMiddleware from "../middleware/error-handling";

export const app: Application = express();
app.disable("x-powered-by");

const server: Server = http.createServer(app);

export let io: IOServer;
io = new IOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: ["http://127.0.0.1:4000", "https://niweera.gq"],
  },
});

Middleware(app);
app.use("", Controller);
ErrorHandlingMiddleware(app);

io.on("connection", (socket: Socket) => {
  console.log(`client connected: ${socket.id}`);
  socket.emit("notification", "Privacy-Lept-API Connected!");
  socket.on("disconnect", () => {
    console.log(`client disconnected: ${socket.id}`);
  });
});

export default server;
