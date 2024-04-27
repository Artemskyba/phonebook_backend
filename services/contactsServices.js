import { Contact } from "../db/models/contacts.js";

export const getAllContactsService = (owner) => Contact.find({ owner });
