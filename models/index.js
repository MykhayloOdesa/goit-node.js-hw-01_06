// const { nanoid } = require("nanoid");

// { name, email, phone }
// const addedContact = {
//   id: nanoid(),
//   name,
//   email,
//   phone,
// };

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactID) {
  const data = await listContacts();
  const result = data.find((contact) => contact.id === contactID);
  return result || null;
}

async function addContact(body) {
  const data = await listContacts();

  data.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return body;
}

async function removeContact(contactID) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactID);

  if (index !== -1) {
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
  }

  return null;
}

async function updateContact(contactID, body) {
  const contacts = await listContacts();
  let contact = contacts.find((contact) => contact.id === contactID);

  if (!contact) {
    throw new Error();
  }

  contact = { ...contact, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
