import express from "express";
import {
  getAllContacts,
  deleteContact,
  createContact,
} from "../controllers/contactsControllers.js";
import { privateRoutesMiddleware } from "../middlewares/authMiddlewares.js";
import validateBody from "../helpers/validateBody.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import {isIdCorrect} from "../helpers/isIdCorrect.js";

const contactsRouter = express.Router();

contactsRouter.get("/", privateRoutesMiddleware, getAllContacts);

contactsRouter.delete("/:id", privateRoutesMiddleware, isIdCorrect, deleteContact);

contactsRouter.post(
  "/",
  privateRoutesMiddleware,
  validateBody(createContactSchema),
  createContact
);

export default contactsRouter;
