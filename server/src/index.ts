import cors from "cors";
import express from "express";
import http from "http";
import router from "./router";
// Create a Socket.IO server instance
const port = Number(process.env.PORT);

const application = express();
application.use(cors());

// application.use(cors());
/** Server Handling */
const httpServer = http.createServer(application);

/** Log the request */
application.use((req, res, next) => {
    if (req.url !== "/ping") {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on("finish", () => {
            console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });
    }

    next();
});

application.use(router);

/** Listen */
httpServer.listen(port, () => console.info(`Server is running on port ${port}.`));
