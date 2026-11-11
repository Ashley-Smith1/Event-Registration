const mockEvents = [
    {
        id: "evt_000001",
        name: "Test Conference",
        capacity: 100,
        registrationCount: 20,
        status: "active",
        category: "conference"
    }
];

// Mock Firebase so tests don't change the real database
jest.mock("../config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(() => ({
            // GET all events
            orderBy: jest.fn(() => ({
                get: jest.fn(async () => ({
                    docs: mockEvents.map((event) => ({
                        data: () => event
                    }))
                }))
            })),

            // GET one event, POST, PUT, and DELETE
            doc: jest.fn((id?: string) => ({
                id: id || "new_test_event_001",

                get: jest.fn(async () => {
                    const event = mockEvents.find(
                        (event) => event.id === id
                    );

                    return {
                        exists: !!event,
                        data: () => event
                    };
                }),

                set: jest.fn(async () => {
                    return;
                }),

                delete: jest.fn(async () => {
                    return;
                })
            }))
        }))
    }
}));

afterEach(() => {
    jest.clearAllMocks();
});