// import contactsService from "../services/contactsServices.js";

import {
  addContactService,
  getAllContactsService, removeContactService,
} from "../services/contactsServices.js";
import httpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await getAllContactsService(_id);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response  = await removeContactService(id)

    if (!response) {
      throw httpError(404)
    }

    res.status(200).json(response)
  } catch (e) {
    next(e);
  }
};

export const createContact = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await addContactService(_id, req.body);

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};
