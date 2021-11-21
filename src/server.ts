import http from "http";
import { app } from './app';
import { AddressInfo } from 'node:net';

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