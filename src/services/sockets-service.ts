import { io } from "../server";

export default class SocketsService {
  emitConnected = (hostType: string | string[]): void => {
    if (!io) return;
    io.emit("notification", hostType);
    console.log("Connection details emitted");
  };
}
