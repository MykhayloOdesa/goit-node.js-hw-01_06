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
  const contact = data.find((contact) => contact.id === contactID);
  return contact || null;
}

async function addContactService(data) {
  const contacts = await listContactsService();
  const addedContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return addedContact;
}

async function removeContactService(id) {
  const data = await listContactsService();
  const index = data.findIndex((contact) => contact.id === id);

  if (index !== -1) {
    data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return id;
  }

  return null;
}

async function updateContactService(id, body) {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index !== -1) {
    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }

  return null;
}

module.exports = {
  listContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
};
