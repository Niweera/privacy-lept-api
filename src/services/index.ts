import SocketsService from "./sockets-service";
import type { Request } from "express";

export default class Service {
  emitHostType = (headers: Request["headers"]): void => {
    const socketsService: SocketsService = new SocketsService();
    const hostType: string | string[] = headers["privacy-lept-host-type"];
    socketsService.emitConnected(hostType);
  };
}
