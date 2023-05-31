const { HttpError } = require("../utils/helpers/middlewares/HttpError");
const { Contacts } = require("../models/Contacts");

async function listContactsService() {
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

  if (!body) {
    throw new HttpError(422, "missing fields");
  }

  return contact;
}

async function updateStatusContactService(id, body) {
  const contact = await Contacts.findByIdAndUpdate(id, body, { new: true });

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  if (!body) {
    throw new HttpError(422, "missing field favorite");
  }

  return contact;
}

module.exports = {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  updateStatusContactService,
};
