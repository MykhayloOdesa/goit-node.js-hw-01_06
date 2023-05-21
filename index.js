// ***FIRST WAY - USING YARGS***

// const contactService = require("./contacts");

// const argv = require("yargs").argv;

// async function invokeAction({ action, id, name, email, phone }) {
// 	switch (action) {
// 		case "list":
// 			const allContacts = await contactService.listContacts();
// 			console.log(allContacts);
// 			break;

// 		case "get":
// 			const seekingContact = await contactService.getContactById(id);
// 			console.log(seekingContact);
// 			break;

// 		case "add":
// 			const newContact = await contactService.addContact(name, email, phone);
// 			console.log(newContact);
// 			break;

// 		case "remove":
// 			const deletedContact = await contactService.removeContact(id);
// 			console.log(deletedContact);
// 			break;

// 		default:
// 			console.warn("\x1B[31m Unknown action type!");
// 	}
// }

// invokeAction(argv);

// ***ALTERNATIVE WAY - USING COMMANDER***

const contactService = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await contactService.listContacts();
			console.log(allContacts);
			break;

		case "get":
			const seekingContact = await contactService.getContactById(id);
			console.log(seekingContact);
			break;

		case "add":
			const newContact = await contactService.addContact(name, email, phone);
			console.log(newContact);
			break;

		case "remove":
			const deletedContact = await contactService.removeContact(id);
			console.log(deletedContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);
