// import contactsService from "../services/contactsServices.js";

import { getAllContactsService } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await getAllContactsService(_id);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};
