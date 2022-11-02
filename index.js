const argv = require("yargs").argv;
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const allContacts = await contacts.listContacts();
			console.log(allContacts);
			break;
		case "get":
			const oneContact = await contacts.getContactById(id);
			console.log(oneContact);
			break;
		case "remove":
			const removeContact = await contacts.removeContact(id);
			console.log(removeContact);
			break;
		case "add":
			const newContact = await contacts.addContact(name, email, phone);
			console.log(newContact);
			break;
		default:
			console.log("Unknown action");
	}
};
invokeAction(argv);
