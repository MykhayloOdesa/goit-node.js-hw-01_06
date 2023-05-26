const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./routes/api/contactsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, response) => {
  response.status(404).json({ message: "Not found" });
});

app.use((error, _, response) => {
  error.status === 500 && response.status(500).json("Internal Server Error");
});

module.exports = app;
