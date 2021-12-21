import http from "http";
import { app } from './app';
import { AddressInfo } from 'node:net';
import { ServerUtils } from "./utils/ServerUtils";
import { FirebaseApi } from "./apis/firebase";

ServerUtils.ensureRequiredEnvVars(
    [
        "USER_AUTH_JWT_SECRET",
        "FIREBASE_API_KEY",
        "FIREBASE_ADM_CLIENT_EMAIL",
        "FIREBASE_ADM_PRIVATE_KEY",
        "FIREBASE_ADM_PROJECT_ID"
    ]
);

ServerUtils.listenForApplicationExceptions();

const httpServer = http.createServer(app);

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

export const firebaseApi = FirebaseApi.getInstance();