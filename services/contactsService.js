const { HttpError } = require("../utils/helpers/middlewares/HttpError");
const { Contacts } = require("../models/Contacts");

async function getContactsService() {
  return await Contacts.find();
}

async function getContactByIdService(contactID) {
  const contact = await Contacts.findById(contactID);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
}

async function addContactService(data) {
  return await Contacts.create(data);
}

async function removeContactService(id) {
  const contact = await Contacts.findByIdAndDelete(id);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return id;
}

async function updateContactService(id, body) {
  const contact = await Contacts.findByIdAndUpdate(id, body, { new: true });

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
}

async function updateStatusContactService(id, body) {
  const contact = await Contacts.findByIdAndUpdate(id, body, { new: true });

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return { ...contact, body: { favorite: true } };
}

module.exports = {
  getContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  updateStatusContactService,
};
