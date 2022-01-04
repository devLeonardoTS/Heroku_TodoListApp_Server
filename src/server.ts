import http from "http";
import { app } from './app';
import { AddressInfo } from 'node:net';
import { ServerUtils } from "./utils/ServerUtils";
import { FirebaseApi } from "./apis/firebase";
import { Server } from "socket.io";
import { IClientToServerEvents } from "./apis/socketio/interfaces/IClientToServerEvents";
import { IServerToClientEvents } from "./apis/socketio/interfaces/IServerToClientEvents";
import { IInterServerEvents } from "./apis/socketio/interfaces/IInterServerEvents";
import { ISocketData } from "./apis/socketio/interfaces/ISocketData";

ServerUtils.ensureRequiredEnvVars(
    [
        "USER_AUTH_JWT_SECRET",
        "USER_REFRESH_JWT_SECRET",
        "FIREBASE_API_KEY",
        "FIREBASE_ADM_CLIENT_EMAIL",
        "FIREBASE_ADM_PRIVATE_KEY",
        "FIREBASE_ADM_PROJECT_ID"
    ]
);

ServerUtils.listenForApplicationExceptions();

const httpServer = http.createServer(app);

const socketIo = new Server<
    IClientToServerEvents, 
    IServerToClientEvents, 
    IInterServerEvents, 
    ISocketData
>({
    cors: { 
        origin: ["http://localhost:4545"]
    }
});

socketIo.listen(httpServer);

socketIo.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);
    socket.on("hello", () => {
        console.log("Hello received");
    })
});

const httpServerConfig = {
    port: process.env.PORT
}

httpServer.listen(httpServerConfig, () => {
    const { address } = httpServer.address() as AddressInfo;
    console.log(`Server running @ ${address + ":" + process.env.PORT}`);
});

httpServer.on('error', (error) => {
    console.log("Failed to start the Server.");
    console.log(error.message);
    console.log("Shutting down...");
    
    httpServer.close();
});

const firebaseApi = FirebaseApi.getInstance();

export { firebaseApi, socketIo };