const express = require("express");

const contactsController = require("../../controllers/contactsController");

const { contactsSchema } = require("../../helpers/schemas/contactsSchema");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:contactID", contactsController.getContactById);

router.post("/", contactsSchema.validate(), contactsController.addContact);

router.delete("/:contactID", contactsController.removeContact);

router.patch(
  "/:contactID",
  contactsSchema.validate(),
  contactsController.updateContact
);

module.exports = { contactsRouter: router };
