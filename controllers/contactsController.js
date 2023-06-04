const { Contacts } = require("../models/Contacts");
const { HttpError } = require("../utils/HttpError");
const { controllerWrapper } = require("../utils/controllerWrapper");

const getContacts = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite === "true") {
    filter.favorite = true;
  }

  if (!favorite) {
    filter.favorite = false;
  }

  const contacts = await Contacts.find(filter, {
    skip,
    limit,
  }).populate("owner", "email subscription");

  return res.json(contacts);
});

const getContactById = controllerWrapper(async (req, res) => {
  const { contactID } = req.params;
  const contact = await Contacts.findById(contactID);

  if (!contact) {
    throw new HttpError(404, `Contact with ${contactID} not found`);
  }

  return res.json(contact);
});

const addContact = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contacts.create({ ...req.body, owner });

  return res.status(201).json(newContact);
});

const removeContact = controllerWrapper(async (req, res) => {
  const { contactID } = req.params;
  const removedContact = await Contacts.findByIdAndRemove(contactID);

  if (!removedContact) {
    throw new HttpError(404, `Contact with ${contactID} not found`);
  }

  return res.json({ message: "Contact deleted" });
});

const updateContact = controllerWrapper(async (req, res) => {
  const { contactID } = req.params;

  const updatedContact = await Contacts.findByIdAndUpdate(contactID, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new HttpError(404, `Contact with ${contactID} not found`);
  }

  return res.json(updatedContact);
});

const updateStatusContact = controllerWrapper(async (req, res) => {
  const { contactID } = req.params;

  const updatedStatusContact = await Contacts.findByIdAndUpdate(
    contactID,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedStatusContact) {
    throw new HttpError(404, `Contact with ${contactID} not found`);
  }

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
