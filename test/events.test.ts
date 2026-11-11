import request from "supertest";
import app from "../src/app";

describe("Event Registration API", () => {
    test("GET /health should return 200 OK", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });

test("GET /events should return 200 OK", async () => {
    const response = await request(app).get("/events");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Events retrieved");
    expect(response.body).toHaveProperty("count");
    expect(Array.isArray(response.body.data)).toBe(true);
});

test("GET /events/:id should return 200 OK", async () => {
    const response = await request(app).get("/events/evt_000001");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event retrieved");
    expect(response.body.data.id).toBe("evt_000001");
});

test("POST /events should return 201 Created", async () => {
    const newEvent = {
        name: "Test Workshop",
        date: "2027-06-15T10:00:00.000Z",
        capacity: 30,
        registrationCount: 0,
        status: "active",
        category: "workshop"
    };

    const response = await request(app)
        .post("/events")
        .send(newEvent);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Event created");
    expect(response.body.data.name).toBe("Test Workshop");
});


test("PUT /events/:id should return 200 OK", async () => {
    const updatedEvent = {
        name: "Updated Test Conference",
        date: "2027-12-25T09:00:00.000Z",
        capacity: 150,
        registrationCount: 20,
        status: "active",
        category: "conference"
    };

    const response = await request(app)
        .put("/events/evt_000001")
        .send(updatedEvent);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event updated");
    expect(response.body.data.name).toBe("Updated Test Conference");
    expect(response.body.data.capacity).toBe(150);
});

test("DELETE /events/:id should return 200 OK", async () => {
    const response = await request(app)
        .delete("/events/evt_000001");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event deleted successfully");
    expect(response.body.id).toBe("evt_000001");
});

});