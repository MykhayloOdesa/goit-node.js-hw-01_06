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

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _, res) => {
  const { status = 500, message = "Internal Server Error" } = error;
  res.status(status).json({ message });
});

module.exports = app;

// const routerApi = require('./api');
// app.use('/api', routerApi);

// app.use((_, res, __) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Use api on routes: /api/tasks',
//     data: 'Not found',
//   });
// });

// app.use((err, _, res, __) => {
//   console.log(err.stack);
//   res.status(500).json({
//     status: 'fail',
//     code: 500,
//     message: err.message,
//     data: 'Internal Server Error',
//   });
// });

// if (!body) {
//   throw new HttpError(422, "missing field favorite");
// }

// if (!body) {
//   throw new HttpError(422, "missing fields");
// }
