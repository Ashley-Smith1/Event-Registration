import { Router } from "express";
import { eventData } from "../api/v1/event";
import { HTTP_STATUS } from "../api/v1/httpStatus";

const router = Router();

router.get("/", (req, res) => {
    res.status(HTTP_STATUS.OK).json(eventData);
});

export default router;