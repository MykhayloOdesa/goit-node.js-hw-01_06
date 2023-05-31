const express = require("express");

const contactsController = require("../../controllers/contactsController");

const router = express.Router();

const { validateBody } = require("../../utils/helpers/validateBody");

const {
  contactsAddingSchema,
  updateTaskValidationSchema,
} = require("../../utils/helpers/schemas/contactsSchema");

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  validateBody(contactsAddingSchema),
  contactsController.addContact
);

router.delete("/:id", contactsController.removeContact);

router.put(
  "/:id",
  validateBody(updateTaskValidationSchema),
  contactsController.updateContact
);

module.exports = { contactsRouter: router };
