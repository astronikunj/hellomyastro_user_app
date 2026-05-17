import { io } from "socket.io-client";

const SOCKET_URL = "https://socket.digikunj.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
