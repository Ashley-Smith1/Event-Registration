import { Router } from "express";
import { db } from "../../config/firebaseConfig";
import { HTTP_STATUS } from "../api/v1/httpStatus";
import { validateEvent } from "../middleware/validateEvent";

const router = Router();

// GET - Retrieve all events from Firestore
router.get("/", async (req, res) => {
    try {
        const snapshot = await db.collection("events").get();

        const events = snapshot.docs.map((doc) => doc.data());

        res.status(HTTP_STATUS.OK).json({
            message: "Events retrieved",
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error("Error retrieving events:", error);

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve events"
        });
    }
});

// POST - Create a new event in Firestore
router.post("/", validateEvent, async (req, res) => {
    try {
        const now = new Date().toISOString();

        // Generate a unique Firestore document ID
        const eventRef = db.collection("events").doc();

        const newEvent = {
            id: eventRef.id,
            ...req.body,
            date: new Date(req.body.date).toISOString(),
            createdAt: now,
            updatedAt: now
        };

        // Save the event to Firestore
        await eventRef.set(newEvent);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Event created",
            data: newEvent
        });
    } catch (error) {
        console.error("Error creating event:", error);

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create event"
        });
    }
});

export default router