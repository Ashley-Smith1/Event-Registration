import express from "express";
import eventRoutes from "./routes/events.routes";
import morgan from "morgan";

const app = express();

// Middleware to read JSON requests
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK",
    message: "Event Registration API is running" });
});

// Register the event routes
app.use("/events", eventRoutes);

export default app;