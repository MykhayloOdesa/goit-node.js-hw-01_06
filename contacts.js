const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
function listContacts() {
	// ...твій код
}

function getContactById(contactId) {
	// ...твій код
}

function removeContact(contactId) {
	// ...твій код
}

function addContact(name, email, phone) {
	// ...твій код
}

module.exports = { listContacts, getContactById, removeContact, addContact };
