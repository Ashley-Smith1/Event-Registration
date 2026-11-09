import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Here are all the events",
        events: []
     });
});

export default router;