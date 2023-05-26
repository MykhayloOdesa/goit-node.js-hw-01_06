const contactsService = require("../services/contactsService");
const { contactsSchema } = require("../helpers/schemas/contactsSchema");
const { GlobalErrorHandler } = require("../middlewares/GlobalErrorHandler");

const listContacts = async (_, response, next) => {
  try {
    const contacts = await contactsService.listContactsService();
    return response.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const contact = await contactsService.getContactByIdService(id);

    if (!contact) {
      throw new GlobalErrorHandler(
        404,
        response.json({ message: "Not found" })
      );
    }

    return response.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (request, response, next) => {
  try {
    const { error } = contactsSchema.validate(request.body);
    if (error) {
      throw new GlobalErrorHandler(
        400,
        response.json({ message: "missing required name field" })
      );
    }

    const body = request.body;
    const newContact = await contactsService.addContactService(body);
    return response.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (request, response, next) => {
  try {
    const { id } = request.params;
    const removedContact = await contactsService.removeContactService(id);

    if (!removedContact) {
      throw new GlobalErrorHandler(
        404,
        response.json({ message: "Not found" })
      );
    }

    return response.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    const { error } = contactsSchema.validate(request.body);

    if (error) {
      throw new GlobalErrorHandler(
        400,
        response.json({ message: "missing fields" })
      );
    }

    const { id } = request.params;
    const body = request.body;

    const updatedContact = await contactsService.updateContactService(id, body);

    if (!updatedContact) {
      throw new GlobalErrorHandler(
        404,
        response.json({ message: "Not found" })
      );
    }

    response.json(updatedContact);
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
