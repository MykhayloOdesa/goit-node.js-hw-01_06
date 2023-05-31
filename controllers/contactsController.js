const contactsService = require("../services/contactsService");
const { controllerWrapper } = require("../utils/helpers/controllerWrapper");

const listContacts = controllerWrapper(async (_, res) => {
  const contacts = await contactsService.listContactsService();
  return res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactByIdService(id);

  return res.json(contact);
});

const addContact = controllerWrapper(async (req, res) => {
  const body = req.body;
  const newContact = await contactsService.addContactService(body);

  return res.status(201).json(newContact);
});

const removeContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  await contactsService.removeContactService(id);

  return res.json({ message: "contact deleted" });
});

const updateContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updatedContact = await contactsService.updateContactService(id, body);

  return res.json(updatedContact);
});

const updateStatusContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (body) {
    body.favorite = true;
  }

  const updatedStatusContact = await contactsService.updateContactService(
    id,
    body
  );

  return res.json(updatedStatusContact);
});

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
