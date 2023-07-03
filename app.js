const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authRouter } = require("./routes/api/authRouter");
const { contactsRouter } = require("./routes/api/contactsRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth/users", authRouter);

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _, res) => {
  const { status = 500, message = "Internal Server Error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
