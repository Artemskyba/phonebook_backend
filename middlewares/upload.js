import multer from "multer"
import path from "path"
import httpError from "../helpers/httpError.js";

const tempDir = path.resolve("tmp")

const multerConfig = multer.diskStorage({
    destination: tempDir,
});

export const upload = multer({
    storage: multerConfig,
})
