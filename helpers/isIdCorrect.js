import { isValidObjectId } from "mongoose";
import httpError from "./HttpError.js";

export const isIdCorrect = (req, res, next) => {

    const { id } = req.params;

    const isValid = isValidObjectId(id)

    if (!isValid){
        next(httpError(400, "Invalid ID"))
    }

    next()
}
