const {
  getContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsService");
const { controllerWrapper } = require("../utils/helpers/controllerWrapper");

const getContacts = controllerWrapper(async (_, res) => {
  const contacts = await getContactsService();
  return res.json(contacts);

  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     tasks: results,
  //   },
  // });
});

const getContactById = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id);

  return res.json(contact);

  // if (result) {
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { task: result },
  //   });
  // } else {
  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Not found task id: ${id}`,
  //     data: "Not Found",
  //   });
  // }
});

const addContact = controllerWrapper(async (req, res) => {
  const newContact = await addContactService(req.body);

  return res.status(201).json(newContact);
});

const removeContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  await removeContactService(id);

  return res.json({ message: "contact deleted" });

  // if (result) {
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { task: result },
  //   });
  // } else {
  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Not found task id: ${id}`,
  //     data: "Not Found",
  //   });
  // }
});

const updateContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedContact = await updateContactService(id, req.body);

  return res.json(updatedContact);

  // if (result) {
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { task: result },
  //   });
  // } else {
  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Not found task id: ${id}`,
  //     data: "Not Found",
  //   });
  // }
});

const updateStatusContact = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedStatusContact = await updateStatusContactService(id, req.body);

  return res.json(updatedStatusContact);

  // if (result) {
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: { task: result },
  //   });
  // } else {
  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: `Not found task id: ${id}`,
  //     data: "Not Found",
  //   });
  // }
});

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
