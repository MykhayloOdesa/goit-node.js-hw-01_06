const express = require("express");

const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const router = express.Router();

const { validateBody } = require("../../utils/validateBody");

const {
  contactsAddingSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../utils/schemas/contactsSchema");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validateBody(contactsAddingSchema), addContact);

router.delete("/:id", removeContact);

router.put("/:id", validateBody(updateContactSchema), updateContact);

router.patch(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  updateStatusContact
);

module.exports = { contactsRouter: router };
