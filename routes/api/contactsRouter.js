const express = require("express");

const contactsController = require("../../controllers/contactsController");

const { contactsSchema } = require("../../helpers/schemas/contactsSchema");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", contactsSchema.validate, contactsController.addContact);

router.delete("/:id", contactsController.removeContact);

router.put(
  "/:contactID",
  contactsSchema.validate,
  contactsController.updateContact
);

module.exports = { contactsRouter: router };
