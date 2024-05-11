import { Contact } from "../db/models/contacts.js";

export const getAllContactsService = (owner) => Contact.find({ owner });

export const addContactService = (owner, data) => Contact.create({ owner, ...data });
export const removeContactService = (id) => Contact.findByIdAndDelete(id);

