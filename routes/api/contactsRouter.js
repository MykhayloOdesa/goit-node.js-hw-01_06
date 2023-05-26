const express = require("express");

const contactsController = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:id", contactsController.removeContact);

router.patch("/:id", contactsController.updateContact);

module.exports = { contactsRouter: router };
