import express from "express";
import eventRoutes from "./routes/events.routes";
import morgan from "morgan";
import { HTTP_STATUS } from "./api/v1/httpStatus";

const app = express();

// Middleware to read JSON requests
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

// Register the event routes
app.use("/events", eventRoutes);

export default app;