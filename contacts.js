const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
const updateContacts = async (contacts) =>
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
async function listContacts() {
	const result = await fs.readFile(contactsPath);
	return JSON.parse(result);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const id = String(contactId);
	const result = contacts.find((item) => item.id === id);
	return result || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: shortid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
