import { Request, Response, NextFunction } from "express";
import { eventSchema } from "../validation/event.schema";

export const validateEvent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: "Validation failed",
            error: error.details[0].message,
        });
        return;
    }
    next();
};