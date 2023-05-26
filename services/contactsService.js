const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

async function listContactsService() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactByIdService(contactID) {
  const data = await listContactsService();
  return data.find((contact) => contact.id === contactID);
}

async function addContactService(data) {
  const contacts = await listContactsService();
  const addedContact = {
    id: nanoid(),
    ...data,
  };

  data.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addedContact;
}

async function removeContactService(contactID) {
  const data = await listContactsService();
  const index = data.findIndex((contact) => contact.id === contactID);

  if (index !== -1) {
    data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return contactID;
  }

  throw new Error();
}

async function updateContactService(contactID, body) {
  const contacts = await listContactsService();
  let contact = contacts.find((contact) => contact.id === contactID);

  if (!contact) {
    throw new Error();
  }

  contact = { ...contact, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

module.exports = {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
};
