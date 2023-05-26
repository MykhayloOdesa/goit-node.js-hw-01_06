const contactsService = require("../services/contactsService");

const listContacts = async (_, response, next) => {
  try {
    const contacts = await contactsService.listContactsService();
    response.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const contact = await contactsService.getContactByIdService(id);
    response.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (request, response, next) => {
  try {
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
    await contactsService.removeContactService(id);
    response.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const updatedContact = await contactsService.updateContactService(id, body);
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
