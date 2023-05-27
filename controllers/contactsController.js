const contactsService = require("../services/contactsService");
const { contactsSchema } = require("../utils/helpers/schemas/contactsSchema");
const { HttpError } = require("../utils/helpers/middlewares/HttpError");

const listContacts = async (_, res, next) => {
  try {
    const contacts = await contactsService.listContactsService();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactByIdService(id);

    if (!contact) {
      throw new HttpError(404, res.json({ message: "Not found" }));
    }

    return res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new HttpError(
        400,
        res.json({ message: "missing required name field" })
      );
    }

    const body = req.body;
    const newContact = await contactsService.addContactService(body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contactsService.removeContactService(id);

    if (!removedContact) {
      throw new HttpError(404, res.json({ message: "Not found" }));
    }

    return res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw new HttpError(400, res.json({ message: "missing fields" }));
    }

    const { id } = req.params;
    const body = req.body;

    const updatedContact = await contactsService.updateContactService(id, body);

    if (!updatedContact) {
      throw new HttpError(404, res.json({ message: "Not found" }));
    }

    return res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
