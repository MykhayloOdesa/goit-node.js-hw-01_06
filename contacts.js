const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactID) {
	const data = await listContacts();
	const result = data.find(contact => contact.id === contactID);
	return result || null;
}

async function removeContact(contactID) {
	const data = await listContacts();
	const index = data.findIndex(contact => contact.id === contactID);

	if (index !== -1) {
		const [result] = data.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
		return result;
	}

	return null;
}

async function addContact(name, email, phone) {
	const data = await listContacts();
	const addedContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};

	data.push(addedContact);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return addedContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
