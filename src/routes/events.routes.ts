import { Router } from "express";
import { db } from "../../config/firebaseConfig";
import { HTTP_STATUS } from "../api/v1/httpStatus";
import { validateEvent } from "../middleware/validateEvent";

const router = Router();

// GET - Retrieve all events from Firestore
router.get("/", async (req, res) => {
    try {
        const snapshot = await db
            .collection("events")
            .orderBy("id", "asc")
            .get();

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

// GET one event by ID
router.get("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        const eventDoc = await db.collection("events").doc(eventId).get();

        if (!eventDoc.exists) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found"
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Event retrieved",
            data: eventDoc.data()
        });

    } catch (error) {
        console.error("Error retrieving event:", error);

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to retrieve event"
        });
    }
});

// PUT - Update an existing event in Firestore
router.put("/:id", validateEvent, async (req, res) => {
    try {
        const eventId = String(req.params.id);
        const eventRef = db.collection("events").doc(eventId);

        // Check if the event exists
        const eventDoc = await eventRef.get();

        if (!eventDoc.exists) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found"
            });
            return;
        }

        // Update the event information
        const updatedEvent = {
            id: eventId,
            ...req.body,
            date: new Date(req.body.date).toISOString(),
            createdAt: eventDoc.data()?.createdAt,
            updatedAt: new Date().toISOString()
        };

        // Save changes to Firestore
        await eventRef.set(updatedEvent);

        res.status(HTTP_STATUS.OK).json({
            message: "Event updated",
            data: updatedEvent
        });

    } catch (error) {
        console.error("Error updating event:", error);

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update event"
        });
    }
});

// DELETE - Remove an event from Firestore
router.delete("/:id", async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventRef = db.collection("events").doc(eventId);

        // Check if the event exists
        const eventDoc = await eventRef.get();

        if (!eventDoc.exists) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Event not found"
            });
            return;
        }

        // Delete the event from Firestore
        await eventRef.delete();

        res.status(HTTP_STATUS.OK).json({
            message: "Event deleted successfully",
            id: eventId
        });

    } catch (error) {
        console.error("Error deleting event:", error);

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to delete event"
        });
    }
});

export default router