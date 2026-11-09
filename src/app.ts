import express from "express";
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK",
    message: "Event Registration API is running" });
});

export default app;