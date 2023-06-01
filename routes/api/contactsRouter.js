const express = require("express");

const contactsController = require("../../controllers/contactsController");

const router = express.Router();

const { validateBody } = require("../../utils/helpers/validateBody");

const {
  contactsAddingSchema,
  updateContactSchema,
} = require("../../utils/helpers/schemas/contactsSchema");

router.get("/", contactsController.getContacts);

router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  validateBody(contactsAddingSchema),
  contactsController.addContact
);

router.delete("/:id", contactsController.removeContact);

router.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  contactsController.updateStatusContact
);

module.exports = { contactsRouter: router };
