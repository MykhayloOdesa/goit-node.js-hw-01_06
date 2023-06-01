const contactsService = require("../services/contactsService");
const { controllerWrapper } = require("../utils/helpers/controllerWrapper");

const getContacts = controllerWrapper(async (_, res) => {
  const contacts = await contactsService.getContactsService();
  return res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactByIdService(id);

  return res.json(contact);
});

const addContact = controllerWrapper(async (req, res) => {
  const newContact = await contactsService.addContactService(req.body);

  return res.status(201).json(newContact);
});

const removeContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  await contactsService.removeContactService(id);

  return res.json({ message: "contact deleted" });
});

const updateContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await contactsService.updateContactService(
    id,
    req.body
  );

  return res.json(updatedContact);
});

const updateStatusContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedStatusContact = await contactsService.updateStatusContactService(
    id,
    req.body
    // (req.body.favorite = true)
  );

  return res.json(updatedStatusContact);
});

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
