import express from "express";
import eventRoutes from "./routes/events.routes";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK",
    message: "Event Registration API is running" });
});

app.use("/events", eventRoutes);

export default app;